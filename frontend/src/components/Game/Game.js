import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import * as actionCreator from '../../store/actions/actions';
import NoMatch from '../NoMatch/NoMatch';
import GamePage from './GamePage/GamePage';

class Game extends Component {
    state = {
        path: null
    }

    componentDidMount() {
        let {location, match} = this.props;
        let updatedPath = location.pathname.replace(match.path + '/','').replace('/','');
        if(!match.isExact || !updatedPath.indexOf('/')) {
            this.setState({path: updatedPath});
        }
        this.shouldFetchGame();
    };

    componentDidUpdate() {
        this.shouldFetchGame();
    };

    shouldFetchGame = () => {
        console.log(typeof(this.props.games[this.state.path]) === 'undefined', this.props.fetchedCachedGames);
        console.log(this.state.path);
        if(typeof(this.props.games[this.state.path]) === 'undefined' && this.props.fetchedCachedGames) {
            this.props.fetchGame(this.state.path);
        }    
    };

    gameRoutes = () => {
        let {fetchedCachedGames,match,games} = this.props;

        if(fetchedCachedGames) {
            return Object.values(games)
                .map(game => {

                    let render = game.error ? <NoMatch/> : <GamePage data={game}/>
                    return <Route
                        key={game.slug} 
                        exact 
                        path={match.path + '/' + game.slug} 
                        render={() => render}
                    />
                }
            );
        }
    };

    render() {
        let gameRoutes = this.gameRoutes();
        return(
            <Switch>
                <Route exact path="/game" component={NoMatch}/>
                {gameRoutes}
            </Switch>
        )
    };
};

const mapStateToProps = state => ({
    games : state.gameData,
    fetchedCachedGames : state.fetchedCachedGames
});

const mapDispatchToProps = dispatch => ({
        fetchGame: (slug) => dispatch(actionCreator.fetchGameBySlug(slug)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);