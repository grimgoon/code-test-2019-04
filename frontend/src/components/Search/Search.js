import React, {Component} from 'react';
import qs from 'query-string'

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
        if(this.state.searchData !== null) {
            this.setState({searchData : null});
        }

        let {location} = this.props;
        const parseGet = qs.parse(location.search);

        if(typeof(parseGet.value) !== 'undefined' && parseGet.value !== null) {
            request.searchIgdbGames(parseGet.value).then((res) => {this.setState({searchData : res.data})});
        }
    };

    searchCards = () => (
        typeof(this.state.searchData.error) === 'undefined' ? 
            <div className={style.cards}>{this.state.searchData.map(data => <Card key={data.name} name={slugify(data.name)}/>)}</div> :
            this.noResults()
    );

    noResults = () => <div className={style.noResults}>No Results were found</div>
    
    renderData = () => {
        const {searchData} = this.state;

        if(searchData === "loading") {
            return "Loading..."
        } else if (searchData !== null && typeof(searchData) == 'object') {
            return this.searchCards()
        }
        return null;
    }

    render() {
        const renderData = this.renderData();

        return (
            <>
                <SearchBar/>
                <div className={style.content}>
                    {renderData}
                </div>
            </>
        );
    };
};

export default Search;