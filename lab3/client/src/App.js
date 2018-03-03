import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';
import TrackList from "./components/TrackList";

const spotifyWebApi = new Spotify()






class App extends Component {
  constructor() {
    super()
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      query: '',
      tracks: []
    }
    console.log(this.state.loggedIn)
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  onSearchTrack() {
    spotifyWebApi.search(this.state.query, ['track'])
      .then((response) => {
        console.log(this.state.query)
        console.log(response)
        this.setState({
          tracks: response.tracks.items
        })

      })
  }

  onSearchChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.loggedIn ?
          <div>
            <h1>Search for a track</h1>
            <div id="search-form">
              <input type="text" value={this.state.query} onChange={(event) => this.onSearchChange(event)} placeholder="Type an track" />
              <button id="search" className="btn btn-primary" onClick={this.onSearchTrack.bind(this)}>search</button>
            </div>
            {this.state.tracks.length > 0 ?
              <TrackList tracklist={this.state.tracks} />
              : ''}
          </div> : <div>
            <h1>Hi, welcome to this online Spotify Web Api, Please Login with spotify first!</h1>
            <a href='http://localhost:8888/login'>
              <button className='btn btn-primary'>Login with Spotify </button>
            </a>
          </div>
        }
      </div>
    );
  }
}

export default App;
