import React from 'react';
import './App.css';
import axios from 'axios';
import Weather from './Weather'
import Movies from './Movies'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Container, Form, Card } from 'react-bootstrap';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      city: '',
      cityData: [],
      cityLat: 0,
      cityLon: 0,
      cityError: false,
      cityErrorMsg: '',
      weatherError: false,
      weatherErrorMsg: '',
      weatherData: [],
      showWeather: false,
      moviesError: false,
      moviesErrorMsg: '',
      moviesData: [],
      showMovies: false
    }
  }

  handleCityInput = (event) => {
    this.setState({
      searchQuery: event.target.value
    })
  }

  handleCitySubmit = async (event) => {
    event.preventDefault();
    try {
      let cityUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json`;

      let cityData = await axios.get(cityUrl);
      this.setState({
        cityData: cityData.data[0],
        cityLat: cityData.data[0].lat,
        cityLon: cityData.data[0].lon,
        cityError: false,
        weatherError: false,
        moviesError: false,
        showWeather: true,
        showMovies: true
      });
    } catch (error) {
      this.setState({
        cityData: [],
        cityLat: null,
        cityLon: null,
        cityError: true,
        showWeather: false,
        showMovies: false,
        weatherError: true,
        moviesError: true,
        cityErrorMsg: `Unable to geocode: ERROR ${error.response.status}`,
        weatherErrorMsg: `Unable to get weather data: ERROR ${error.response.status}`,
        moviesErrorMsg: `Unable to get movie data sets: ERROR ${error.response.status}`
      });
    }
    this.handleGetWeather()
    this.handelGetMovies()
  }

  handleGetWeather = async () => {
    let cityUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.searchQuery}&format=json`;
    axios.get(cityUrl)
      .then(weatherResults => `${process.env.REACT_APP_SERVER}/weather?lat=${weatherResults.data[0].lat}&lon=${weatherResults.data[0].lon}`)
      .then(weatherUrl => axios.get(weatherUrl))
      .then(weatherData => this.setState({ weatherData: weatherData.data }))
      .catch(error => this.setState({
        weatherData: [],
        weatherError: true,
        weatherErrorMsg: `Unable to get weather data: ERROR ${error.response.status}`
      }))
  }

  handelGetMovies = async () => {
    try {
      let moviesResults = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`);
      this.setState({
        moviesData: moviesResults.data,
      })
    } catch (error) {
      this.setState({
        moviesData: [],
        moviesError: true,
        moviesErrorMsg: `Unable to get movies data: ERROR ${error.response.status}`
      });
    }
  }

  render() {

    return (
      <>
        <h1>City Explorer</h1>
        <Container>
          <Form onSubmit={this.handleCitySubmit} style={{ width: 'max-content', margin: 'auto' }}>
            <Form.Group controlId="searchQuery">
              <Form.Control
                type='text'
                name='city'
                onInput={this.handleCityInput}
                placeholder='Search for a city'
              />
              <Button type="submit" style={{ margin: '5px' }}>Explore!</Button>
            </Form.Group>
          </Form>
        </Container>

        <Card>
          <Card.Img
            variant='top'
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=12`}
            alt={this.props.city}
          />

          <Card.Body
            style={{
              background: 'lightgreen',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>

            {
              this.state.cityError &&
              <p>
                {this.state.cityErrorMsg}
              </p>
            }

            {
              this.state.weatherError &&
              <p>
                {this.state.weatherErrorMsg}
              </p>
            }

            <Card.Title>{this.state.searchQuery.toUpperCase()}</Card.Title>
            <Card.Text>Latitude: {this.state.cityLat}</Card.Text>
            <Card.Text>Longitude: {this.state.cityLon}</Card.Text>

            {
              this.state.showWeather &&
              <Weather
                weather={this.state.weatherData}
              />
            }

          </Card.Body>
        </Card>

        <div id='movies'>
          {
            this.state.moviesError &&
            <p style={{ textAlign: 'center' }}>
              {this.state.moviesErrorMsg}
            </p>
          }

          {
            this.state.showMovies &&
            <Movies
              movies={this.state.moviesData}
            />
          }
        </div>
      </>
    );
  };
};

export default App;