import React from 'react';
import Helmet from 'react-helmet';
import {StaticQuery, graphql} from 'gatsby';

import Header from '../components/header';

interface Props {
  readonly title?: string;
}

export default class Layout extends React.Component<Props> {
  render(): JSX.Element {
    const {children} = this.props;
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <div>
            <Helmet
              title={data.site.siteMetadata.title}
              meta={[
                {
                  name: 'description',
                  content:
                    '联合互娱开放的各类文档信息，希望它们可以为他人参考和借鉴，发挥最大的价值。',
                },
                {
                  name: 'keywords',
                  content: '联合互娱, 联合音乐, UnionMusic, 开放资源, 风格指南, 透明薪酬',
                },
              ]}
            />
            <Header title={data.site.siteMetadata.title} />
            <div
              style={{
                margin: '0 auto',
                maxWidth: 960,
                padding: '0px 1.0875rem 1.45rem',
                paddingTop: 0,
              }}>
              {children}
            </div>
          </div>
        )}
      />
    );
  }
}
