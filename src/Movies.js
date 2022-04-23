import React from 'react';
import Movie from './Movie';
import './Movies.css';

class Movies extends React.Component {

  render() {
    return (
      this.props.movies.map ((movie, idx) => (
        <Movie key={idx} movie={movie}/>
      )
      )
    );
  };
};

export default Movies;