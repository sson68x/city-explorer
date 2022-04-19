import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import Card from 'react-bootstrap/Card'
// import Forms from './Forms';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      cityName: 'City: ',
      cityLat: 0,
      cityLon: 0,
      error: false,
      errorMsg: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleCitySubmit = async (event) => {
    event.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
      let cityData = await axios.get(url);
      this.setState({
        cityData: cityData.data[0],
        cityName: cityData.data[0].display_name,
        cityLat: cityData.data[0].lat,
        cityLon: cityData.data[0].lon
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `ERROR: Unable to geocode: ${error.response.status}`
      });
      console.log(this.state.errorMsg)
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
              placeholder='Search for City'
            />
            <button type="submit">Explore!</button>
          </form>
        </div>
        <Card style={{
          width: '20em',
          height: '30em',
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
            {
              this.state.error ?
                <p style={{ textAlign: 'center' }}>
                  {this.state.errorMsg}
                </p> :
                <p style={{ textAlign: 'center' }}>
                </p>
            }
            <Card.Title>{this.state.city}</Card.Title>
            <Card.Text>Latitude: {this.state.cityLat}</Card.Text>
            <Card.Text>Longitude: {this.state.cityLon}</Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }
}
export default App;