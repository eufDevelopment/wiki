module.exports = {
  siteMetadata: {
    title: `EUGEM`,
    description: `EUGEM - European Ultimate Gender Equity Manual`,
    lang: `en`,
    mainSite: `https://ultimatefederation.eu/`,
    facebook: `https://www.facebook.com/ultimate.eu`,
    twitter: `https://twitter.com/euf_ultimate`,
    instagram: `https://www.instagram.com/ultimatefederation_eu`,
    ultical: `tbd`,
    author: `@gabrieles`,
    contactEmail: 'development@ultimatefederation.eu',
    contactUrl1: process.env.contactUrl1,
    contactUrl2: process.env.contactUrl2
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-confluence-euf",
      options: {
        hostname: "eugem.atlassian.net",
        auth: process.env.confluenceAuth,
        cql: process.env.confluenceCQL,
        limit: 50
      }
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-svgr-loader", //see https://stackoverflow.com/questions/61158924/import-svg-as-a-component-in-gatsby
      options: {
        rule: {
          include: /svg/
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0068A2`,
        theme_color: `#0068A2`,
        display: `minimal-ui`,
        icon: `src/images/eugem-favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'ConfluencePage',
        name: 'localImages',
        imagePath: 'images',
        auth: { htaccess_user: process.env.confluenceHtaccess_user, htaccess_pass: process.env.confluenceHtaccess_pass },
        type: 'array'
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
