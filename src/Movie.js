import React from 'react'
import { Col, Card } from 'react-bootstrap';
import './Movies.css';

class Movie extends React.Component {
  render() {

    return (

      <Col className="mb-5">
        <Card className="movie" key={this.props.idx}
          style={{
            width: '20em',
            height: '40em',
            textAlign: 'center',
            backgroundColor: '#90dbf4',
            margin: 'auto'
          }}>

          <Card.Header style={{
            background: '#8eecf5'
          }}>
            <h3>{this.props.movie.title}</h3>
          </Card.Header>

          <Card.Text style={{ marginTop: '10px' }}>
            Rating: {this.props.movie.vote}
          </Card.Text>
          {
            this.props.movie.poster && (
              <Card.Img id="poster"
                className="mx-auto"
                src={`https://image.tmdb.org/t/p/w500/${this.props.movie.poster}`} alt={this.props.movie.title} />
            )
          }
          <Card.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'auto',
            }}>
            <Card.Text style={{
              fontSize: '1.3em',
              fontWeight: 'bold'
            }}>Overview</Card.Text>
            <Card.Text>{this.props.movie.overview}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  };
};

export default Movie;