import React from 'react';

class Movies extends React.Component {

  render() {
    return (
      this.props.movies.map((movie, idx) => (
        <div key={idx}>
          <p>{movie.title}</p>
          <p>{movie.overview}</p>
        </div>
      )
      )
    )
  };
}

export default Movies;