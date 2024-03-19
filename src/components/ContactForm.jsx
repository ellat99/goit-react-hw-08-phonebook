import React, { Component } from 'react';
import PropTypes from 'prop-types';
//starea componenta a 2 campuri goale
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  //responsabila pt actualiz starii cand utiliz introduce valori
  handleChange = event => {
    const { name, value } = event.target;
    //actualizam starea
    this.setState({ [name]: value });
  };
  //apelata cand formularul e trimis
  handleSubmit = event => {
    //opreste reincarcarea pag
    event.preventDefault();
    //extrage valorile name number din starea componentei si le trimite catre functia onAddContact primita ca proprietate
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    //reseteaza name,number
    this.setState({ name: '', number: '' });
  };
  //defineste formularul
  render() {
    const { name, number } = this.state;

    return (
      <form style={styles.form} onSubmit={this.handleSubmit}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            title="Name may contain only letters, apostrophe, dash, and spaces."
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Number:
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\d*"
            title="Phone number must be digits"
            required
            style={styles.input}
          />
        </label>

        <button type="submit" style={styles.button}>
          Add Contact
        </button>
      </form>
    );
  }

  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };
}

const styles = {
  form: {
    maxWidth: '300px',
    margin: '0 auto',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default ContactForm;
