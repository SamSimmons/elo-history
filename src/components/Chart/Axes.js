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
    </g>
  )
}
