import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/actions'
import style from './Home.module.css';

import Card from '../../utils/UI/Card/Card';
import SearchBar from '../../utils/UI/SearchBar/SearchBar';

class Home extends Component {

    componentDidMount() {
        this.props.fetchTwitchTop();
    };

    twitchTopCards = () => {
        return this.props.twitchTop.map(data => {
            return <Card key={data.name} name={data.name} />
        });
    };

    render() {
        
        return (
            <>  
                <SearchBar/>
                <h2>Trending games on Twitch right now!</h2> 
                <div className={style.cards}>
                    {this.twitchTopCards()}
                </div>
            </>
        );
    };
};

const mapStateToProps = state => ({
    twitchTop : state.twitchTop
});

const mapDispatchToProps = dispatch => ({
        fetchTwitchTop: () => dispatch(actionCreator.fetchTwitchTop(17)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);