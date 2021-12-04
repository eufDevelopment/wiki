import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import EUFImg from "../images/euf-yellow.png"
import ErasmusImg from "../images/erasmus.png"

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
              src={EUFImg} 
              alt="EUGEM by the EUF with the support of the Erasmus+ Programme of the European Union." 
              className="image-left"
              style={{
                maxHeight:'90px',
                marginBottom: "0"
              }}
              />
        <img 
              src={ErasmusImg} 
              alt="EUGEM by the EUF with the support of the Erasmus+ Programme of the European Union." 
              className="image-right"
              style={{
                maxHeight:'90px',
                marginBottom: "0"
              }}
              />
        <div className="cftpt20" dangerouslySetInnerHTML={{ __html: data.confluencePage.bodyHtml }} />
      </main>
    </Layout> )}
  ></StaticQuery>
)

export default homePage