import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
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

const COLORS = ['#00C49F', '#FF8042', '#8884d8']

class TeamMatches extends Component {
  state = {
    teamMatchesDetails: {},
    isLoading: true,
    backgroundColorId: '',
    matchStats: {won: 0, lost: 0, draw: 0},
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
    const recentMatches = data.recent_matches.map(this.getFormattedData)

    const updatedData = {
      teamBannerURL: data.team_banner_url,
      latestMatch: this.getFormattedData(data.latest_match_details),
      recentMatches,
    }

    this.setState({
      teamMatchesDetails: updatedData,
      isLoading: false,
      matchStats: this.getMatchStats(recentMatches),
    })
  }

  backgroundColorChange = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const colorItem = color.find(eachItem => eachItem.colorId === id)
    this.setState({backgroundColorId: colorItem?.colorCode || ''})
  }

  getMatchStats = matches => {
    let won = 0
    let lost = 0
    let draw = 0

    matches.forEach(match => {
      if (match.matchStatus.toLowerCase() === 'won') {
        won += 1
      } else if (match.matchStatus.toLowerCase() === 'lost') {
        lost += 1
      } else {
        draw += 1
      }
    })

    return {won, lost, draw}
  }

  renderPieChart = () => {
    const {matchStats} = this.state
    const data = [
      {name: 'Won', value: matchStats.won},
      {name: 'Lost', value: matchStats.lost},
      {name: 'Draw', value: matchStats.draw},
    ]

    return (
      <div className="pie-chart-container">
        <h3 className="pie-title">Match Results Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({name, percent}) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((eachItem, index) => (
                <Cell key={`cell-${eachItem.name}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {teamMatchesDetails, isLoading, backgroundColorId} = this.state
    const {teamBannerURL, latestMatch, recentMatches = []} = teamMatchesDetails

    return (
      <div className={`team-match-container ${backgroundColorId}`}>
        {isLoading ? (
          <div data-testid="loader" className="loader">
            <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
          </div>
        ) : (
          <div className="responsive-container">
            <button
              className="back-button"
              onClick={this.onClickBack}
              type="button"
            >
              ← Back
            </button>
            <img src={teamBannerURL} alt="team banner" className="team-image" />
            <LatestMatch teamList={latestMatch} key={latestMatch.id} />
            <ul className="match-card-container">
              {recentMatches.map(eachItem => (
                <MatchCard recentMatches={eachItem} key={eachItem.id} />
              ))}
            </ul>
            {!isLoading && this.renderPieChart()}
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(TeamMatches)
