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
    contactUrl1: "https://script.google.com/macros/s/AKfydbxcBB_4n62kf3GThROGrvUF9r2Cv5AdkEJxGe6eHJvNfXkJlPvwUOS3UOhxqPVAjRa8JA/exec",
    contactUrl2: "https://script.google.com/macros/s/AKfycbxcDB_4n82kf3GThROGrvUE9r2Cv5AdkEJxGe6eHJvNfXkJlPvwUOS3UOhxqPVAjRa8JA/exec"
//    contactUrl1: process.env.GATSBY_contactUrl1,
//    contactUrl2: process.env.GATSBY_contactUrl2
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-confluence-euf",
      options: {
        hostname: "eugem.atlassian.net",
        limit: 50,
        auth: "Basic ZXVnZW0tZXVmQHVsdGltYXRlZmVkZXJhdGlvbi5ldTpJOUFmOFpROXZTbEJLSnI2Vndsd0M0RUM=",
        cql: "space=EUGEM"
//        auth: process.env.GATSBY_confluenceAuth,
//        cql: process.env.GATSBY_confluenceCQL
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
        auth: { htaccess_user: "eugem-euf@ultimatefederation.eu", htaccess_pass: "I9Af8ZQ9vSlBKJr6VwlwC4EC" },
//        auth: { htaccess_user: process.env.GATSBY_confluenceHtaccess_user, htaccess_pass: process.env.GATSBY_confluenceHtaccess_pass },
        type: 'array'
      },
    },
    {
      resolve: "gatsby-source-remote-file",
      options: {
        // The source url of the remote file
        url: "https://eugem.atlassian.net/wiki/spaces/EUGEM/",

        // OPTIONAL
        // Provide a name for the created node (default: "remote")
        name: "files",

        // OPTIONAL
        // Adds htaccess authentication to the download request if passed in.
        auth: { htaccess_user: `eugem-euf@ultimatefederation.eu`, htaccess_pass: `I9Af8ZQ9vSlBKJr6VwlwC4EC` },

        // OPTIONAL
        // If something goes wrong while downloading the remote file,
        // report a warning instead of stopping the build. (default: "fail")
        errorHandling: "warn",
      },
    },
    {
      resolve: `@ssfbank/gatsby-plugin-search-fusejs`,
      options: {
      // How to resolve each field`s value for a supported node type
      resolvers: {
        ConfluencePage : {
        id				: node => node.id,
        path			: node => node.slug,
        title         	: node => node.title,
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
