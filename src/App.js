import React,{Component} from 'react';
import ListContents  from './ListContents'
import  * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'



export default class App extends Component {
    state= {
        contacts: [],
        screen:'list'
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
    render() {
    return (
        <div>
            {this.state.screen ==='list'&&(
                <ListContents
                contacts={this.state.contacts}
                onDeleteContact={this.removeContact}
                onNavigate={()=>{
                    this.setState(()=>({
                        screen: 'create'
                    }))
                }}
            />)}
            {this.state.screen === 'create' &&(
                <CreateContact />
                )}

        </div>
    );
  }
}


