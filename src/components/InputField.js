import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class InputField extends Component {

    constructor(props) {
        super(props);
        this.text_ref = React.createRef();
        // this.onSubmit = this.onSubmit.bind(this.text_ref);
    }

    onSubmit(event) { 
        const title = event.target.value; 
        return title;
    }

    // onSubmit(e) {
    //     e.preventDefault();
    //     var title = this.title;
    //     // this.props.addItem.bind(title)
    //     console.log(title);
    // }

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
        // var { title } = window.getElementById("textfield").value;
        var title = this.text_ref.current;
        // var title = this.onSubmit();
        // console.log(title);

        return (
            <div>
                <p> 
                    {/*             this.props 'climbs' up to Todos! */}
                    {/* <input refs={this.text_ref} style={this.getInputStyle()} placeholder="Add TODO here..."/><br/> */}
                    <input refs={this.text_ref} style={this.getInputStyle()} placeholder="Add TODO here..."/><br/>
                    {' '}
                    <button style={this.getButtonStyle()} onClick={ this.props.addItem.bind(this, title) }> Add </button><br/>
                </p>
            </div>
        )
    }
}

// PropTypes (Good Practise!)
InputField.propTypes = {
    addItem: PropTypes.func.isRequired
}

export default InputField;
