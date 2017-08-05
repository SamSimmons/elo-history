import React, { Component } from 'react'
import  { maxBy, minBy } from 'lodash'
import { annotation } from 'd3-svg-annotation'
import { select as d3Select } from 'd3-selection'

class Annotations extends Component {
  constructor(props) {
    super(props)
    this.margin = props.margin
    const { width, height } = props.dimensions
    this.width = width
    this.height = height
  }
  componentDidMount() {
    this.renderAnnotations()
  }
  componentDidUpdate() {
    this.renderAnnotations()
  }
  offsetX (x) {
    const xCenter = (this.width) / 2
    return (x > xCenter) ? -70 : 70
  }
  offsetY (y) {
    const threshold = 50
    const min = 50 + threshold
    const max = (this.height - this.margin.bottom) - threshold
    const yCenter = (this.height - this.margin.top - this.margin.bottom) / 2
    if (y > max) {
      return -20
    }
    if (y < min) {
      return 10
    }
    return (y > yCenter) ? 20 : -20
  }
  renderAnnotations () {
    const { data, scales, team} = this.props
    const { xScale, yScale } = scales
    const best = maxBy(data, (d) => d.elo[team])
    const worst = minBy(data, (d) => d.elo[team])
    this.annotations = [
      {
        note: {
          label: `vs ${(team === best.innings[0].team) ? best.innings[0].opposition : best.innings[0].team} ${best.innings[0].date}`,
          title: `Best Ranking: ${best.elo[team]}`,
          align: (xScale(best.date) < (this.width / 2)) ? "left" : "right",
          wrap: 100
        },
        connector: {
          end: "dot"
        },
        x: xScale(best.date),
        y: yScale(best.elo[team]),
        dx: this.offsetX(xScale(best.date)),
        dy: this.offsetY(yScale(best.elo[team]))
      },
      {
        note: {
          label: `vs ${(team === worst.innings[0].team) ? worst.innings[0].opposition : worst.innings[0].team} ${worst.innings[0].date}`,
          title: `Worst Ranking: ${worst.elo[team]}`,
          align: (xScale(worst.date) < (this.width / 2)) ? "left" : "right",
          wrap: 100
        },
        connector: {
          end: "dot"
        },
        x: xScale(worst.date),
        y: yScale(worst.elo[team]),
        dx: this.offsetX(xScale(worst.date)),
        dy: this.offsetY(yScale(worst.elo[team]))
      }
    ]
    const makeAnnotations = annotation()
    .annotations(this.annotations)

    d3Select(this.label).call(makeAnnotations)
  }
  render() {
    return (
      <g
        className='annotation'
        ref={(el) => { this.label = el; }}
      />
    )
  }
}

export default Annotations
