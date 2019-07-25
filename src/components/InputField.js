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
          margin: '0 auto',
        //   border: 'none',
          border: '2px #ccc dotted'
        }
    }
    
    getButtonStyle = () => {
        return {
          width: window.innerWidth / 13,
          height: '35px',
          display: 'flex',
          justifyContent: 'center',
          background: '#',
          textAlign: 'center',
          color: '#00AAFF',
          fontSize: '26px',
          margin: '0 auto',
          border: 'none',
          borderRadius: '20%',
          cursor: 'pointer'
        }
    }

    render() {
        // const { id, title } = this.props.todo;
        return (
            <div>
                <p> 
                    {/*             this.props 'climbs' up to Todos! */}
                    <input style={this.getInputStyle()} placeholder="Enter new TODO here..."/><br/>
                    {' '}
                    <button style={this.getButtonStyle()} onClick={ this.props.addItem }> Add </button><br/>
                </p>
            </div>
        )
    }
}


// PropTypes (Good Practise!)
InputField.propTypes = {
    addItem: PropTypes.object.isRequired
}

// const btnStyle = {
//     background: '#ff0000',
//     color: '#fff',
//     border: 'none',
//     padding: '5px 9px',
//     borderRadius: '50%',
//     cursor: 'pointer',
//     float: 'right'
// }

export default InputField;
