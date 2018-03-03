import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify()

class TrackList extends Component {
  render() {
    console.log(this.props.tracklist)
    return (
      <div className="row">
        {this.props.tracklist.map(track =>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="card" id="card1">
              <div className="card-header">
                <h1>{track.name}</h1>
                <a href={track.artists[0].external_urls.spotify}>{track.artists[0].name}</a>
              </div>
              <img src={track.album.images[0].url} alt="" className="card-img" />
              <div className="card-body">
                <p>popularity:{track.popularity}</p>
              </div>
              <div className="card-footer">
              <p className="card-text">
              <a href={track.album.external_urls.spotify}>Album Name: {track.album.name}</a>
              </p>
                <audio controls src={this.props.tracklist.length > 0 ? track.preview_url : ''}>
                Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}




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
