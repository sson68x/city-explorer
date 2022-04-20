import React from 'react';

class Weather extends React.Component {

  render() {
    return (
      this.props.weather.map((day, idx) => (
        <div key={idx}>
          <p>{day.date}</p>
          <p>{day.description}</p>
        </div>
      )
      )
    )
  };
}

export default Weather;