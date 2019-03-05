const express = require('express');
const app = express();
//Sockets
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser');
//Session
const session = require('express-session')
//Database
const massive = require("massive")
require("dotenv").config()
//Security
const bcrypt = require("bcrypt")
const saltRounds = 12

//Session
app.use(session({
    secret:"secret",
    saveUninitialized:false,
    resave:false
}))

//app use
app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json())

//database
massive(
    process.env.connection_string
).then(db => {
    console.log("Connected to Database")
    app.set("db",db)
}).catch(error =>{console.log(error)})

//sockets

let connectedUsers = []

io.sockets.on('connection', (socket) =>{

    console.log('user connected')

    //When a user connects to server, put them in their own chat-room with the address that is the same as their socket id


    socket.join('/Home')

    socket.on('message', (message) => {
        console.log("Sent Message: ",message)
        io.in("/Home").emit('messageFromServer', message);
    })

 
    socket.on("NewUser",( newUser =>{
        console.log(newUser.email)

        if(newUser.email){
            connectedUsers.push({...newUser, [socket.id]:socket.id})
            io.in("/Home").emit("UserEnter", connectedUsers)
        }
        else{
            console.log("No one there")
        }
        
        
    }))

    socket.on('disconnect', () => {
        // connectedUsers2 = connectedUsers.slice()
        let index = connectedUsers.findIndex(user => user[socket.id] == socket.id)
        console.log(" Index to delete: ", index)
        index != -1? connectedUsers.splice(index,1):console.log("Something's wrong")

        io.in("/Home").emit("UserEnter", connectedUsers)
    })
})


//User endpoints

//get all users
app.get("/api/users", (req,res) =>{
    console.log(req)
    const db = req.app.get("db")
    db.get_users().then(response =>{
        res.status(200).json(response.data)
    })
})

//Get current user Session
app.get("/api/user", (req,res) =>{
    // console.log("Current user Session:",req.session.user)
    res.status(200).json(req.session.user)
})

//update status
app.put("/api/user", (req,res) =>{
    const db = req.app.get("db")
    const {status,id} = req.body
    db.update_status([status,id]).then(response =>{
        //add new status to user session
        req.session.user.status = response[0].status
        res.status(200).json(req.session.user)
    })
})


app.post("/register", (req,res) =>{
    const db = req.app.get("db")
    const { first_name, last_name,status,profile_picture,department,messages,password,email } = req.body

    bcrypt.hash(password, saltRounds).then(hashedPassword =>{
        db.create_user([first_name, last_name,status,profile_picture,department,messages,hashedPassword,email]).then(()=>{
            req.session.user = {first_name, last_name,status,profile_picture,department,messages,hashedPassword,email}
            res.status(200).json(req.session.user)
        }).catch(error =>{
            if(error.message.match(/duplicate key/)){
                res.status(409).json("That user already exists.")
            }
            else{
                console.log(req.body)
                console.log(error)
                res.status(500).json("An error occured on the server.")
            }
        })
    })
})

app.post('/login', (req, res) => {
    const db = req.app.get('db')
    const { logEmail, logPassword } = req.body
    db.user_login(logEmail).then(user =>{
  
      if(user.length){ // because array is coming back from database. something to do with arrays being truthy
  
        bcrypt.compare(logPassword, user[0].password).then(passwordMatch =>{
          if(passwordMatch){
            req.session.user = { email: user[0].email, first_name:user[0].first_name, last_name: user[0].last_name,status:user[0].status,profile_picture:user[0].profile_picture,department: user[0].department,messages:user[0].messages} //setting it equal to username on session
            res.status(200).json(req.session.user)
          }
          else{
            res.status(403).json({message:"Incorrect password"})
          }
        })
      }
      else{
        res.status(403).json({message: "Unknown user"})
      }
    })
    
});

app.post('/logout', (req, res) => {
    req.session.destroy()
    res.status(200).end()
  });


const path = require('path')
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})


const port = 4000;
server.listen(port, ()=> console.log(`Server listening on port ${port}`));