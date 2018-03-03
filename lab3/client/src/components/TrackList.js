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