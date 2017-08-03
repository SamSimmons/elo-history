import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { changeSelectedTeam } from '../../actions/app'
import { map } from 'lodash'
import { colorMap } from '../../utils/ui'
import './team-selector.css'

const TeamSelector = ({ teams, selected, changeSelectedTeam }) => {
  const options = map(teams, (team) => ({ value: team, label: team }))
  return (
    <div
      className="team-selector"
      style={{
        borderBottom: `3px solid ${colorMap[selected]}`
      }}
    >
      <Select
        value={selected}
        options={options}
        clearable={false}
        onChange={changeSelectedTeam}
      />
    </div>
  )
}

const mapStateToProps = state => ({
  teams: state.teams.list,
  selected: state.app.selectedTeam
})

export default connect(mapStateToProps, { changeSelectedTeam })(TeamSelector)
