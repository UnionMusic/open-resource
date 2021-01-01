import React from 'react';
import {Link} from 'gatsby';
import {graphql} from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

interface TitleLinkStyle {
  [propName: string]: string;
}

interface Props {
  readonly data: PageQueryData;
}

const titleLinkStyle: TitleLinkStyle = {
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 'normal',
};

export default class IndexPage extends React.Component<Props> {
  render(): JSX.Element {
    const {data} = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const description = data.site.siteMetadata.description;
    const url = data.site.siteMetadata.url;

    return (
      <Layout title={siteTitle}>
        <SEO title={siteTitle} description={description} url={url} article={false} />
        <div>
          <p>
            本站包含 <a href="https://www.lianhe.art/">联合互娱</a>{' '}
            开放的一些产品之外的资源，更多内容在逐步增加中。我们相信开放和透明会使一家公司更具长期竞争力，所以我们尽可能把信息公开。让所有人了解我们、监督我们的同时，也希望这些信息可以为他人参考和借鉴，发挥最大的价值。
          </p>
          <h2>管理</h2>
          {data.allMarkdownRemark.edges
            .filter(({node}) => node.frontmatter.category === 'management')
            .map(({node}) => (
              <h3 key={node.id}>
                <Link to={node.fields.slug} style={titleLinkStyle}>
                  {node.frontmatter.title}
                </Link>
              </h3>
            ))}
          <h2>指南</h2>
          {data.allMarkdownRemark.edges
            .filter(({node}) => node.frontmatter.category === 'guide')
            .map(({node}) => (
              <h3 key={node.id}>
                <Link to={node.fields.slug} style={titleLinkStyle}>
                  {node.frontmatter.title}
                </Link>
              </h3>
            ))}
          <h2>参考</h2>
          {data.allMarkdownRemark.edges
            .filter(({node}) => node.frontmatter.category === 'reference')
            .map(({node}) => (
              <h3 key={node.id}>
                <Link to={node.fields.slug} style={titleLinkStyle}>
                  {node.frontmatter.title}
                </Link>
              </h3>
            ))}
          {data.allMarkdownRemark.edges
            .filter(({node}) => node.frontmatter.category === 'link')
            .map(({node}) => (
              <h3 key={node.id}>
                <Link to={node.fields.slug} style={titleLinkStyle}>
                  {node.frontmatter.title}
                </Link>
              </h3>
            ))}
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
  allMarkdownRemark: {
    edges: {
      node: {
        id: string;
        fileAbsolutePath: string;
        frontmatter: {
          date: string;
          title: string;
          layout: string;
          category: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        url
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___title], order: ASC}) {
      edges {
        node {
          id
          fileAbsolutePath
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            layout
            category
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
