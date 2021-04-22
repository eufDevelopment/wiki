import React, { Component } from 'react'
import { Link } from 'gatsby'
import Layout from "../components/layout"
import Seo from "../components/seo"
import MagnifyingGlass from "../svg/magnifyingGlass.svg"

if (typeof window !== `undefined`){ 
  const { search } = window.location;
} else {
  const { search } = 'ultimate';
}
const urlQuery = new URLSearchParams(search).get('s');   

// Search component
class Search extends Component {   
  state = {
    query: '',
    results: [],
    value : '',
    isLoaded: false
  }
  componentDidMount() {
    this.setState({ isLoaded: true });
    if(urlQuery){
        if (urlQuery.length > 2 && !this.state.isLoaded) {
            const results = this.getSearchResults(urlQuery)
            this.setState({ results: results, query: urlQuery, value: urlQuery })
        } 
    } 
  }
 
  render() {
    const ResultList = () => { 
      if (this.state.results.length > 0 ) {
        return this.state.results.map((page, i) => (
          <div className="item-search" key={i}>
            <Link to={`/wiki/${page.url}`} className="link">
              <p>{page.title}</p>
            </Link>
          </div>
        ))
      } else if (this.state.query.length > 2) {
        return 'No results for ' + this.state.query
      } else if (
        this.state.results.length === 0 &&
        this.state.query.length > 0
      ) {
        return 'Please insert at least 3 characters'
      } else {
        return ''
      }
    }

    return (
        <Layout>
            <Seo title="Search" />            
            <div className="search-wrapper">
                <label className="searchLabel" htmlFor="search">
                    <span className="visually-hidden">
                        Search site
                    </span>
                </label>
                <input
                id="search"
                className="search__input search"
                type="text"
                onChange={this.search}
                placeholder={'Search'}
                value={this.state.value}
                />
                <button aria-label="Search Button" className="searchButton" title="Search" type="submit"><span><MagnifyingGlass /></span></button>
            </div>
            <div className="search__list" style={{ marginTop: `2em`}}>
                <ResultList />
            </div>
        </Layout>
    )
  }

  getSearchResults(query) {
    if (typeof window !== `undefined`){ 
    var index = window.__FLEXSEARCH__.en.index
    var store = window.__FLEXSEARCH__.en.store
    } else {
      var index = ''
      var store = ''
    }
    if (!query || !index) {
      return []
    } else {
      var results = []
      // search the indexed fields
      Object.keys(index).forEach(idx => {
        results.push(...index[idx].values.search(query)) // more search options at https://github.com/nextapps-de/flexsearch#index.search
      })

      // find the unique ids of the nodes
      results = Array.from(new Set(results))

      // return the corresponding nodes in the store
      var nodes = store
        .filter(node => (results.includes(node.id) ? node : null))
        .map(node => node.node)

      return nodes
    }
  }

  search = event => {
    const query = event.target.value;
    if (this.state.query.length > 2) {
      const results = this.getSearchResults(query)
      this.setState({ results: results, query: query, value: query })
    } else {
      this.setState({ results: [], query: query, value: query })
    }
  }
  
}

export default Search