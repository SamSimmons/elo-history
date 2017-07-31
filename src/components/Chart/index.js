import React, { Component } from 'react'
import { connect } from 'react-redux'
import { scaleLinear, line } from 'd3'
import Axis from './Axis'

const colors = [
  'tomato',
  'steelblue',
  'CadetBlue',
  'Crimson',
  'DarkOliveGreen',
  'IndianRed',
  'LightBlue',
  'LightSalmon',
  'Orange'
]

class Chart extends Component {
  constructor (props) {
    super(props)
    const { width, height, margin } = this.props.dimensions
    this.width = width
    this.height = height
    this.margin = margin
    this.xScale = scaleLinear().domain([props.data[0].date, props.data[props.data.length - 1].date]).range([0, width - margin.left - margin.right])
    this.yScale = scaleLinear().domain([1200, 2000]).range([height - margin.top - margin.bottom, 0])
  }
  getLine (team, data) {
    return line()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.ratings[team]))(data)
  }

  render () {
    const { width, height, margin } = this.props.dimensions
    return (
      <svg style={{
        width: width,
        height: height
      }}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {
            this.props.teams.map(
              (team, i) =>
                <path
                  key={`team-line-${i}`}
                  d={this.getLine(team, this.props.data)}
                  style={{
                    stroke: colors[i],
                    strokeWidth: '1px',
                    fill: 'transparent'
                  }}
                />
            )
          }
        </g>
        <Axis scale={this.xScale} data={this.props.data} />
      </svg>
    )
  }
}

class Wrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      margin: { top: 30, right: 30, bottom: 30, left: 30 },
      height: 250
    }
  }

  componentDidMount () {
    this.setState({
      ...this.state,
      width: this.canvas.clientWidth
    })
  }

  render () {
    if (!this.props.data.length || !this.state.width) {
      return <div className='chart' ref={canvas => { this.canvas = canvas }} />
    }

    return (
      <div className='chart' ref={canvas => { this.canvas = canvas }}>
        <Chart {...this.props} dimensions={this.state} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ data: state.teams.chartData, teams: state.teams.list })

export default connect(mapStateToProps)(Wrapper)
