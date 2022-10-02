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
 
class Footer extends Component {

  render() {
    
const pathName = location.pathname.replace('/','')

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
                {pathName == 'bookmark' ? <RiBookmarkFill /> : <RiBookmarkLine />}
              </span>
            </Link>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
