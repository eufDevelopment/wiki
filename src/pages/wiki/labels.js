import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import withLocation from "../../components/withLocation"

const IndexPage = ({ search }) => {
    const { s } = search
    let orArray = []
    if(s) {
      orArray = s.split(",");
    }
    const data = useStaticQuery(graphql`
        {
        allConfluencePage {
            edges {
            node {
                id
                slug
                title
                labels {
                id
                name
                }
            }
            }
        }
        }
    `)
    const labelsList = new Set()
    const filteredConfluencePages = []
    data.allConfluencePage.edges.forEach(function (e) {   
        let labels = e.node.labels.map(label => label.name)
        labels.forEach(labelsList.add, labelsList)
        if(s) {         
          if(labels.some(r=> orArray.includes(r)) ) {
            filteredConfluencePages.push(e);
          }
        }  
    }); 
    const labelsArray = Array.from(labelsList).sort();
  return (
    <Layout>
      <Seo title="Pages by labels" keywords={[`wiki`, `labels`, `filter`]} />
      <h1>Pages by labels</h1>
      <div 
        className="select-labels"
        style={{
          marginBottom: "2rem"
        }}
        >
        <span 
          className="select-labels-text" 
          style={{
            fontWeight:"bold",
            fontSize: "0.85rem"
          }}
        > 
          Select labels:
        </span>
       
        <div 
          className="select-labels-labels"
        >
          {labelsArray.map(alabel => (
            <span
            key={alabel}
            id={alabel}
          >
            {orArray.includes(alabel) ? <Link title="Remove label" to={`/wiki/labels?s=${orArray.filter(lab => !lab.includes(alabel)).join(",")}`} className="label-item remove-label">{alabel}</Link> :  <Link title="Add label" to={`/wiki/labels?s=${(s + ',' + alabel).replace(/^,/, '')}`} className="label-item add-label">{alabel}</Link> }
          </span>  
          )
          )}
        </div> 
        <div 
          className="select-labels-separator"
          style={{
            borderBottom:"1px solid var(--colorB)",
            margin:"1rem auto"
          }}
        >
        </div>
      </div>
      
      <ul 
        className="labels-list"
        >
        {filteredConfluencePages.map(page => (
          <li
            key={page.node.slug}
            >
            <Link to={`/wiki/${page.node.slug}`}>{page.node.title}</Link>
            <div className="labels">
              {page.node.labels.map(label => (
                  <span 
                  className='label'
                  key={label.id}
                  id={label.id}
                  >
                    <Link 
                      to={`/wiki/labels?s=${label.name}`}
                      id={label.id}
                      key={label.id}
                      className="label-item"
                    >
                      {label.name}
                    </Link>
                  </span>
                ))}
              </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}


export default withLocation(IndexPage)

