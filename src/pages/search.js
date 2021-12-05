import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Fuse from "fuse.js";

const searchPage = () => (
    <StaticQuery
      query={graphql`
        {
            siteSearchIndex(fuse: {}) {
                fuse
            }
        }
      `}
      render={data => (
      <Layout> 
        <Seo title="Search" keywords={[`gender equity`, `gender equality`, `ultimate`, `coaching`, `European Ultimate Federation`, `erasmus`]}  />
        <main>
          
          
        </main>
      </Layout> )}
    ></StaticQuery>
  )

export default searchPage