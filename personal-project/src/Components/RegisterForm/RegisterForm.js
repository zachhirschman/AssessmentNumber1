import React, { Component } from "react"
import "./RegisterForm.css"
import axios from "axios"
import { updateUser } from "../../Redux/reducer"
import { connect } from "react-redux"
import  { Redirect } from "react-router-dom"

export class RegisterForm extends Component{
    constructor(){
        super()
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            profile_picture:"",
            department:"",
            redirect:false,
            //Login state
            logEmail:"",
            logPassword:"",
            errorMsg:""
        }
        this.login = this.login.bind(this)
    }

    login(){
        const { logEmail, logPassword} = this.state
        let body = {
            logEmail,
            logPassword
        }
        axios.post("/login", body).then(response =>{
            this.props.updateUser(response.data)
            this.setState({redirect:true})
        }).catch(error =>{error.status = "403"? this.setState({errorMsg:"Incorrect username or password"}) : null})
    }

    register = () =>{
        const {first_name, last_name,profile_picture,department,password,email} = this.state
        let body = {
            first_name,
            last_name,
            status:"",
            profile_picture,
            department,
            messages:[""],
            password,
            email
        }

        axios.post("/register", body).then(response =>{
            this.props.updateUser(response.data)
            this.setState({redirect:true})
        })
    }

    render(){
        const redirect = <Redirect to = "/dashboard" />
        const form = (
        <div className ="register-inputs">
        <h3>First things first, tell us a little about yourself.</h3>
            <h3>Name:</h3>
            <input placeholder = "Enter First name" onChange = {(e) =>{this.setState({first_name:e.target.value})}}></input>
            <input placeholder = "Enter Last name" onChange = {(e) =>{this.setState({last_name:e.target.value})}}></input>
            <h3>Email:</h3>
            <input className = "email-input" placeholder = "Enter email..." onChange = {(e) =>{this.setState({email:e.target.value})}}></input>
            <h3>Password:</h3>
            <input className = "password-input" type = "password" placeholder = "Enter password..." onChange = {(e) =>{this.setState({password:e.target.value})}}></input>
            <h3>Upload a profile picture!</h3><input placeholder = "Input image url here! " onChange = {(e) =>{this.setState({profile_picture:e.target.value})}}></input>

            <h3>Select your department:</h3>
            <select value={this.state.department}>
                <option>Engineering</option>
                <option>Management</option>
                <option>Buisness</option>
                <option>Marketing</option>
                <option>Sales</option>
            </select>
            <button onClick = {this.register}>Register</button>

            <h3>Already got an account? Login!</h3>

            <input className = "email-input" placeholder = "Enter email..." onChange = {(e) =>{this.setState({logEmail:e.target.value})}}></input>
            <input className = "password-input" type = "password" placeholder = "Enter password..." onChange = {(e) =>{this.setState({logPassword:e.target.value})}}></input>
            { this.state.errorMsg? <p>{this.state.errorMsg}</p> : null }
            <button onClick = {this.login}>Login</button>
            </div>
            )
        return(
            <div className = "register-box">
                
                
                <div className = "About-icons">
                <h2 className = "header-text">Get connected, stay connected.</h2>

                <div className = "message-icon">
                    <img src = "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-02-512.png"></img>
                    <p>Got something to say? Say it through connect! Our services include a real-time messaging system that allows you to stay in contact with anyone on our servers, anytime. </p>
                </div>
                
                <div className = "person-icon">
                    <img src = "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-05-512.png"></img>
                    <p>Curate a list of people you talk to the most. </p>
                </div>

                <div className = "share-icon">
                    <img src = "https://cdn4.iconfinder.com/data/icons/multimedia-75/512/multimedia-13-512.png"></img>
                    <p>Share with friends</p>
                </div>
                

                </div>

                <div className = "line"></div>

                <div className = "choose-box">
                    
                    <div className = "login-box">
                        <h1>Got an account? Log in!</h1>
                        <input className = "email-input" placeholder = "Enter email..." onChange = {(e) =>{this.setState({logEmail:e.target.value})}}></input>
                        <input className = "password-input" type = "password" placeholder = "Enter password..." onChange = {(e) =>{this.setState({logPassword:e.target.value})}}></input>
                        { this.state.errorMsg? <p>{this.state.errorMsg}</p> : null }
                        <button onClick = {this.login}>Login</button>
                    </div>

                    <div className = "orLine">
                        <div className = "circle">
                            <p>Or</p>
                        </div>
                    </div>

                    <div className = "register">
                        <h1>Register!</h1>
                        <h4>First things first, tell us a little about yourself.</h4>
                        <h4>Name:</h4>
                        <input placeholder = "Enter First name" onChange = {(e) =>{this.setState({first_name:e.target.value})}}></input>
                        <input placeholder = "Enter Last name" onChange = {(e) =>{this.setState({last_name:e.target.value})}}></input>
                        <h4>Email:</h4>
                        <input className = "email-input" placeholder = "Enter email..." onChange = {(e) =>{this.setState({email:e.target.value})}}></input>
                        <h4>Password:</h4>
                        <input className = "password-input" type = "password" placeholder = "Enter password..." onChange = {(e) =>{this.setState({password:e.target.value})}}></input>
                        <h4>Upload a profile picture!</h4><input placeholder = "Input image url here! " onChange = {(e) =>{this.setState({profile_picture:e.target.value})}}></input>

                        <h4>Select your department:</h4>
                        <select value={this.state.department}>
                            <option>Engineering</option>
                            <option>Management</option>
                            <option>Buisness</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                        </select>

                        <button onClick = {this.register}>Register</button>
                    </div>

                </div>
                
                {this.state.redirect? redirect:null}
            </div>
        )
    }
}

export default connect(null, {updateUser})(RegisterForm)