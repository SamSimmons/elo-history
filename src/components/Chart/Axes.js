import React from 'react'
import Axis from './Axis'

export default ({ scales, margin, dimensions }) => {
  const { height, width } = dimensions

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margin.bottom})`,
    tickSize: height - margin.top - margin.bottom,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margin.left}, 0)`,
    tickSize: width - margin.left - margin.right,
  }

  return (
    <g>
      <Axis {...xProps} time />
      <Axis {...yProps} />
      <line
        className="axis-line"
        x1={margin.left}
        x2={margin.left}
        y1={margin.top}
        y2={height - margin.bottom}
      />
      <line
        className="axis-line"
        x1={margin.left}
        x2={width - margin.right}
        y1={height - margin.bottom}
        y2={height - margin.bottom}
      />
    </g>
  )
}
