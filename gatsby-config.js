require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
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
    contactUrl1: process.env.GATSBY_contactUrl1,
    contactUrl2: process.env.GATSBY_contactUrl2
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-confluence-euf",
      options: {
        limit: 50,
        hostname: process.env.GATSBY_confluenceHost,
        auth: process.env.GATSBY_confluenceAuth,
        cql: process.env.GATSBY_confluenceCQL        
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
        type: 'array',
        auth: { htaccess_user: process.env.GATSBY_confluenceHtaccess_user, htaccess_pass: process.env.GATSBY_confluenceHtaccess_pass }
      }
    },
    {
      resolve: `@ssfbank/gatsby-plugin-search-fusejs`,
      options: {
      // How to resolve each field`s value for a supported node type
      resolvers: {
        ConfluencePage : {
        id				: node => node.id,
        path			: node => node.slug,
        title     : node => node.title,
        body			: node => node.bodyHtml
        },		
      },
      // pass on fuse specific constructor options: https://fusejs.io/api/options.html
      fuseOptions: {
        keys: ['id','path','title', 'body'], // Mandatory
        ignoreLocation: true,
        treshold: 0.4,
        minMatchCharLength: 2
      },
      // if you want a copy of the serialized data structure into the public folder for external or lazy-loaded clientside consumption
      // will be put in ./public folder and will end up as ./public/fuse-search-data.json
      copySerializationToFile: 'fuse-search-data',
    
      // Allow separate namespaces unde reach resolver,
      // which again leads to the same namespaces in the data
      // useResolverNamespaces: false,
      // Optional filter to limit indexed nodes
      //filter: (node, getNode) => node.frontmatter.tags !== 'exempt',
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
