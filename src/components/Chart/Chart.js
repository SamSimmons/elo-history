import React, { Component } from 'react'
import * as d3 from 'd3'
import { map, max, min, filter, has } from 'lodash'
import Axes from './Axes'
import Annotations from './Annotations'
import './chart.css'
import { colorMap } from '../../utils/ui'


class Chart extends Component {
  constructor (props) {
    super(props)
    const { width, height, margin } = this.props.dimensions
    this.width = width
    this.height = height
    this.margin = margin
    this.xScale = d3.scaleLinear().domain([props.data[0].date, props.data[props.data.length - 1].date]).range([margin.left, width - margin.right])
    const yMax = max(map(props.data, (d) => {
      return max(map(d.elo, r => r))
    }))
    const yMin = min(map(props.data, (d) => {
      return min(map(d.elo, r => r))
    }))
    this.yScale = d3.scaleLinear().domain([yMin - 50, yMax + 50]).range([height - margin.bottom, margin.top])
  }

  getLine (team, data) {
    return d3.line()
      // .curve(d3.curveNatural)
      .x(d => {
        return this.xScale(d.date)}
      )
      .y(d => this.yScale(d.elo[team]))(data)
  }

  filterTeam (team, data) {
    return filter(
      data,
      (match) => (has(match.elo, team))
    )
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
                  d={this.getLine(team, this.filterTeam(team, this.props.data))}
                  style={{
                    stroke: '#dcdbdb',
                    strokeWidth: '1.5px',
                    opacity: '.45',
                    fill: 'transparent'
                  }}
                />
            )
          }
          <line
            x1={this.xScale(this.props.data[0].date)}
            x2={this.xScale(this.props.data[this.props.data.length - 1].date)}
            y1={this.yScale(1500)}
            y2={this.yScale(1500)}
            style={{
              stroke: "#5C5C5C",
              strokeWidth: 2,
              strokeDasharray: '10, 10'
            }}
          />
          <text
            x={this.xScale(this.props.data[0].date) - 10}
            y={this.yScale(1500)}
            style={{
              textAnchor: 'end',
              fontFamily: 'Karla',
              alignmentBaseline: 'middle'
            }}
          >Average</text>
          {
            <path
              d={this.getLine(this.props.selected, this.filterTeam(this.props.selected, this.props.data))}
              className="chart__line"
              style={{
                stroke: colorMap[this.props.selected],
                strokeWidth: '2px',
                fill: 'transparent'
              }}
            />
          }
          <Annotations
            team={this.props.selected}
            data={this.props.data}
            scales={{ xScale:this.xScale, yScale: this.yScale}}
            margin={margin}
            dimensions={this.props.dimensions}
          />
        </g>
      </svg>
    )
  }
}

export default Chart
