import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authentication';


class CreateContact extends Component {
    constructor(props){
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeAdress = this.onChangeAdress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            lastname: '',
            email: '',
            number: '',
            company: '',
            adress: ''
        }

    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }

        if(localStorage.jwtToken) {
            const decoded = jwt_decode(localStorage.jwtToken);
            this.setState({
                company: decoded.company
            })
          }
    }
    // onChange methods

    onChangeFirstName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeNumber(e) {
        this.setState({
            number: e.target.value
        });
    }

    onChangeAdress(e) {
        this.setState({
            adress: e.target.value
        });
    }

    onSubmit(e) {
       e.preventDefault();

       const contact = {
           name: this.state.name,
           lastname: this.state.lastname,
           email: this.state.email,
           number: this.state.number,
           company: this.state.company,
           adress: this.state.adress
       }


       console.log(contact);

        axios.post('http://localhost:5000/contacts/add', contact) 
           .then(res => console.log(res.data));

       window.location = '/user';
    }


    render() {
       
        const well={
            background: '#f6f6f6', border: '2px solid #f6f6f6', 
            opacity: '0.8', borderRadius: '8px 8px 8px 8px',
            boxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)',
            WebkitBoxShadow: '7px 14px 43px 7px rgba(0, 0, 0, 0.55)',
            MozBoxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)'
        }
        return(
            <div style={{marginTop: '30px'}}>
                <h3>Create New Contact</h3>
                <hr />
                <br/>
                <div className='container' style={well}>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group' style={{marginTop:'15px'}}>
                      <label><strong>First Name: </strong></label>
                        <input type='text'
                               required
                               className='form-control'
                               value={this.state.name}
                               onChange={this.onChangeFirstName}
                               />
                  </div>
                  <div className='form-group'>
                      <label><strong>Last Name: </strong></label>
                        <input type='text'
                               required
                               className='form-control'
                               value={this.state.lastname}
                               onChange={this.onChangeLastName}
                               />
                  </div>
                  <div className='form-group'>
                      <label><strong>Email: </strong></label>
                        <input type='email'
                               required
                               unique='true'
                               className='form-control'
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                               />
                  </div>
                  <div className='form-group'>
                      <label><strong>Phone Number: </strong></label>
                        <input type='tel'
                               required
                               unique='true'
                               className='form-control'
                               value={this.state.number}
                               onChange={this.onChangeNumber}
                               />
                  </div>
                  <div className='form-group'>
                      <label><strong>Company: </strong></label>
                        <input type='text'
                               readOnly
                               required
                               unique='true'
                               className='form-control'
                               value={this.state.company}
                               />
                  </div>
                  <div className='form-group'>
                      <label><strong>Adress: </strong></label>
                        <input type='text'
                               required
                               className='form-control'
                               value={this.state.adress}
                               onChange={this.onChangeAdress}
                               />
                  </div>

                  <div className='form-group'>
                      <input type='submit' value='Create New Contact' className='btn btn-primary' />
                  </div>
                </form>     
            </div>
            </div>
        )
    }
}

CreateContact.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(CreateContact);