import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actionCreator from '../../store/actions/actions'
import Card from '../../utils/UI/Card/Card';
import style from './Home.module.css';

class Home extends Component {

    componentDidMount() {
        this.props.fetchTwitchTop();
    }

    twitchTopCards = () => {
        return this.props.twitchTop.map(data => {
            const imageUrl = data.box_art_url.replace('{width}','').replace('{height}', '');
            return <Card key={data.name} name={data.name} imageUrl={imageUrl} />
        });
    }

    render() {
        console.log(this.props.twitchTop);
        return ( 
            <div className={style.cards}>
                {this.twitchTopCards()}
            </div>
        );
    }
};

const mapStateToProps = state => ({
    twitchTop : state.twitchTop
});

const mapDispatchToProps = dispatch => ({
        fetchTwitchTop: () => dispatch(actionCreator.fetchTwitchTop()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);