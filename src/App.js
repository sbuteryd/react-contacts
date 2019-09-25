import React,{Component} from 'react';
import ListContents  from './ListContents'
import  * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import {Route} from "react-router-dom";


export default class App extends Component {
    state= {
        contacts: [],
    }
  componentDidMount() {
        ContactsAPI.getAll()
            .then((contacts)=>{
                this.setState(()=>({
                    contacts
                }))
            })
  }

  removeContact = (contact)=> {
        this.setState((currentContact)=>({
            contacts:currentContact.contacts.filter((c)=>c.id !==contact.id)
        }))
      ContactsAPI.remove(contact)

    }
    createContact=(contact)=>{
        ContactsAPI.create(contact).then((contact)=>{
            this.setState((currentState)=>({
                contacts:currentState.contacts.concat([contact])
            }))
        })
    }
    render() {
        console.log('app',this.state.contacts)
    return (
        <div>
            <Route exact path='/'   render={()=>(
                <ListContents
                    contacts={this.state.contacts}
                    onDeleteContact={this.removeContact}
                />
            )}/>
            <Route path='/create' render={({history})=>(
                <CreateContact
                    onCreateContact={(contact) => {
                        this.createContact(contact)
                        history.push('/')
                    }}
                />
            )}/>

        </div>
    );
  }
}


