const socket = io.connect('http://localhost:8080'); 
const socket2 = io.conect('http://localhost:8080/admin') 


console.log(socket.io)
socket.on('connect',()=>{
    console.log(socket.id)
})

socket2.on('connect',()=>{
    console.log(socket2.id)
})

socket.on('welcome',(msg)=>{
    console.log(msg)
})
socket2.on('welcome',(msg)=>{
    console.log(msg)
})


socket.on('messageFromServer',(dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer',{data: "Data from the Client!"})
})

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer',{text: newMessage})
})

socket.on('messageToClients',(msg)=>{
    console.log(msg)
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})
