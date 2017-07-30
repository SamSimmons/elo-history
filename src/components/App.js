import React from 'react'
import TeamSelector from './TeamSelector'

const App = (props) => {
  return (
    <div className="app">
      <div className="header">
        <div className="title">International T20 ELO Rankings</div>
        <div className="update-time">Updated July 30 2017</div>
      </div>
      <TeamSelector />
      <div className="chart">
        <svg />
      </div>

    </div>
  )
}

export default App
