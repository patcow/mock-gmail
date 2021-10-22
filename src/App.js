import './App.css';
import React, {Component} from 'react';
import MessageList from './MessageList';
import DetailedMessage from "./DetailedMessage";
import ComposeForm from "./ComposeForm";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            selectedMessage: false,
            view: "messagelist",
        };

        this.viewMessageDetailed = this.viewMessageDetailed.bind(this);
        this.viewMessageList = this.viewMessageList.bind(this);
        this.loadEmails = this.loadEmails.bind(this);
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        await this.loadEmails()
    }

    render() {
        switch (this.state.view) {
            // detailed message
            case "detailedmessage":
            return (<div className="App">
                <DetailedMessage
                    contents={this.state.selectedMessage}
                    viewMessageList={this.viewMessageList}
                />
            </div>);

            case "compose":
                return (
                    <div className="App">
                        <button onClick={() => (this.viewMessageList())}>Discard draft</button>
                        <ComposeForm
                            viewMessageList={this.viewMessageList}
                            loadEmails = {this.loadEmails}
                        />
                    </div>
                )

            case "messagelist":
            default:
            return (
                <div className="App">
                    <button onClick={() => (this.viewCompose())}>Compose a new email</button>
                    <br/>
                    MessageList:
                    <MessageList
                        emails={this.state.emails}
                        viewMessageDetailed={this.viewMessageDetailed}
                        search={this.search}
                    />
                </div>
            );
        }
    }

    async loadEmails() {
        // re-load / initial load / etc
        const response = await fetch("http://localhost:3001/emails");
        const emails = await response.json();
        this.setState({emails: emails});
    }

    viewMessageDetailed(messageObject) {
        console.log("App.viewMessageDetailed(): ");
        console.log(messageObject);
        this.setState({
            selectedMessage: messageObject,
            view: "detailedmessage",
        });
    }

    viewMessageList(emails) {
        this.setState({
            selectedMessage: false,
            view: "messagelist",
        });
    }

    viewCompose() {
        this.setState({
            view: "compose",
        });
    }
    async search(event, query){
        event.preventDefault();
        const response = await fetch("http://localhost:3001/search?query="+query);
        const emails = await response.json();
        this.setState({emails: emails});
    }
}

export default App;
