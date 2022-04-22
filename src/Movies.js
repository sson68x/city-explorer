import React from 'react';

class Movies extends React.Component {

  render() {
    return (
      this.props.movies.map((movie, idx) => (
        <div key={idx}>
          <p>{movie.poster}</p>
          <p>Title: {movie.title}</p>
          <p>Rating: {movie.overview}</p>
        </div>
      )
      )
    )
  };
}

export default Movies;