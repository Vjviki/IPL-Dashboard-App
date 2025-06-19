import './index.css'

const MatchCard = props => {
  const {recentMatches} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = recentMatches
  const wonOrLost = matchStatus === 'Won' ? 'won-status' : 'lost-status'
  return (
    <li className="list-card-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="match-card-logo"
      />
      <p className="match-name">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={`match-status ${wonOrLost}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
