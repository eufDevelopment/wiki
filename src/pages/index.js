import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Homeimg from "../images/home.png"

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
      <main>
        <img 
              src={Homeimg} 
              alt="EUGEM by the EUF with the support of the Erasmus+ Programme of the European Union." 
              style={{
                maxHeight:'90px',
                marginBottom: "0"
              }}
              />
        <div dangerouslySetInnerHTML={{ __html: data.confluencePage.bodyHtml }} />
      </main>
    </Layout> )}
  ></StaticQuery>
)

export default homePage