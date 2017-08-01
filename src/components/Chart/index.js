import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import { map, max, min } from 'lodash'
import Axes from './Axes'
import './chart.css'

const colorMap = {
  "Australia": "#F7D64D",
  "Bangladesh": "#6FD669",
  "England": "#5689ED",
  "India": "#449FED",
  "New Zealand": "#293133",
  "Pakistan": "#33D650",
  "South Africa": "#2CD663",
  "Sri Lanka": "#5C6AED",
  "West Indies": "#F74477",
  "Zimbabwe": "#F75A45"
}

class Chart extends Component {
  constructor (props) {
    super(props)
    const { width, height, margin } = this.props.dimensions
    this.width = width
    this.height = height
    this.margin = margin
    this.xScale = d3.scaleLinear().domain([props.data[0].date, props.data[props.data.length - 1].date]).range([margin.left, width - margin.right])
    const yMax = max(map(props.data, (d) => {
      return max(map(d.ratings, r => r))
    }))
    const yMin = min(map(props.data, (d) => {
      return min(map(d.ratings, r => r))
    }))
    this.yScale = d3.scaleLinear().domain([yMin - 50, yMax + 50]).range([height - margin.bottom, margin.top])
  }

  getLine (team, data) {
    return d3.line()
      // .curve(d3.curveNatural)
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.ratings[team]))(data)
  }

  render () {
    const { width, height, margin } = this.props.dimensions
    return (
      <svg
        className="chart"
        style={{
          width: width,
          height: height
        }}
      >
        <Axes
          scales={{ xScale:this.xScale, yScale: this.yScale}}
          margin={margin}
          dimensions={this.props.dimensions}
        />
        <g>
          {
            this.props.teams.map(
              (team, i) =>
                <path
                  className="chart__line"
                  key={`team-line-${i}`}
                  d={this.getLine(team, this.props.data)}
                  style={{
                    stroke: '#a4a4a4',
                    strokeWidth: '1.5px',
                    opacity: '.45',
                    fill: 'transparent'
                  }}
                />
            )
          }
          {
            <path
              d={this.getLine(this.props.selected, this.props.data)}
              className="chart__line"
              style={{
                stroke: colorMap[this.props.selected],
                strokeWidth: '2px',
                fill: 'transparent'
              }}
            />
          }
        </g>
      </svg>
    )
  }
}

class Wrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      margin: { top: 30, right: 30, bottom: 80, left: 40 },
      height: 550
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
      return <div className='chart__wrapper' ref={canvas => { this.canvas = canvas }} />
    }

    return (
      <div className='chart__wrapper' ref={canvas => { this.canvas = canvas }}>
        <Chart {...this.props} dimensions={this.state} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ data: state.teams.chartData, teams: state.teams.list, selected: state.app.selectedTeam })

export default connect(mapStateToProps)(Wrapper)
