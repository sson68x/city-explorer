import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Weather from './Weather'
import Movies from './Movies'
import { Button, Container, Form } from 'react-bootstrap';
// import Forms from './Forms';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      city: '',
      cityData: [],
      // cityName: '',
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
        // cityName: cityData.data[0].display_name,
        cityLat: cityData.data[0].lat,
        cityLon: cityData.data[0].lon,
        cityError: false,
        weatherError: false,
        showWeather: true
      });
    } catch (error) {
      this.setState({
        cityData: [],
        cityLat: null,
        cityLon: null,
        cityError: true,
        showWeather: false,
        weatherError: true,
        cityErrorMsg: `Unable to geocode: ERROR ${error.response.status}`,
        weatherErrorMsg: `Unable to get weather data: ERROR ${error.response.status}`
      });
    }
    this.handleGetWeather()
    this.handelGetMovies()
  }

  handleGetWeather = async () => {
    try {
      let weatherResults = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchQuery}`);
      console.log(weatherResults.data);
      this.setState({
        weatherData: weatherResults.data,
        // weatherError: false
      })
    } catch (error) {
      this.setState({
        weatherData: [],
        // weatherError: true,
        // weatherErrorMsg: `ERROR: Unable to get weather data: ${error.response.status}`
      });
    }
  }

  handelGetMovies = async () => {
    try {
      let moviesResults = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`);
      console.log(moviesResults);
      this.setState({
        moviesData: moviesResults.data,
        showMovies: true,
        moviesError: false
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

    // let carouselMovies = this.state.moviesData.map((movie, idx) => (
    //   <Carousel.Item key={idx}>
    //     <Carousel.Caption>
    //       <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>
    //         Title: {movie.title}
    //       </h3>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // ))
    
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
                placeholder='Search for a City'
              />
            </Form.Group>
            <Button type="submit" style={{ margin: '5px' }}>Explore!</Button>
          </Form>
        </Container>


        <Card style={{
          width: '20em',
          height: '40em',
          textAlign: 'center',
          backgroundColor: 'lightgreen',
          margin: 'auto'
        }}>

          <Card.Img
            variant='top'
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityLat},${this.state.cityLon}&zoom=12`}
            alt={this.props.cityName}
          />

          <Card.Body style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>

            {
              this.state.cityError &&
              <p style={{ textAlign: 'center' }}>
                {this.state.cityErrorMsg}
              </p>
            }

            {
              this.state.weatherError &&
              <p style={{ textAlign: 'center' }}>
                {this.state.weatherErrorMsg}
              </p>
            }


            <Card.Title>{this.state.searchQuery.toUpperCase()}</Card.Title>
            <Card.Text>Latitude: {this.state.cityLat}</Card.Text>
            <Card.Text>Longitude: {this.state.cityLon}</Card.Text>
            <Card.Text>Forecast</Card.Text>
            {this.state.showWeather &&
              <Weather
                weather={this.state.weatherData}
              />}

          </Card.Body>
        </Card>

        {
          this.state.moviesError &&
          <p style={{ textAlign: 'center' }}>
            {this.state.moviesErrorMsg}
          </p>
        }

        {this.state.showMovies &&
          <Movies
            movies={this.state.moviesData}
          />}
      </>
    )
  }
}
export default App;