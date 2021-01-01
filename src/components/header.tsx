import {Link} from 'gatsby';
import React from 'react';
import './header.css';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({title}) => (
  <div className="headerBackground">
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}>
      <h1>
        <Link to="/" className="headerLink">
          {title}
        </Link>
      </h1>
    </div>
  </div>
);

export default Header;
