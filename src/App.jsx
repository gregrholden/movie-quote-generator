import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
// Import movie-quotes package:
// https://github.com/vilaboim/movie-quotes
const movieQuotes = require('movie-quotes');

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchMovie = this.fetchMovie.bind(this);
    this.newQuote = this.newQuote.bind(this);
    this.state = {
      quote: "What we've got here is failure to communicate.",
      movie: "Cool Hand Luke",
      poster: "https://m.media-amazon.com/images/M/MV5BOWFlNzZhYmYtYTI5YS00MDQyLWIyNTUtNTRjMWUwNTEzNjA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_SX300.jpg"
    }
  }

  newQuote() {
    let movie = movieQuotes.random().split('"');
    let quote = "";
    let title = "";
    // Handle 2 odd cases:
    if (movie[2].trim() == "Rumack:") {
      quote = "Striker: Surely you can't be serious.\r\nRumack: I am serious... and don't call me Shirley.";
      title = "Airplane!";
    }
    else if (movie[2].includes("Gold Hat")) {
      // No idea why the maintainer named this one "Gold Hat"
      quote = movie[1].trim();
      title = "The Treasure of the Sierra Madre";
    }
    else {
      quote = movie[1].trim();
      title = movie[2].trim();
    }

    this.fetchMovie(title);
    this.setState(()=> {
      return {
        quote: quote,
        movie: title
      }
    });
  }

  fetchMovie(title) {
    let titlePlus = title.split(" ").join("+");
    fetch("http://www.omdbapi.com/?apikey=8872b875&t=" + titlePlus)
    .then(res => res.json())
    .then(result => {
      this.setState({
        poster: result.Poster
      });
    });
  }

  render() {
    console.log(this.state.data);
    return(
      <div className="App">
        <h1 className="title">Top Movie Quotes</h1>
        <h4 className="subtitle"><a href="https://www.afi.com/afis-100-years-100-movie-quotes/">According to AFI</a></h4>
        <div className="container">
          <div className="quote-container">
            <p className="quote">"{this.state.quote}"</p>
            <p className="movie">- {this.state.movie}</p>
          </div>
          <div className="poster"><img src={this.state.poster} name={this.state.movie} /></div>
        </div>
        <button className="btn" onClick={this.newQuote}>New Quote</button>
      </div>
    );
  }
}

export default hot(module)(App);