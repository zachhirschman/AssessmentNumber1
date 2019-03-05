import React, { Component } from "react"
import SearchBar from "../SearchSideBar/SearchSideBar"
import "./Dashboard.css"
import ChatBoard from "../ChatBoard/ChatBoard";
import Profile from "../Profile/Profile";

export default class Dashboard extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className = "DashContainer">
                <Profile/>
                <ChatBoard/>
                <SearchBar/>
            </div>
        )
    }
}
