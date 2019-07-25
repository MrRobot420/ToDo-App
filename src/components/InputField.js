import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class InputField extends Component {

    // Checks and returns the style of a todo object
    getInputStyle = () => {
        return {
          width: window.innerWidth / 1.5,
          height: '40px',
          display: 'flex',
          background: '#f4f4f4',
          textAlign: 'center',
          color: '#00AAFF',
          fontSize: '30px',
          margin: '0 auto'
        }
    }
    
    getButtonStyle = () => {
        return {
          marginTop: '100px',
          width: window.innerWidth / 10,
          height: '35px',
          display: 'flex',
          justifyContent: 'center',
          background: '#f4f4f4',
          textAlign: 'center',
          color: '#00AAFF',
          fontSize: '25px',
          margin: '0 auto'
        }
    }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={ this.getStyle() }>
                <p> 
                    {/*             this.props 'climbs' up to Todos! */}
                    <input style={this.getInputStyle()} placeholder="Enter new ToDo here..."/>
                    {' '}
                    <button style={this.getButtonStyle()} onClick={ this.props.addItem.bind(this, id) }> Add </button>
                </p>
            </div>
        )
    }
}


// PropTypes (Good Practise!)
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default InputField;
