import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authentication';




const Contact = props => (
    <tr>
        <td>{props.contact.name}</td>
        <td>{props.contact.lastname}</td>
        <td>{props.contact.email}</td>
        <td>{props.contact.number}</td>
        <td>{props.contact.adress}</td>
        <td>
           <Link to={ '/' + props.contact._id + '/update'}><button type='button' className='btn btn-outline-success'>edit</button> </Link>  
           <button type='button' className='btn btn-outline-danger' onClick={() => {props.deleteContact(props.contact._id)}}>delete</button>
        </td>
    </tr>
)

 class ListOfContacts extends Component {
    
    constructor(props){
        super(props);

        this.deleteContact = this.deleteContact.bind(this);

        this.state = {contacts: []};
    }

    componentDidMount(){
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        axios.get(this.props.match.params.companyId)
        .then(response => {
            this.setState({ contacts: response.data})
        })

    }
    

    deleteContact(id) {
        axios.delete('http://localhost:5000/allContacts/' + id)
          .then(res => console.log(res.data));
        this.setState({
            contacts: this.state.contacts.filter(el => el._id !== id)
        })
    }

    contactsList(){
        return this.state.contacts.map(currentcontact => {
            return <Contact contact={currentcontact} deleteContact={this.deleteContact} key={currentcontact._id}/>
        })
    }


    render() {
        const well={ 
            background: '#f6f6f6', border: '2px solid #f6f6f6', 
            opacity: '0.9', borderRadius: '8px 8px 8px 8px',
            boxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)',
            WebkitBoxShadow: '7px 14px 43px 7px rgba(0, 0, 0, 0.55)',
            MozBoxShadow: '7px 14px 44px 7px rgba(0,0,0,0.55)'
        }
        return(
            <div style={{marginTop: '40px'}}>
                <h3>Logged Contacts</h3>
                <hr />
                <br/>
                <table className='table' style={well}>
                    <thead className='thead-light'>
                        <tr>
                            <th>First Name</th>                          
                            <th>Last Name</th>                           
                            <th>Email</th>                         
                            <th>Number</th>                          
                            <th>Adress</th>
                            <th>Actions</th>
                        </tr> 
                    </thead>
                    <tbody>
                        {this.contactsList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

ListOfContacts.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(ListOfContacts);