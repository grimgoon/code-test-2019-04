import React, {Component} from 'react';
import qs from 'query-string'
import {connect} from 'react-redux'; 
import * as request from '../../utils/backend';
import SearchBar from '../UI/SearchBar/SearchBar';

class Search extends Component {
    state = {
        searchData : null
    }

    componentDidMount() {
        this.meep();
    }

    meep = () => {
        let {location} = this.props;
        const parseGet = qs.parse(location.search);

        if(typeof(parseGet.value) !== 'undefined') {
            request.searchIgdbGames(parseGet.value).then((res) => {this.setState({searchData : res.data})});
        } else {
            this.setState({searchData : "No data found lmao"});
        }       
    };

    searchCards = () => {
        return <div>I'm a card</div>
    }

    render() {
        console.log(this.props);
        const searchData = typeof(this.state.searchData) === 'object' && this.state.searchData !== null ? 
            this.searchCards() : 
            null;

        return (
            <div>
                <SearchBar/>
                {searchData}
            </div>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    
});

export default Search;