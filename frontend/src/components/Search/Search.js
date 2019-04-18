import React, {Component} from 'react';
import qs from 'query-string'
import {connect} from 'react-redux'; 

import * as request from '../../utils/backend';
import slugify from '../../utils/slugify'
import style from './Search.module.css';

import SearchBar from '../UI/SearchBar/SearchBar';
import Card from '../UI/Card/Card';

class Search extends Component {
    state = {
        searchData : null
    }

    componentDidMount() {
        this.searchGames();
    }

    componentDidUpdate(prevProps, prevState,snapshot) {
        if(snapshot) {
            this.searchGames();
        }
    }

    getSnapshotBeforeUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            return this.props.location.search
          }
        return null;
    }

    searchGames = () => {
        let {location} = this.props;
        const parseGet = qs.parse(location.search);

        if(typeof(parseGet.value) !== 'undefined' && parseGet.value !== null) {
            request.searchIgdbGames(parseGet.value).then((res) => {this.setState({searchData : res.data})});
        } else {
            this.setState({searchData : {}});
        }       
    };

    searchCards = () => {
        return typeof(this.state.searchData.error) === 'undefined' ? 
            <div className={style.cards}>{this.state.searchData.map(data => <Card name={slugify(data.name)}/>)}</div> :
            this.noResults();
    }

    noResults = () => {
        return <div className={style.noResults}>No Results were found</div>
    }

    render() {
        const searchData = typeof(this.state.searchData) === 'object' && this.state.searchData !== null ? 
            this.searchCards() : 
            null;

        return (
            <>
            <SearchBar/>
            <div className={style.content}>
                {searchData}
            </div>
            </>
        );
    };
};

export default Search;