import React, { Component } from 'react';

class ToolTip extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <span className="toolTip" style={
            {
                display: this.props.show,
                left: this.props.x,
                top: this.props.y
            }
            }>
                {`${this.props.data.item}: ${this.props.data.count}`}
            </span>
        );
    }
}


export default ToolTip;