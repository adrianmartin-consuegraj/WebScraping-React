import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
//import { DOMParser } from 'dom-parser';
//import DOMParser from 'dom-parser';

class App extends Component {
  state = { names: [] };

  componentDidMount(){
    // use the axios library to fetch the HTML from the website
    console.log("1st step");
    axios.get("https://pokedex.org/")
      .then(response => {
        console.log("2nd step");
        console.log(response.data)
        let names = [];
        let parser = new window.DOMParser();
        let doc = parser.parseFromString(response.data, "text/html");
        let elements = doc.querySelectorAll("#monsters-list li span");

        console.log("3rd step");
        elements.forEach(element => {
          let name = element.textContent;
          names.push(name);
        });

        console.log("4th step");
        this.setState({ names });
      })
      .catch(function(err) {
        console.log("crawl failed", err);
      });
  }

  render() {
    return (
      <div>
        <p>here are all the names displayed from the Website:</p>
        <ul>
          {this.state.names.map(name => {
            return <li key={name}>{name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default App;