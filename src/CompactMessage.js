import React from "react";

export default class CompactMessage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <tr onClick={(event) => (this.handleClick(event))}>
                <td>{this.props.messageObject.sender}</td>
                <td>{this.props.messageObject.recipient}</td>
                <td>{this.props.messageObject.subject}</td>
            </tr>
            );
    }

    handleClick(event) {
        // console.log('click');
        // console.log(event);
        // use a callback
        this.props.viewMessageDetailed(this.props.messageObject);
    }
}
