import React from 'react'
import { connect } from 'react-redux'
import { scaleLinear, line } from 'd3'


const Chart = (props) => {
  if (!props.data.length) {
    return <div className="chart"></div>
  }

  const width = 300
  const height = 180

  const xScale = scaleLinear().domain([props.data[0].date, props.data[props.data.length - 1].date]).range([0, width])
  const yScale = scaleLinear().domain([1200, 2000]).range([height, 0])
  const getLine = line().x(d => xScale(d.ratings.Australia)).y(d => yScale(d.date))
  return (
    <div className="chart">
      <svg style={{width: 300, height: 180}}>
        <path d={getLine(props.data)} />
      </svg>
    </div>
  )
}

const mapStateToProps = (state) => ({ data: state.teams.chartData, teams: state.teams.list })

export default connect(mapStateToProps)(Chart)
