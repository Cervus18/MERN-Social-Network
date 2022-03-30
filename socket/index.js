const io = require("socket.io")(7000,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let users = []
const addUser = (userId, socketId) => {
    !users.some(user=>user._id === userId) && users.push({userId,socketId})
}

const removeUser=(socketId)=>{
    users = users.filter(user=> user.socketId !== socketId)
}

io.on("connection", (socket) => {
    console.log("a user connected.")

    //take user id and socket id from users

    socket.on("addUser", (userId)=>{
        addUser(userId, socket.id)
        io.emit("getUsers",users)
    })

    socket.on("disconnect", ()=>{
        console.log("a user disconnected")
        removeUser(socket.id)
        io.emit("getUsers",users)

    })
})