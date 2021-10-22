import {Component} from "react";

export default class ComposeForm extends Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            // might be better to have an email object
            email: {
                recipient: '',
                subject: '',
                sender: 'jane@galvanize.com',
                message: '',
                date: Date.now(),
                id: Math.floor(Math.random() * 9999999999),
            }
        }
    }

    render() {
        return(
            <form onSubmit={this.handleClick}>
                <button onClick={this.handleClick}>Send</button>
                <br/>
                <label>
                    To:
                    <input type="text" placeholder="Enter Recipient" name="recipient"
                           onChange={(event) => this.handleChange(event, "recipient")}/>
                </label>
                <br/>
                <label>
                    From: jane@galvanize.com
                </label>
                <br/>
                <label>
                    Subject:
                    <input type="text" placeholder="Enter Subject" name="subject"
                           onChange={(event) => this.handleChange(event, "subject")}/>
                </label>
                <br/>
                <label>
                    Message:
                    <input type="text" placeholder="Enter Message" name="message"
                           onChange={(event) => this.handleChange(event, "message")}/>
                </label>
                <br/>

            </form>
        )
    }

    async handleClick(event){
        event.preventDefault();
        // console.log("hi");

        const body = JSON.stringify(this.state.email)
        // send post request
        await fetch("http://localhost:3001/send", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body,
        });
        this.props.viewMessageList(this.props.emails);

        // where do we request new emails?
        this.props.loadEmails();
    }

    handleChange(event, key) {
        const newEmail = this.state.email;
        newEmail[key] = event.target.value;
        this.setState({
            email: newEmail,
        });
        // console.log("updated " + key + "with " + event.target.value);
    }


}