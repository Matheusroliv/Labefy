import React from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import styled from 'styled-components'
import BackgroundGuitar from '../../assets/images/background-guitar.jpeg'

const PlaylistPageContainer = styled.div`
  background-color: #111;
  height: 100vh;

  a {
    color: inherit;
    text-decoration: inherit;
  }

  .background-image-guitar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    z-index: 0;
    opacity: 0.25;
    display: block;
  }

  h1 {
    color: white;
    font-weight: bold;
    font-size: 48px;
    z-index: 2;
  }

  h2 {
    position: absolute;
    right: 45.4vw;
    top: 38vh;
    color: white;

    @media(max-width: 1280px) {
      right: 43vw;
      top: 40vh;
  }

    @media(max-width: 1366px) {
        right: 43vw;
        top: 40vh;
    }

  }

  h3 {
    color: white;
    font-size: 22px;
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
  h1.fromLeft:after{  transform-origin:  50% 50%; }
  h2:hover:after { transform: scaleX(1); }
  h2.fromLeft:after{  transform-origin:  50% 50%; }

  .back-button {
    position: absolute;
    right: 85vw;
    top: 10vh;
    color: white;
    font-size: 62px;
    cursor: pointer;
  }

  .back-button:hover {
    color: #FC6D6D;
  }

  input {
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-bottom: 1px solid #FC6D6D;
    outline: none;
    background-color: transparent;
    color: white;
    font-size: 18px;
    padding-bottom: 3px;
    z-index: 2;
  }

  input::placeholder {
    color: white;
  }

`

const PlaylistTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`

const AddTrackArrow = styled.div`
  color: white;

  a {
    position: absolute;
    top: 25.5vh;
    left: 59vw;
    font-size: 48px;
    font-weight: 400;
    cursor: pointer;

    @media(max-width: 1280px) {
      top: 28vh;
      left: 62vw;
  }

    @media(max-width: 1366px) {
        top: 29vh;
        left: 61.3vw;
    }
  }

  a:hover {
    color: #FC6D6D;
  }
`

const InputsTrackForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
  position: absolute;
  right: 42.5vw;

  @media(max-width: 1280px) {
    padding-top: 10px;
    right: 40vw;
  }

  @media(max-width: 1366px) {
    padding-top: 10px;
    right: 40vw;
  }
`

const TracksForm = styled.div`
  position: absolute;
  right: 30vw;
  top: 45vh;
  overflow-y: scroll;
  max-height: 55vh;
  width: 690px;

  @media(max-width: 1280px) {
    right: 20vw;
    top: 45vh;
  }

  @media(max-width: 1366px) {
    right: 22vw;
    top: 45vh;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #FC6D6D;
  } 
`

const TrackTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 2.2vw;
  font-size: 18px;

  @media(max-width: 1280px) {
    padding-right: 3vw;
    font-size: 16px;
  }

  @media(max-width: 1366px) {
    padding-right: 3.5vw;
    font-size: 16px;
  }

  .delete-button {
    cursor: pointer;
    color: white;
    font-weight: bold;
    
  }

  .delete-button:hover {
    color: red;
  }
`
const TrackUrl = styled.div`
  padding-bottom: 5vh;
`

export default class PlaylistPage extends React.Component {
  state = {
    inputMusicName: "",
    inputArtist: "",
    inputUrl: "",
    playlistTracks: []
  }
  
  onChangeInputMusic = (event) => {
    this.setState({inputMusicName: event.target.value})
  }
  
  onChangeInputArtist = (event) => {
    this.setState({inputArtist: event.target.value})
  }
  
  onChangeInputUrl = (event) => {
    this.setState({inputUrl: event.target.value})
  }

  addTrackPlaylist = () => {
    const body = {
      name: this.state.inputMusicName, 
      artist: this.state.inputArtist,
      url: this.state.inputUrl
  }
    axios
      .post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.selectedPlaylistId}/tracks`, body, {
        headers: {
          Authorization: 'matheus-rodrigues-munoz'
        }
      }).then(() => {
        alert("Track successfully added to your playlist")
        this.getAllTracks()
        this.setState({inputMusicName: "", inputArtist: "", inputUrl: ""})
      }).catch(() => {
        alert("No music, artist or url found. Try again")
      })
  }

  getAllTracks = () => {
    axios
      .get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.selectedPlaylistId}/tracks`, {
        headers: {
          Authorization: 'matheus-rodrigues-munoz'
        }
        }).then((res) => {
          this.setState({ playlistTracks: res.data.result.tracks })
        }).catch((err) => {
          alert("Error to get your playlist tracks", err.data)
        })
  }

  deletePlaylist = (trackDeletedId) => {
    const deleteTrack = trackDeletedId
      if( window.confirm("Do you really want to delete this track?")) {
        axios
          .delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.props.selectedPlaylistId}/tracks/${deleteTrack}`, {
            headers: { 
              Authorization: 'matheus-rodrigues-munoz'
            }
          }).then(() => {
              alert('Track deleted!')
              this.getAllTracks()
          }).catch((err) =>{
            alert('Error.', err.data)
          })
      }
    }

    componentDidMount() {
      this.getAllTracks()
    }
  
    render() {
      const mapTracks = this.state.playlistTracks.map((tracks) => {
        return (
          <div key={tracks.id}>
            <TrackTitle>
              <h3>{tracks.name}</h3>
              <a href="/#" className="delete-button" onClick={() => this.deletePlaylist(tracks.id)}>X</a>
            </TrackTitle>
              <TrackUrl>
                <ReactPlayer 
                  className="react-player" 
                  url={tracks.url}
                  controls/>
              </TrackUrl>
          </div>
      )
    })
    
      return (
        <PlaylistPageContainer>
          <img className="background-image-guitar" src={BackgroundGuitar} alt="Playing Guitar"></img>
          <PlaylistTitle>
            <h1 className="fromLeft">{this.props.selectedPlaylistName}</h1>
          </PlaylistTitle>
          <InputsTrackForm>
            <input
              type="text"
              value={this.state.inputMusicName} 
              onChange={this.onChangeInputMusic} 
              placeholder="Music...">
            </input>
            <input
              type="text"
              value={this.state.inputArtist} 
              onChange={this.onChangeInputArtist} 
              placeholder="Artist...">
            </input>
            <input
              type="text"
              value={this.state.inputUrl} 
              onChange={this.onChangeInputUrl} 
              placeholder="Url...">
            </input>
          </InputsTrackForm>
          <AddTrackArrow>
            <a href="/#" onClick={() => this.addTrackPlaylist()}>
            +
            </a>
          </AddTrackArrow>

          <a href="/#" className="back-button" onClick={() => this.props.LibraryToPlaylistPage("Dashboard")}>
            «
          </a>
          
          <h2 className="fromLeft">Playlist Tracks</h2>

          <TracksForm>
            {mapTracks}
          </TracksForm>
        </PlaylistPageContainer>
      );
    }
  }