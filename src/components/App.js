import React from 'react'
import TeamSelector from './TeamSelector'
import Wins from './Wins'
import Chart from './Chart'

const App = (props) => {
  return (
    <div className="app">
      <div className="header">
        <div className="title">International ELO Rankings</div>
        <div className="update-time">Updated July 30 2017</div>
      </div>
      <div className="sub-header">
        <TeamSelector />
        <Wins />        
      </div>
      <Chart />
    </div>
  )
}

export default App
