import React, {Component} from "react";

export default class DetailedMessage extends Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return(
        <div>
            <button onClick={this.handleClick}>Back To Inbox</button>
            <li>From: {this.props.contents.sender}</li>
            <li>To: {this.props.contents.recipient}</li>
            <li>Time Sent: {this.props.contents.date}</li>
            <li>Subject: {this.props.contents.subject}</li>
            <li>Body: {this.props.contents.message}</li>
        </div>
        )
    }

    handleClick(event) {
        // console.log('click');
        // console.log(event);
        // use a callback
        this.props.viewMessageList(this.props.emails);
    }

}