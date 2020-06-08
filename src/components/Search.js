import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Results from './Results';
import SearchBar from './SearchBar';
import { useSearchStyle } from '../constants/searchThemes'

export default function LiveSearch(props) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const { placeholder } = props;
  const classes = useSearchStyle();

  useEffect(() => {
    const BASE_URL = 'http://localhost:3001/api';
    const ENDPOINT = '/lists';
    const query = `${BASE_URL}${ENDPOINT}`

    axios({
      method: 'GET',
      url: query
    }).then(response => setResults(response.data.results) && console.log("response", response.data))
  }, [term]);

  return (
    <Fragment>
      <header>
      </header>
      <main>
      <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
        <SearchBar className={classes} placeholder={placeholder} onSearch={term => setTerm(term)} />
        <Results results={results} />
        </div>
      </main>
    </Fragment>
  );
}