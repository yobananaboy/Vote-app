import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  if(props.facebookUser === true) {
    var login = <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={`/facebook/${props.user}`} className='facebook-login'>{props.user}</Link>
                  </li>
                  <li className="nav-item">
                    <a href='/logout' className='logout'>Log out</a>
                  </li>
                </ul>;
  } else {
    login = <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a href='/facebook-login'>Login</a>
              </li>
            </ul>;
  }
  
  return(
    <nav className="navbar navbar-expand-lg">
        <a href='/' className="navbar-brand">
            <span className="h3">Matt's voting app</span>
        </a>
      {login}
    </nav>
  );
}

export default Navbar;