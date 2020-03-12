import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authentication';

import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




class Home extends Component {

    constructor(){
        super();

        this.state = {
            name: '',
            company: ''
        }
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }

        if(localStorage.jwtToken) {
            const decoded = jwt_decode(localStorage.jwtToken);
            this.setState({
                name: decoded.name,
                company: decoded.company
            })
          }
          
    }


    render() {

        const well={
            background: '#f6f6f6', border: '2px solid #f6f6f6', 
            opacity: '0.8', borderRadius: '8px 8px 8px 8px',
            boxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)',
            WebkitBoxShadow: '7px 14px 43px 7px rgba(0, 0, 0, 0.55)',
            MozBoxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)',
            marginTop: '50px',
            width: '700px'
        }
        return (
            <div className='container' style={well}>
                    <h1 style={{textAlign: 'center', marginTop: '10px'}}> Welcome <FontAwesomeIcon icon={faBookOpen} style={{marginLeft: '15px'}} />
                        <hr/>
                    </h1>
                    <div className='form-group'>
                           <h3>Name: </h3> 
                           <h3>- {this.state.name}</h3>
                    </div>
                    <div className='form-group'>
                    <hr/>
                           <h3>Company: </h3> 
                           <h3>- {this.state.company}</h3>
                    </div>
                    <hr/>
                    <div style={{marginBottom: '20px'}}>  
                    <Link to={'allContacts/'+ this.state.company }> <button type='button' className='btn btn-primary'>Contacts List</button></Link>
                    </div>
            </div>
        );
    }
}

Home.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(Home);