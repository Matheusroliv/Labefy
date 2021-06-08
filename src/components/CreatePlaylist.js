import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const CreateContainer = styled.div`
  position: absolute;
  top: 47vh;
  left: 10vw;
  z-index: 2;

  @media(max-width: 375px) {
    top: 30vh;
    font-size: 12px;
  }

  h1:after {
  display:block;
  content: '';
  border-bottom: solid 2px #FC6D6D;  
  transform: scaleX(0);  
  transition: transform 250ms ease-in-out;
}

  h1:hover:after { transform: scaleX(1); }
  h1.fromLeft:after{  transform-origin: 0% 50% ; }
`

const InputNamePlaylist = styled.div`
  z-index: 2;

  input {
    position: absolute;
    top: 59.8vh;
    right: 73vw;
    height: 35px;
    width: 200px;
    border: none;
    border-bottom: 1px solid #FC6D6D;
    outline: none;
    background-color: transparent;
    color: white;
    font-weight: bold;
    font-size: 22px;

    @media(max-width: 375px) {
      top: 38vh;
      right: 37vw;
      height: 25px;
      width: 120px;
      font-size: 12px;
    }
  }
`

const SendButtonContainer = styled.div`
  z-index: 2;

  a {
    position: fixed;
    top: 58.5vh;
    left: 28vw;
    font-size: 42px;
    cursor: pointer;
    transition: color 0.3s;
    color: inherit;
    text-decoration: inherit;

    @media(max-width: 375px) {
      top: 36.7vh;
      left: 65vw;
      font-size: 30px;
    }
  }

  a:hover {
    color: #FC6D6D;
    transition: color 0.3s;
  }
`

export default class CreatePlaylistForm extends React.Component {
 state ={
    inputNameValue: ""
 }

 onChangeInputName = (event) => {
  this.setState({ inputNameValue: event.target.value })
}

  createPlaylist = () => {
    const body = {
      name: this.state.inputNameValue
  }

    axios
      .post("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", body, {
        headers: {
          Authorization: 'matheus-rodrigues-munoz'
        }
      }).then(() => {
        alert("Playlist successfully created")
          this.setState({ inputNameValue: "" })
          this.props.getAllPlaylists()
      }).catch(() => {
          alert("Error")
      })
    }

  render() {
    return (
      <div>

      <CreateContainer>
        <h1 className="fromLeft">Create your Playlist here!</h1>
      </CreateContainer>

      <InputNamePlaylist>
        <input value={this.state.inputNameValue} onChange={this.onChangeInputName} placeholder="Playlist name..."></input>
      </InputNamePlaylist>

      <SendButtonContainer>
        <a href="/#" onClick={this.createPlaylist}>❯</a>
      </SendButtonContainer>

      </div>
    );
  }
}