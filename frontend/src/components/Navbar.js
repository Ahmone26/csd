import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated} = this.props.auth;
        const authLinks = (
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
              <Link className='navbar-brand' to='/user'><FontAwesomeIcon icon={faBookOpen} style={{marginRight: '8px'}}/>Company</Link>
                <ul className='navbar-nav mr-auto'>
                    <li className='navbar-item'>
                        <Link to='/createContact' className='nav-link'>Create Contact</Link>
                    </li>
                 </ul>
                 <ul className='navbar-nav ml-auto'>
                     <a href='/login' className='nav-link' onClick={this.onLogout.bind(this)}>Logout 
                     <FontAwesomeIcon icon={faSignOutAlt} style={{marginLeft: '10px'}}/></a>
                 </ul>
             </div>
        )
      const guestLinks = (
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
            <Link className='navbar-brand' to='/login'><FontAwesomeIcon icon={faBookOpen} style={{marginRight: '8px'}} />Company</Link>
        </ul>
        <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
                <Link className='nav-link' to='/login'>Sign In <FontAwesomeIcon icon={faSignInAlt} style={{marginLeft: '8px'}}/></Link>
            </li>
        </ul>
        </div>
      )
        return(
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container'>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));