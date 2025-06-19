import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamCardList()
  }

  getTeamCardList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedDate = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamList: updatedDate, isLoading: false})
  }

  render() {
    const {teamList, isLoading} = this.state
    return (
      <div className="ipl-dash-board-container">
        <div className="teams-list-container">
          <div className="home-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo-img"
            />
            <h1 className="home-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div data-testid="loader" className="loader-container">
              <Loader type="ThreeDots" color="#ffffff" width={80} height={80} />
            </div>
          ) : (
            <ul className="team-card-container">
              {teamList.map(eachTeam => (
                <TeamCard teamData={eachTeam} key={eachTeam.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
