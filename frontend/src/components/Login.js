import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import classnames from 'classnames';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/user');
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/user')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        const well={
            marginTop: '70px', height:'300px', width: '500px', 
            background: '#f6f6f6', border: '2px solid #f6f6f6', 
            opacity: '0.8', borderRadius: '8px 8px 8px 8px',
            boxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)',
            WebkitBoxShadow: '7px 14px 43px 7px rgba(0, 0, 0, 0.55)',
            MozBoxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)'
        }
        return(
        <div className='container' style={well}>                 
            <h2 style={{marginBottom: '40px', marginTop: '10px'}}>Login</h2>
            <form onSubmit={ this.onSubmit }>
                <div className='form-group'>
                    <input
                    type='email'
                    placeholder='Email'
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name='email'
                    onChange={ this.onChangeEmail }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
                </div>
                <div className='form-group'>
                    <input
                    type='password'
                    placeholder='Password'
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })} 
                    name='password'
                    onChange={ this.onChangePassword }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-primary'>Login</button>
                </div>
            </form>
            
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)