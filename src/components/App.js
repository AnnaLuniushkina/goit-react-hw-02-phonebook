import React, { Component } from "react";
import shortid from "shortid";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import FilterContact from "./FilterContact/FilterContact";

class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  filterChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  }

  contactsFilter = name => {

    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  addContact = ({name, number}) => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

      if (newContact) {
        alert(`${name} is already in contact`);
        return contacts;
      } else {
        return {
          contacts: [
            {
              id: shortid(),
              name,
              number,
            },
            ...contacts,
          ],
        };
      }

    });
  };

  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { filter } = this.state;
    return (
      <>
        <div className="Phonebook__container">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <FilterContact 
          title="Find contact by name"
          onChange={this.filterChange}
          value={filter}
        />
          <ContactList contactsFilter={this.contactsFilter(filter)} onDelete={this.onDelete} />
        </div>
    </>
  );
  };
};

export default App;