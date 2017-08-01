import React, { Component } from 'react'
import { connect } from 'react-redux'
import { scaleLinear, line } from 'd3'
import * as d3 from 'd3'
import { map, max, min } from 'lodash'
import Axes from './Axes'
import './chart.css'

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
    this.xScale = scaleLinear().domain([props.data[0].date, props.data[props.data.length - 1].date]).range([margin.left, width - margin.right])
    const yMax = max(map(props.data, (d) => {
      return max(map(d.ratings, r => r))
    }))
    const yMin = min(map(props.data, (d) => {
      return min(map(d.ratings, r => r))
    }))
    this.yScale = scaleLinear().domain([yMin - 50, yMax + 50]).range([height - margin.bottom, margin.top])
  }
  getLine (team, data) {
    return d3.line()
      .x(d => this.xScale(d.date))
      .y(d => this.yScale(d.ratings[team]))(data)
      // .curve(d3.curveCatmullRomOpen)
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
                    strokeWidth: '1px',
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
                stroke: colors[0],
                strokeWidth: '1px',
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

const mapStateToProps = (state) => ({ data: state.teams.chartData, teams: state.teams.list,selected: state.app.selectedTeam })

export default connect(mapStateToProps)(Wrapper)
