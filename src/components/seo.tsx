import React from 'react';
import {Helmet} from 'react-helmet';

interface Props {
  title: string;
  description: string;
  url: string;
  article: boolean;
}

export default class SEO extends React.Component<Props> {
  render(): JSX.Element {
    const {title, description, url, article} = this.props;
    return (
      <Helmet title={title}>
        <meta name="description" content={description} />
        {url && <meta property="og:url" content={url} />}
        {(article ? true : null) && <meta property="og:type" content="article" />}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {title && <meta name="twitter:title" content={title} />}
        {description && <meta name="twitter:description" content={description} />}
      </Helmet>
    );
  }
}
