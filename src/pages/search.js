import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Fuse from "fuse.js"
import SearchBar from "../components/searchbar"

const searchPage = ({ data }) => {
  let urlQuery = '';
  if (typeof window !== `undefined`){ 
    const { search } = window.location;
    urlQuery = new URLSearchParams(search).get('s');   
  }   

  const confluencePages = data.allConfluencePage.edges.map(n => n.node)
  const options = {
    keys: ['title', 'body'],
    ignoreLocation: true,
    treshold: 0.2, //A threshold of 0.0 requires a perfect match (of both letters and location), a threshold of 1.0 would match anything
    minMatchCharLength: 2,
    isCaseSensitive: false,
    includeScore: true,
    useExtendedSearch: true
  }
  const fuse = new Fuse(confluencePages, options)
  let results = fuse.search(urlQuery)


  const ResultList = () => { 
    if (results.length > 0 ) {
      return results.map((page, i) => (
        <div className="item-search" key={i}>
          <Link to={`/wiki/${page.item.slug}`} className="link">
            <p>{page.item.title}</p>
          </Link>
          <p style={{display: 'none'}}>Score: {page.score}</p>
        </div>
      ))
    } else if (urlQuery.length > 2) {
      return 'No results for ' + this.state.query
    } else if (
      results.length === 0 &&
      urlQuery.length > 0
    ) {
      return 'Please insert at least 3 characters'
    } else {
      return ''
    }
  }



  return (
    <Layout>
      <Seo title="Search results" />
      <SearchBar defaultSearchQuery={urlQuery}/>
      <div className="search__list" style={{ marginTop: `2em`}}>
        <ResultList />
      </div>
    </Layout>
  )
}

export default searchPage

export const searchPageQuery = graphql`
  query searchPageQuery {
    allConfluencePage {
      edges {
        node {
          title
          slug
          bodyHtml
        }
      }
    }
  }
`