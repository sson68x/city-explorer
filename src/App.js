import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Weather from './Weather'
import Movies from './Movies'
// import Forms from './Forms';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      city: '',
      cityData: [],
      cityName: '',
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
      searchQuery: event.target.value,
      city: event.target.value,
      weather: event.target.value,
      movies: event.target.value
    })
  }

  handleCitySubmit = async (event) => {
    event.preventDefault();
    try {
      let cityUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;

      let cityData = await axios.get(cityUrl);
      this.setState({
        cityData: cityData.data[0],
        cityName: cityData.data[0].display_name,
        cityLat: cityData.data[0].lat,
        cityLon: cityData.data[0].lon,
        cityError: false,
      });
    } catch (error) {
      this.setState({
        cityData: [],
        cityLat: null,
        cityLon: null,
        cityError: true,
        cityErrorMsg: `ERROR: Unable to geocode: ${error.response.status}`
      });
    }
    this.handleGetWeather(this.state.city)
    this.handelGetMovies(this.state.city)
  }

  handleGetWeather = async () => {
    try {
      let weatherResults = await axios.get(`${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.searchQuery}`);
      console.log(weatherResults.data);
      // let weatherResponse = await axios.get(weatherUrl);
      this.setState({
        weatherData: weatherResults.data,
        showWeather: true,
        weatherError: false
      })
    } catch (error) {
      this.setState({
        weatherData: [],
        weatherError: true,
        weatherErrorMsg: `ERROR: Unable to get weather data: ${error.response.status}`
      });
    }
  }

  handelGetMovies = async () => {
    try {
      let moviesResults = await axios.get(`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.searchQuery}`);
      console.log(moviesResults.data);
      this.setState({
        moviesData: moviesResults.data,
        showMovies: true,
        moviesError: false
      })
    } catch (error) {
      this.setState({
        moviesData: [],
        moviesError: true,
        moviesErrorMsg: `ERROR: Unable to get movies data: ${error.response.status}`
      });
    }
  }

  render() {

    return (
      <>
        <div>
          <form onSubmit={this.handleCitySubmit}>
            <input
              type='text'
              name='city'
              onInput={this.handleCityInput}
              placeholder='Search for a City'
            />
            <button type="submit">Explore!</button>
          </form>
        </div>
        <Card style={{
          width: '20em',
          height: '45em',
          textAlign: 'center',
          backgroundColor: 'lightgreen',
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
            <Card.Title>{this.state.city.toUpperCase()}</Card.Title>
            <Card.Text>Latitude: {this.state.cityLat}</Card.Text>
            <Card.Text>Longitude: {this.state.cityLon}</Card.Text>

            {this.state.showWeather &&
              <Weather
                weather={this.state.weatherData}
              />}

            {this.state.showMovies &&
              <Movies
                movies={this.state.moviesData}
              />}

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

            {
              this.state.moviesError &&
              <p style={{ textAlign: 'center' }}>
                {this.state.moviesErrorMsg}
              </p>
            }
          </Card.Body>
        </Card>
      </>
    )
  }
}
export default App;