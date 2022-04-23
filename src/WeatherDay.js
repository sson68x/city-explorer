import React from 'react'

class WeatherDay extends React.Component {
  render() {

    return (
      <div key={this.props.idx} >
        <p>{this.props.day.date}: {this.props.day.description}</p>
      </div>
    );
  };
};

export default WeatherDay;