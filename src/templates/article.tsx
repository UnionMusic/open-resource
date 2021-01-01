import React from 'react';
import {graphql} from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import styles from './article.css';

interface Props {
  readonly data: PageQueryData;
  readonly pageContext: {
    previous?: string;
    next?: string;
  };
}

export default class Article extends React.Component<Props> {
  render(): JSX.Element {
    const {data} = this.props;
    const post = data.markdownRemark;

    return (
      <Layout>
        <Helmet
          title={`${post.frontmatter.title} | ${data.site.siteMetadata.title}`}
          meta={[
            {
              name: 'twitter:card',
              content: 'summary',
            },
            {
              name: 'og:title',
              content: post.frontmatter.title,
            },
            {
              name: 'og:description',
              content: data.site.siteMetadata.title,
            },
            {
              name: 'og:image',
              content: data.site.siteMetadata.url,
            },
          ]}
        />
        <div className={styles.article}>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{__html: post.html}} />
        </div>
      </Layout>
    );
  }
}

interface PageQueryData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      url: string;
    };
  };
  markdownRemark: {
    html: string;
    frontmatter: {
      title: string;
      date?: string;
    };
  };
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        url
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      frontmatter {
        title
      }
    }
  }
`;
