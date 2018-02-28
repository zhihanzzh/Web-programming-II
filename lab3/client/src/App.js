import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify()

class TrackList extends Component {
  render() {
    console.log(this.props.tracklist)
    return (
      <div>
        <div className="col-sm-12 col-md-6 col-lg-4">
          <div className="card" id="card1">
            <div className="card-header">
              <h1>{this.props.tracklist[0].name}</h1>
              <p>{this.props.tracklist[0].artists[0].name}</p>
              <a herf={this.props.tracklist[0].artists[0].href} >about the artist</a>
            </div>
            <img src={this.props.tracklist[0].album.images[0].url} alt="" className="card-img" />
            <div className="card-body">
              <p>popularity:{this.props.tracklist[0].popularity}</p>
            </div>
            <div className="card-footer">
              <p className="card-text">Album Name: {this.props.tracklist[0].album.name}</p>
              <a href={this.props.tracklist.length > 0 ? this.props.tracklist[0].preview_url : ''}>
                <button>play</button>
              </a>
            </div>
          </div>
        </div>
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
        console.log(this.state.tracks)
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
        <a href='http://localhost:8888'>
          <button className='btn btn-primary'>Login with Spotify </button>
        </a>
        <h1>Search for a Track</h1>
        <div id="search-form">
          <input type="text" value={this.state.query} onChange={(event) => this.onSearchChange(event)} placeholder="Type an track" />
          <button id="search" className="btn btn-primary" onClick={this.onSearchTrack.bind(this)}>search</button>
        </div>
        {this.state.tracks.length > 0 ?  <TrackList tracklist={this.state.tracks} /> : ''}
       

      </div>
    );
  }
}

export default App;
