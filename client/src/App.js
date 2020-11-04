import React, { Component } from "react";

import logo from './logo.svg';
import './App.css';


function App1() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default class App extends Component {

  constructor(args) {
    super(args);
    this.state = {
      cars: []
    };
  }

  componentDidMount() {
    // fetch("http://localhost:9000/v1/cars")
    fetch("/cars")
      .then(res => res.json())
      .then(response => {
        console.log("response --", response);
        this.setState({ cars: response });
      })
  }

  render() {
    return (
      <table className="table">
        <thead>
          <th scope="col">Car</th>
          <th scope="col">Manufacture</th>
        </thead>
        <tbody>
          {
            this.state.cars.map(car => <tr>
              <td>{car.name}</td>
              <td>{car.manufacture}</td>
            </tr>)
          }
        </tbody>
      </table>
    )
  }

}

// export default App;
