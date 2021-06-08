import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const LibraryContainer = styled.div`
  position: absolute;
  top: 47vh;
  left: 71vw;

  @media(max-width: 375px) {
    top: 46vh;
    left: 25vw;
    font-size: 12px;
  }

  h1:after {
    display:block;
    content: '';
    border-bottom: solid 1px #FC6D6D;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
}

  h1:hover:after { transform: scaleX(1); }
  h1.fromLeft:after{  transform-origin:  0% 50%; }
`

const PlaylistContainer = styled.div`
  position: absolute;
  top: 60vh;
  left: 66vw;
  max-height: 35vh;
  width: 25vw;
  overflow-y: scroll;

  @media(max-width: 375px) {
    top: 62vh;
    left: 25vw;
    max-height: 35vh;
    width: 55vw;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #FC6D6D;
  } 
`

const InputSearchContainer = styled.div`
  position: absolute;
  bottom: 42vh;
  left: 66vw;

  @media(max-width: 375px) {
    left: 25vw;
  }
  
  @media(max-width: 1280px) {
    bottom: 42vh;
  }

  @media(max-width: 1366px) {
    bottom: 42vh;
  }

  input {
    font-weight: bold;
    border: none;
    border-bottom: 1px solid #FC6D6D;
    outline: none;
    background-color: transparent;
    font-size: 18px;
    color: white;

    @media(max-width: 375px) {
      font-size: 14px;
    }
  }

  input::placeholder {
    color: white;
  }
`

const PlaylistListContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const PlaylistName = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 5px;

  a{
    transition: color 0.2s;
    color: inherit;
    text-decoration: inherit;
  }

  a:hover {
    transition: color 0.2s;
    color: #FC6D6D;
  }
`

const ButtonsContainer = styled.div`
  cursor: pointer;
  font-weight: bold;
  
  a {
    border: 1px solid white;
    margin-right: 25px;
    margin-bottom: 5px;
    padding: 0 8px;
    color: inherit;
    text-decoration: inherit;

    @media(max-width: 375px) {
      margin-right: 10px;
    }
  }
  
  a:hover {
    border: 1px solid red;
    color: red;
  }
`

export default class PlaylistLibrary extends React.Component {
  state = {
    inputSearch: "",
  }

  searchPlaylist = (event) => {
    this.setState({
      inputSearch: event.target.value,
    });
  };

  componentDidMount() {
    this.props.getAllPlaylists()
  }

  deletePlaylist = (playlistId) => {
    if( window.confirm(`Do you really want to delete this playlist?`)) {
      const deletePlaylist = playlistId
        axios
          .delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${deletePlaylist}`, {
            headers: { 
              Authorization: 'matheus-rodrigues-munoz'
            }
          }).then(() => {
            this.props.getAllPlaylists()
            }
          ).catch(() =>{
            alert('Error.')
          })
    }
  }

  render() {
    const filterPlaylist = this.props.libraryList.filter((playlist) => {
      if (playlist.name.includes(this.state.inputSearch)) {
        return true
      } else {
        return false
      }
    })
    const mapPlaylist = filterPlaylist.map((playlist) => {
      return (
      <PlaylistListContainer key={playlist.id}>

        <PlaylistName>
          <a href="/#" onClick={() => this.props.goToPlaylistPage(playlist.id, playlist.name)}>
          {playlist.name}
          </a>
        </PlaylistName>

        <ButtonsContainer key={playlist.id}>
          <a href="/#" onClick={() => this.deletePlaylist(playlist.id)}>
            X
          </a>
        </ButtonsContainer>
      </PlaylistListContainer>
      )
    })

    return (
      <div>
        <LibraryContainer>
          <h1>Playlist Library</h1>
        </LibraryContainer>
      <InputSearchContainer>
        <input
          type="text"
          value={this.state.inputSearch} 
          onChange={this.searchPlaylist} 
          placeholder="Search for a playlist...">
        </input>
      </InputSearchContainer>
        <PlaylistContainer>
          {mapPlaylist}
        </PlaylistContainer>
      </div>
    );
  }
}