import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import BackgroundMic from '../assets/images/background-mic.jpeg'
import UserIcon from '../assets/images/user.svg'
import CreatePlaylist from '../components/CreatePlaylist'
import PlaylistLibrary from '../components/PlaylistLibrary/PlaylistLibrary'
import PlaylistPage from '../components/PlaylistLibrary/PlaylistPage'

const DashboardBackground = styled.div`
  background-color: #111;
  height: 100vh;
  width: 100vw;
  color: white;

  .background-image-mic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    z-index: 0;
    opacity: 0.3;
    display: block;
  }
  
`
const LogoutContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
  z-index: 2;
  width: 100%;
  
  .logout-txt {
    position: fixed;
    transition: color 0.5s;
    top: 9vh;
    left: 86vw;
    color: inherit;
    text-decoration: inherit;

    @media(max-width: 375px) {
      top: 2vh;
      left: 82vw;
      font-size: 12px;
    }
  }

  .logout-txt:hover {
    color: #FC6D6D;
    transition: 0.5s;
  }
`

const WelcomeContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;

  .welcome-info {
    position: fixed;
    left: 15vw;
    top: 10vh;

    @media(max-width: 375px) {
      left: 12vw;
      top: 5vh;
      font-size: 14px;
    }

  }

  h1:after {
    display:block;
    content: '';
    border-bottom: solid 1px #FC6D6D;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
}

  h2:after {
    display:block;
    content: '';
    border-bottom: solid 1px #FC6D6D;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
}

  h1:hover:after { transform: scaleX(1); }
  h1.fromLeft:after{  transform-origin:  0% 50%; }
  h2:hover:after { transform: scaleX(1); }
  h2.fromLeft:after{  transform-origin:  0% 50%; }
`

const NamePhotoContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 7vw;
  top: 3vh;
  z-index: 2;

  @media(max-width: 1280px) {
    left: 9vw;
  }

  @media(max-width: 1366px) {
    left: 10vw;
  }

  @media(max-width: 375px) {
    left: 30vw;
    top: 2vh;
  }

  img {
    padding-left: 20px;
    border-radius: 50%;
    transform: scale(1);
    transition: 0.5s;
    height: 85px;
  }

  img:hover {
  transform: scale(1.06);
}
`

const DashboardTitle = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding-top: 330px;
  text-transform: uppercase;
  font-size: 26px;

  @media(max-width: 1280px) {
    padding-top: 250px;
  }

  @media(max-width: 1366px) {
    padding-top: 250px;
  }

  @media(max-width: 375px) {
    padding-top: 145px;
    font-size: 20px;
  }

  h2:after {
  display:block;
  content: '';
  border-bottom: solid 1px #FC6D6D;  
  transform: scaleX(0);  
  transition: transform 250ms ease-in-out;
}

h2:hover:after { transform: scaleX(1); }
`

export default class Dashboard extends React.Component {
  state = {
    libraryList: [],
    selectedPlaylistId: null,
    selectedPlaylistName: null,
    page: "Dashboard"
  }

  goToPlaylistPage = (playlistId, playlistName) => {
    this.LibraryToPlaylistPage("PlaylistPage")
    this.setState({ selectedPlaylistId: playlistId })
    this.setState({ selectedPlaylistName: playlistName })
  }

  LibraryToPlaylistPage = (page) => {
    this.setState({
      page: page,
    });
  };

  getAllPlaylists = () => {
    axios
      .get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", {
        headers: {
          Authorization: 'matheus-rodrigues-munoz'
        }
        }).then((res) => {
          this.setState({ libraryList: res.data.result.list })
        }).catch(() => {
        })
  }

  renderPage = () => {
    switch (this.state.page) {
      case "Dashboard":
    return (
      <DashboardBackground>
        <img className="background-image-mic" src={BackgroundMic} alt="Microphone"></img>
        <WelcomeContainer>
          <div className="welcome-info">
            <h1 className="fromLeft">Welcome,</h1>
            <NamePhotoContainer>
              <h2 className="fromLeft">User</h2>
              <img src={UserIcon} alt="User Icon"></img>
            </NamePhotoContainer>
          </div>
        <LogoutContainer>
          <a href="/#" className="logout-txt" 
          onClick={() => this.props.PageChange("Home")}>Logout
          </a>
        </LogoutContainer>
        </WelcomeContainer>
   
        <DashboardTitle>
          <h2>Dashboard</h2>
        </DashboardTitle>

        <CreatePlaylist getAllPlaylists={this.getAllPlaylists}/>

        <PlaylistLibrary 
          getAllPlaylists={this.getAllPlaylists}
          libraryList={this.state.libraryList}
          goToPlaylistPage={this.goToPlaylistPage}
          selectedPlaylistId={this.state.selectedPlaylistId}
          selectedPlaylistName={this.state.selectedPlaylistName}
        />
      </DashboardBackground>
    );
      case "PlaylistPage":
        return <PlaylistPage 
        LibraryToPlaylistPage={this.LibraryToPlaylistPage}
        goToPlaylistPage={this.goToPlaylistPage}
        selectedPlaylistId={this.state.selectedPlaylistId}
        selectedPlaylistName={this.state.selectedPlaylistName}
        />
      default:
        return <h1>Page not found</h1>
      
  }
}

  render() {
    return (
    <div>
      {this.renderPage()}
    </div>
    )
  }
}
    