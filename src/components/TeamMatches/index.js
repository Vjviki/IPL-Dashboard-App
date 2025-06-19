import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

const color = [
  {colorId: 'RCB', colorCode: 'rcb'},
  {colorId: 'KKR', colorCode: 'kkr'},
  {colorId: 'KXP', colorCode: 'kxp'},
  {colorId: 'CSK', colorCode: 'csk'},
  {colorId: 'RR', colorCode: 'rr'},
  {colorId: 'MI', colorCode: 'mi'},
  {colorId: 'SH', colorCode: 'srh'},
  {colorId: 'DC', colorCode: 'dc'},
]

class TeamMatches extends Component {
  state = {
    teamMatchesDetails: {},
    isLoading: true,
    backgroundColorId: '',
  }

  componentDidMount() {
    this.getPlayerDetails()
    this.backgroundColorChange()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getPlayerDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerURL: data.team_banner_url,
      latestMatch: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({
      teamMatchesDetails: updatedData,
      isLoading: false,
    })
  }

  backgroundColorChange = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const colorItem = color.find(eachItem => eachItem.colorId === id)
    this.setState({backgroundColorId: colorItem.colorCode})
  }

  render() {
    const {teamMatchesDetails, isLoading, backgroundColorId} = this.state
    const {teamBannerURL, latestMatch, recentMatches} = teamMatchesDetails
    console.log(backgroundColorId)
    return (
      <div className={`team-match-container ${backgroundColorId}`}>
        {isLoading ? (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
          </div>
        ) : (
          <div className="responsive-container">
            <img src={teamBannerURL} alt="team banner" className="team-image" />
            <LatestMatch teamList={latestMatch} key={latestMatch.id} />
            <ul className="match-card-container">
              {recentMatches.map(eachItem => (
                <MatchCard recentMatches={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
