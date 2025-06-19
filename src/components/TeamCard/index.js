import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamData} = props
  const {id, name, teamImageUrl} = teamData
  return (
    <li className="list-card-item">
      <Link to={`/team-matches/${id}`} className="link-list">
        <img src={teamImageUrl} alt={name} className="card-logo" />
        <p className="card-heading">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
