import { Col, Card } from 'react-bootstrap';
import React from 'react';
import './Movies.css';

class Movies extends React.Component {

  render() {
    return (
      this.props.movies.map((movie, idx) => (

        <Col className="mb-5">
          <Card className="movie" key={idx}>
            <Card.Header>
              {movie.title}
            </Card.Header>
            <Card.Body>
              <Card.Img id="poster"
                className="d-block w-300"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster}`} alt={movie.title} />
              <Card.Text>Rating: {movie.vote}</Card.Text>
              <Card.Text>Overview: {movie.overview}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
      )
    )
  };
}

export default Movies;