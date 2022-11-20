import React, { Component } from 'react';

class Counter extends Component {
    // state = {
    //     value: this.props.counter.value,
    //     tags: ['tag1', 'tag2', 'tag3']
    // };

    // constructor() {
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }

    renderTags() {
        if (this.props.counter.tags.length === 0) return <p>There are not tags!</p>
        return <ul>
            {this.props.counter.tags.map(tag => <li key={tag.id}>{tag}</li>)}
        </ul>; 
    }


    handleIncrement = product => { // arrow function? 
        console.log(product); // referencing the current object
        this.setState({count : this.props.counter.value + 1});
        // obj.method();
        // function (); 
    }

    render() { 
        console.log("props", this.props);
        return (<div>
            {this.props.children}
            <h4>{this.props.id}</h4>
            {/* {this.renderTags()} */}
            <span className="this.getBadgeClasses()">{this.formatCount()}</span>
            <button
                onClick={() => this.props.onIncrement(this.props.counter)}
                className="btn btn-secondary btn-sm">
                Increment
            </button>
            <button onClick={() => this.props.onDelete(this.props.counter.id)} className="btn btn-danger btn-sm m-2"> Delete </button>
        </div>);
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount() {
        const { value } = this.props.counter;
        return this.props.counter.value === 0 ? "Zero" :value;
    }
}
 
export default Counter;