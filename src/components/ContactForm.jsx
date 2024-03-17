import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onAddContact(name, number);
    this.setState({ name: '', number: '' });
  };

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
