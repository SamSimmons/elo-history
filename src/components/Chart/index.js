import React from 'react'
import { connect } from 'react-redux'
import { scaleLinear, line } from 'd3'

const getLine = (team, data) => {
  const width = 300
  const height = 180
  const xScale = scaleLinear().domain([data[0].date, data[data.length - 1].date]).range([0, width])
  const yScale = scaleLinear().domain([1200, 2000]).range([height, 0])
  return line()
  .x(d => xScale(d.date))
  .y(d => {
    return yScale(d.ratings[team])
  })(data)
}

const Chart = (props) => {
  if (!props.data.length) {
    return <div className="chart"></div>
  }
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
  return (
    <div className="chart">
      <svg style={{width: 300, height: 180}}>
        {
          props.teams.map(
            (team, i) =>
              <path
                key={`team-line-${i}`}
                d={getLine(team, props.data)}
                style={{
                  stroke: colors[i],
                  strokeWidth: '1px',
                  fill: 'transparent'
                }}
              />
          )
        }
      </svg>
    </div>
  )
}

const mapStateToProps = (state) => ({ data: state.teams.chartData, teams: state.teams.list })

export default connect(mapStateToProps)(Chart)
