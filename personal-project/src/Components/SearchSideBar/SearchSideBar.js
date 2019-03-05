import React, { Component } from "react"
import "./SearchSideBar.css"
import socketIOClient from 'socket.io-client';
import Contact from "../Contact/Contact";
import { connect } from "react-redux"
import { updateUsersConnected } from "../../Redux/reducer"
const socket = socketIOClient("http://localhost:4000/");

export class SearchSideBar extends Component{
    constructor(){
        super()
        this.state = {
            toggleSearch:false,
            usersConnected:[]

        }

        socket.on("UserEnter", data =>{
            this.props.updateUsersConnected(data)
            this.setState({
                usersConnected:data
            })
            console.log("Users in this room : ", this.state.usersConnected)
        })
        
    }
    
    handleButtonPress = () =>{ 
        this.setState({
            toggleSearch:!this.state.toggleSearch
        })
    }

    componentDidUpdate = (prevProps) =>{
        if(this.props.user.email != prevProps.user.email){
            socket.emit("NewUser", this.props.user)
        } 
    }
    

    render(){
        const {usersConnected} = this.state
        return(
            <div className = "search-parent">

                <div className = "container-header">
                    <h3 className = "title">Who's Online?</h3>
                    <button onClick={() =>{this.handleButtonPress()}}><img className = "searchIcon" src="https://img.icons8.com/ios-glyphs/30/000000/search.png"></img></button>
                </div>

                <div className = {this.state.toggleSearch? "show":"hidden"}>
                    <input className = "searchbar" placeholder = "Search for a name or department"></input>
                </div>

                <div>
                {
                    usersConnected.length? usersConnected.map(user =>{
                        return(
                            <div className = "contacts">
                                <Contact first = {user.first_name}
                                         last = {user.last_name}
                                         image = {user.profile_picture}
                                         status = {user.status}
                                         dept = {user.department}/>
                            </div>
                        )
                    })
                    :
                    null
                    
                }
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps,{updateUsersConnected})(SearchSideBar)