import React, { Component } from "react"
import "./ChatBoard.css"
import socketIOClient from 'socket.io-client';
const socket = socketIOClient("http://localhost:4000/");

export default class ChatBoard extends Component{
    constructor(){
        super()
        this.state = {
            message:"",
            fromServer:[]
        }
        socket.on('messageFromServer', message => {
            let update = [...this.state.fromServer, message]
            this.setState({
              fromServer: update
            })
        })
    }

    sendMessage = () => {
        socket.emit('message', this.state.message);
        this.setState({message:""})
    }


    render(){
        const myMessages = this.state.fromServer.map(message => {
            return <p>{message}</p>
          })

        return(
            <div className = "Parent-container">
                <div className = "container-Header">
                    <h3>Chatboard</h3>
                </div>


                <div className = "footer-parent">
                    <button className = "send-msg-button" onClick={this.sendMessage}>Send</button>
                    <input className = "message-bar" onChange={(e) => this.setState({message: e.target.value})}></input>
                </div>

                
                {myMessages}
                
            </div>
        )
    }
}
