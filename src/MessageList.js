import React, {Component} from 'react';
import CompactMessage from "./CompactMessage";


class MessageList extends Component{

    constructor(props) {
        super(props);
        this.state= {
            query:""
        }
    }


    render() {
        const messages = this.props.emails.map((message)=> {
            return (<CompactMessage
                key = {message.id}
                messageObject = {message}
                viewMessageDetailed={this.props.viewMessageDetailed}
            />)
        })
        return(
            <div>
                <form onSubmit={(e)=>this.props.search(e,this.state.query)}>
                    <label>
                        Search:
                        <input type="text" placeholder="Search Subject" name="subjectSearch"
                               onChange={(event) => this.setState({query: event.target.value})}/>
                    </label>
                </form>
                <table>
                    <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Subject</th>
                    </tr>
                    </thead>
                    <tbody>
                    {messages}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MessageList;