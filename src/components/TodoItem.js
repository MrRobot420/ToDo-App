import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class TodoItem extends Component {

    // Checks and returns the style of a todo object
    getStyle = () => {
        return {
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            background: this.props.todo.completed ? '#33ff77' : '#f4f4f4',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'         // One line if - else !
        }
    }

    render() {
        const { id, title } = this.props.todo;
        return (
            <div style={ this.getStyle() }>
                <p> 
                    { id } ) {' '}
                    {' '}
                    { title }
                    {' '}
                    {' '}
                    {/*             this.props 'climbs' up to Todos! */}
                    <input type='checkbox' onChange={ this.props.toggleComplete.bind(this, id) }/>
                    <button style={btnStyle} onClick={ this.props.deleteItem.bind(this, id) }> X </button>
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

export default TodoItem
