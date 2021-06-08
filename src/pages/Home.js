import React from 'react'
import styled from 'styled-components'
import BackgroundVideo from '../assets/videos/backgroundvideo.mp4'
import FacebookIcon from '../assets/images/facebook.svg'
import TwitterIcon from '../assets/images/twitter.svg'
import InstagramIcon from '../assets/images/instagram.svg'

const BackgroundBody = styled.div`

  .nav {
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    padding: 40px 100px;
    z-index: 2;
    font-size: 26px;
    color: white;
  }
  
  .background-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;

  }

  h2 {
    position: absolute;
    z-index: 2;
    color: white;
    padding: 110px 180px;
  }

  footer {
    display: flex;
    position: absolute;
    top: 88%;
    left: 5%;
    z-index: 2;
  }

  .image-space {
    padding-left: 30px;
  }

  ul {
    position: absolute;
    z-index: 2;
    padding: 111px 318px;
  }

  ul li {
    list-style: none;
    font-weight: bolder;
    font-size: 24px;
    color: #FC6D6D;
    position: relative;
    top: 0;
  }
`
export default class Home extends React.Component {
  
  render() {
    return (
      <BackgroundBody>

        <div className="nav">
          <h1>Music</h1>
        </div>
        <h2>never stop</h2> 
          <ul>
            <li><span>listening</span></li>
            <li><span>enjoying</span></li>
            <li><span>loving</span></li>
            <li><span>dancing...</span></li>
          </ul>
        
        <video className="background-video" autoPlay loop muted>
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>

        <footer>
          <div className="image-space">
            <a target="_blank" href="https://www.facebook.com/"
               rel="noopener noreferrer">
              <img src={FacebookIcon} alt="Facebook Icon"></img>
            </a>
          </div>
          <div className="image-space">
            <a target="_blank" href="https://twitter.com/"
               rel="noopener noreferrer">
              <img src={TwitterIcon} alt="Twitter Icon"></img>
            </a>
          </div>
          <div className="image-space">
            <a target="_blank" href="https://www.instagram.com/" 
               rel="noopener noreferrer">
              <img src={InstagramIcon} alt="Instagram Icon"></img>
            </a>
          </div>
        </footer>

      </BackgroundBody>
    );
  }
}