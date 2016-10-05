import React, { Component } from 'react';
import './App.css';
import keydown from 'react-keydown';
import BallComponent from './components/BallComponent';
import Ball from './classes/Ball';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balls: {
        blue: [new Ball(0,0,"blue")],
        red: [new Ball(9,9,"red")]
      },
      redSpawn: [9,9],
      blueSpawn: [0,0]
    }
  }

  componentWillReceiveProps( {keydown} ) {
    if(keydown.event) {
      switch(keydown.event.which) {
        case 38:
          this.moveBalls('red','y', -1);
          break
        case 40:
          this.moveBalls('red','y', 1);
          break
        case 37:
          this.moveBalls('red','x',-1);
          break
        case 39:
          this.moveBalls('red','x',1);
          break
        case 87:
          this.moveBalls('blue','y',-1);
          break
        case 83:
          this.moveBalls('blue','y',1);
          break
        case 65:
          this.moveBalls('blue','x',-1);
          break
        case 68:
          this.moveBalls('blue','x',1);
          break
         default:
          break
      }
    }
  }
  moveBalls(color, axis, amount) {
    let newState = this.state;
    const oppositeAxis = axis === 'y' ? 'x': 'y';
    const oppositeColor = color === 'red' ? 'blue' : 'red';
    const wallBalls = [];
    for(const b of this.state.balls[color]) {
      if((amount === -1 && b[axis] === 0) || (amount === 1 && b[axis] === 9)) {
        wallBalls.push(b);
      }
    }
    for(let ball of this.state.balls[color]) {
      if (ball[axis] + amount >= 0 &&
          ball[axis] + amount <= 9 &&
          !wallBalls.find(b => b[axis] === ball[axis] + amount && b[oppositeAxis] === ball[oppositeAxis])
        ) {
        ball[axis] += amount;
        const ballCollision = this.state.balls[oppositeColor].findIndex(b => b[axis] === ball[axis] && b[oppositeAxis] === ball[oppositeAxis])
        if (ballCollision !== -1) {
          newState.balls[oppositeColor].splice(ballCollision, 1);
          newState.balls[color].push(new Ball(this.state[color+"Spawn"][0],this.state[color+"Spawn"][1], color))
          newState.balls[oppositeColor].push(new Ball(this.state[oppositeColor+"Spawn"][0],this.state[oppositeColor+"Spawn"][1], oppositeColor))
        }
      }
    }
    this.setState(newState);
  }
  render() {
    let balls = [];
    for(const ball of this.state.balls.blue) {
      balls.push(<BallComponent x={ball.x} y={ball.y} color={ball.color} />)
    }
    for(const ball of this.state.balls.red) {
      balls.push(<BallComponent x={ball.x} y={ball.y} color={ball.color} />)
    }
    return (
      <div className="App">
        <div id="grid">
         {balls}
        </div>
      </div>
    );
  }

  
}

export default keydown(App);
