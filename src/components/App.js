import React from 'react'
import TeamSelector from './TeamSelector'
import Chart from './Chart'

const App = (props) => {
  return (
    <div className="app">
      <div className="header">
        <div className="title">International ELO Rankings</div>
        <div className="update-time">Updated July 30 2017</div>
      </div>
      <TeamSelector />
      <Chart />
    </div>
  )
}

export default App
