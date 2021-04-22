import { useStaticQuery, graphql } from "gatsby"
export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author
            contactEmail
            contactUrl1
            contactUrl2
            description
            facebook
            instagram
            lang
            mainSite
            title
            twitter
            ultical
          }
        }
      }
    `
  )
  return site.siteMetadata
}