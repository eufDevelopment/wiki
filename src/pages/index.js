import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const homePage = () => (
  <StaticQuery
    query={graphql`
      {
        confluencePage(slug: {eq: "32959"}) {
          bodyHtml
          title
        }
      }
    `}
    render={data => (
    <Layout> 
      <Seo title="Home" keywords={[`gender equity`, `gender equality`, `ultimate`, `coaching`, `European Ultimate Federation`, `erasmus`]}  />
        <div dangerouslySetInnerHTML={{ __html: data.confluencePage.bodyHtml }} />
    </Layout> )}
  ></StaticQuery>
)

export default homePage