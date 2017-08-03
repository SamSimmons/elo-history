import React, { Component } from 'react'
import { connect } from 'react-redux'
import Chart from './Chart'
import './chart.css'

class Wrapper extends Component {
  constructor (props) {
    super(props)
    this.state = {
      margin: { top: 30, right: 50, bottom: 150, left: 80 },
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

const mapStateToProps = (state) => ({
  data: state.teams.ratings,
  teams: state.teams.list,
  selected: state.app.selectedTeam
})

export default connect(mapStateToProps)(Wrapper)
