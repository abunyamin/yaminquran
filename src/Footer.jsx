import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  RiBookOpenLine,
  RiBookOpenFill,
  RiBookmarkLine,
  RiBookmarkFill,
  RiTimerLine,
  RiTimerFill
} from 'react-icons/ri';

const pathName = location.pathname.replace('/','')

class Footer extends Component {
  render() {
    return (
      <>
        <footer>
          <div className="menuBottom">
            <Link to="/">
              <span>
                {location.pathname == '/' ? <RiBookOpenFill /> : <RiBookOpenLine />}
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
                {pathName == 'shalat' ? <RiTimerFill /> : <RiTimerLine />}
              </span>
            </Link>
            <Link to="/bookmark">
              {' '}
              <span>
                {pathname == 'bookmark' ? <RiBookmarkLine /> : <RiBookmarkLine />}
              </span>
            </Link>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
