import React from "react"
import { graphql, Link, navigate  } from "gatsby"


import Layout from "../../components/layout"
import Seo from "../../components/seo"

const WikiPage = ({ data }) => {
  const { id, slug, title, bodyHtml, labels, ancestors, localImages } = data.confluencePage
  let newBodyHtml = bodyHtml
  if(localImages.length>0) {
    for(let i=0; i<localImages.length; i++){
      let lImage = localImages[i]
      if(lImage.hasOwnProperty('url') && lImage.hasOwnProperty('childImageSharp')){
        let imgUrl = lImage.url.split('?', 1)[0];
        newBodyHtml = newBodyHtml.replace(imgUrl,lImage.childImageSharp.fluid.src).replace(imgUrl.replace('/attachments/','/thumbnails/'),lImage.childImageSharp.fluid.src)
      }
    }
  }
  return (
    <Layout>
      <Seo title={title} />
      <div className="breadcrumb">
      <small>
        {ancestors.map(ancestor => (
            <span 
            className='crumb'
            key={ancestor.id}
            id={ancestor.id}
            >
            <Link 
              to={`/wiki/${ancestor.id}`}
              className={ancestor.id === `32959` ? `hidden` : `crumbly`}  
              style={{
                textDecoration: "none",
                margin: "6px 6px 0 0",
              }}
            >
              {ancestor.title}  
            </Link>            
            </span>
          ))}
        </small>
      </div>

      <div className="back-button-wrapper">
        <small>
        <button className="back-button white-button" onClick={() => { navigate(-1) }}>&#10092; Back</button>
        </small>
      </div>

      <h1>{title}</h1>
      
      <main>             
        <div dangerouslySetInnerHTML={{ __html: newBodyHtml }} />
      </main>

      <div className="labels">
      {labels.map(label => (
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
      <div style={{ maxWidth: "300px", marginBottom: "1.45rem" }} />
    </Layout>
  )
}


export default WikiPage

export const WikiPageQuery = graphql`
  query wikiQuery($id: String) {
    confluencePage(id: { eq: $id }) {
      title
      bodyHtml
      labels{
        name
        id
      }
      ancestors {
        id
        title
      }
      localImages{
        url
        relativePath
        childImageSharp{
          fluid{
            src
          }
        }
      }
    }
  }
`