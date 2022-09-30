import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  RiBookOpenLine,
  RiBookmarkLine,
  RiTimerLine
} from 'react-icons/ri';

class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div className="menuBottom">
            <Link to="/">
              <span>
                <RiBookOpenLine />
              </span>
            </Link>
            {/* <Link to="/">
              {' '}
              <span>
                <RiLightbulbFlashLine />
              </span>
            </Link>
            <Link to="/">
              {' '}
              <span>
                <RiUser3Line />
              </span>
            </Link>  */}
            <Link to="/shalat">
              {' '}
              <span>
                <RiTimerLine />
              </span>
            </Link>
            <Link to="/bookmark">
              {' '}
              <span>
                <RiBookmarkLine />
              </span>
            </Link>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
