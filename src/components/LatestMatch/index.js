import './index.css'

const LatestMatch = props => {
  const {teamList} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = teamList

  return (
    <div className="latest-match-container">
      <h1 className="latest-match-heading">Latest Matches</h1>
      <div className="latest-match-card">
        <div className="latest-team-logo-container">
          <div className="latest-match-detail-one">
            <p className="team-name">{competingTeam}</p>
            <p className="team-date">{date}</p>
            <p className="team-place">{venue}</p>
            <p className="team-result">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="opponent-team-logo"
          />
        </div>
        <hr className="separator" />
        <div className="latest-match-details-two">
          <p className="ipl-team-match-details-label">First Inninges</p>
          <p className="ipl-team-match-details-value">{firstInnings}</p>
          <p className="ipl-team-match-details-label">Second Inninges</p>
          <p className="ipl-team-match-details-value">{secondInnings}</p>
          <p className="ipl-team-match-details-label">Man of The Match</p>
          <p className="ipl-team-match-details-value">{manOfTheMatch}</p>
          <p className="ipl-team-match-details-label">Umpire</p>
          <p className="ipl-team-match-details-value">{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
