import React, { Component } from "react"
import "./Profile.css"
import axios from "axios"
import { connect } from "react-redux";
import { updateUser } from "../../Redux/reducer"

export class Profile extends Component{
    constructor(props){
        super(props)
        this.state = { 
            userInfo:this.props.userInfo,
            toggleStatusUpdate:false,
            newStatus:"",

        }
    }

    componentDidMount(){
        axios.get("/api/user").then(response =>{
            this.props.updateUser(response.data)
            this.setState({userInfo:response.data})
        })
    }

    statusUpdate = () =>{
        let body = {
            status:this.state.newStatus,
            id:this.state.userInfo.email
        }

        axios.put("/api/user", body).then(response =>{
            // trying to update whole user info. might need to change.
            this.props.updateUser(response.data)
            this.setState({
                userInfo:this.props.userInfo,
                toggleStatusUpdate: !this.state.toggleStatusUpdate
            })


        }).catch(error => { console.log("error editing status ")})
    }
    
    render(){
        const { userInfo } = this.state
        const editForm = <div><input className = "status-input" placeholder = "Enter status" onChange = {(e) =>{ this.setState({newStatus:e.target.value})}}></input><button className = "submit-btn" onClick = {this.statusUpdate}>Submit</button></div>
        return(
            <div className = "parent-container">
                <div className = "container-Header">
                    <h3>Profile</h3>
                </div>

                <div className = "picture-frame">
                    { this.state.userInfo? <img className = "profile-picture" src = {userInfo.profile_picture}></img>:null}

                </div>

                <div className = "name-bar">
                    <h3>{userInfo.first_name + " " + userInfo.last_name}</h3>
                </div>

                <div className = "about-container">
                    <h3>Department: {userInfo.department}</h3>
                    {this.state.toggleStatusUpdate?  editForm : <h3>Status: {userInfo.status} </h3> } <button className = "update-btn" onClick = {() => this.setState({toggleStatusUpdate:!this.state.toggleStatusUpdate})}>Update Status</button>
                </div>

                <div className = "friends-list">
                    <div className = "friends-header">
                        <p>Friends List</p>
                    </div>


                </div>


            </div>
        )
    }
}
function mapStateToProps(reducerState){
    return({
        userInfo:reducerState.user
    })
}

export default connect(mapStateToProps,{updateUser})(Profile)