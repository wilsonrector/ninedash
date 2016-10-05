import React, { Component } from 'react';

class BallComponent extends Component {
  render() {
    return (
      <div className="ball" style={{top: this.props.y*5 + "em", left: this.props.x*5 + "em", backgroundColor: this.props.color}}></div>
    );
  }
  
}

export default BallComponent;