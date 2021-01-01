const path = require(`path`);
const {createFilePath} = require(`gatsby-source-filesystem`);

exports.createPages = ({graphql, actions}) => {
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    }

    // Create post pages
    const articles = result.data.allMarkdownRemark.edges;
    articles.forEach(({node}) => {
      actions.createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/article.tsx`),
        context: {
          // Data passed to context is available in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      });
    });
  });
};

exports.onCreateNode = ({node, actions, getNode}) => {
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({node, getNode});
    actions.createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
