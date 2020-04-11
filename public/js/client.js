
socket.on('connect',()=>{
    console.log(socket.id)
})
socket2.on('connect',()=>{
    console.log(socket2.id)
})

socket.on('messageFromServer', (dataFromServer)=>{
    console.log(dataFromServer);
    socket.emit('dataToServer',{data: "Data from the Client"})
    
    socket.on('ping',()=>{
        console.log('first was recieved from the server');
    })

    socket.on('pong',(latency)=>{
        console.log(latency);
        console.log("test was sent to the server")
    })

    socket2.on('welcome', (msg)=>{
        console.log(msg)
    })
})

document.querySelector('#message-form').addEventListener('submit',(event)=>{
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage)
    socket.emit('newMessageToServer',{text: newMessage})
})
socket.on('messageToClients',(msg)=>{
    console.log(msg)
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})
