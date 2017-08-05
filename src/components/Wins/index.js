import React from 'react'
import { connect } from 'react-redux'
import { find, filter } from 'lodash'
import goldIcon from '../Icons/Gold.svg'
import silverIcon from '../Icons/Silver.svg'
import './wins.css'

const Wins = ({team, tournamentWins}) => {
  if (!tournamentWins.wins) {
    return <div></div>
  }
  const worldCups = filter(tournamentWins.wins, ['type', 'World Cup'])
  const championsTrophies = filter(tournamentWins.wins, ['type', 'Champions Trophy'])
  return (
    <div className="wins">
      <div className="world-cups">
        {
          (worldCups.length > 0)
          ? `${worldCups.length} x World Cups`
          : ''
        }
        <div className="icon-wrapper">
          {
            worldCups.map((cup, i) => <img key={`wc-${i}`} src={goldIcon} alt="world cup icon"/>)
          }
        </div>
    </div>
      <div className="champions-trophies">
        {
          (championsTrophies.length > 0)
          ? `${championsTrophies.length} x ICC Champions Trophies`
          : ''
        }
        <div className="icon-wrapper">
          {
            championsTrophies.map((trophy, i) => <img key={`ct-${i}`} src={silverIcon} alt="world cup icon"/>)
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { selectedTeam: team } = state.app
  console.log(state.teams.tournaments)
  return {
    team,
    tournamentWins: find(state.teams.tournaments, ['team', team])
  }
}

export default connect(mapStateToProps)(Wins)
