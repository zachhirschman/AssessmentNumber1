import React, { Component } from "react"
import "./Contact.css"
import { connect } from "react-redux"
import chatImg from "./chatImg.png"
import moreImg from "./moreImg.png"


export class Contact extends Component{
    constructor(props){
        super(props)
        this.state = {
            users:[],
            toggleMore:false
        }
    }

    componentDidUpdate = (prevProps) =>{
        if(this.props.users.email != prevProps.users.email){

            this.setState({
                users:this.props.users
            })
        }
    }

    toggleMoreMenu =() =>{
        this.setState({
            toggleMore: !this.state.toggleMore
        })
    }

    render(){
        const { first,last,image,status,dept } = this.props

        const moreMenu = (
            <div className = {this.state.toggleMore? "moreMenu":"hidden"}>
                <p>Department: {dept}</p>
                <p>Status: {status}</p>
            </div>
        )
        
        return(
            <div className = "contact-box">
                <div className = "individual-contact">
                    <img className = "profile-pic" src = {image}></img>
                    <p>{first + " " + last}</p>
                    <button className = "message-button"><img src = {chatImg}></img></button>
                    <button onClick = {this.toggleMoreMenu} className = "more-button"><img src = {moreImg}></img></button>
                </div>
                    {this.state.toggleMore? moreMenu : null}    
            </div>
        )
        
    }
}

const mapStateToProps = (reducerstate) =>{
    return{
        users:reducerstate.usersConnected
    }
}

export default connect(mapStateToProps , null)(Contact)

