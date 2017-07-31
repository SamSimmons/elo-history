import React, { Component } from 'react'
import { axisBottom } from 'd3'

class Axis extends Component {
  render () {
    const { scale, data } = this.props
    const axis = axisBottom().scale(scale)
    // console.log('🥑', axis(data))
    return (
      <g>
        {/* <path d={axis(data)} /> */}
      </g>
    )
  }
}

export default Axis
