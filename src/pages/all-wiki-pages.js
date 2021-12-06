import * as React from "react"

import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const wikiHomePage = ({ data }) => {
  const confluencePages = data.allConfluencePage.edges.map(n => n.node)
  return (
    <Layout>
      <Seo title="All Wiki Pages" />
      <h1>All wiki pages</h1>
      <ul>
        {confluencePages.map(page => (
          <li>
            <Link to={`/wiki/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
     
    </Layout>
  )
}

export default wikiHomePage

export const wikiHomePageQuery = graphql`
  query wikiHomeQuery {
    allConfluencePage {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`