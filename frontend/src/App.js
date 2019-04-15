import React, { Component } from 'react';
import './App.css';
import  {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'

import * as actionCreator from './store/actions/actions';

import Home from './components/Home/Home';
import Game from './components/Game/Game';
import Search from './components/Search/Search';
import NoMatch from './components/NoMatch/NoMatch';

class App extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/game' component={Game} />
          <Route path='/search' exact component={Search}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchGames: () => dispatch(actionCreator.fetchGames()),
});

export default connect(null,mapDispatchToProps)(App);
