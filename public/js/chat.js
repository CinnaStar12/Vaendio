
const socket = io()


const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $msg = document.querySelector('#msg')

// Templates
const messageTemplate = document.querySelector('#msg-tem').innerHTML
const locationMessageTemplate = document.querySelector('#loc-msg-tem').innerHTML

// const {username} = Qs.parse(locaton.search, {ignoreQueryPrefix: true})


$.get("/api/user_data",)
    .then(function(data) {
        console.log(data)
    })
    
    .catch(function(err) {
      console.log(err);
    });//message
socket.on('message', (message) => {
    console.log(message)
const html = Mustache.render(messageTemplate,{
    message,
    createdAt:  moment(message.createdAt).format('h:m: a')
})
    $msg.insertAdjacentHTML('beforeend', html)
})


//location
socket.on('locationMessage', (url)=>{
    console.log(url)
    const html = Mustache.render(locationMessageTemplate,{
        url

    })
    $msg.insertAdjacentHTML('beforeend', html)
})



$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled') 

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error)=>{
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error){
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click',()=>{
    if (!navigator.geolocation){
    return alert('"Geolocation is not supported by your browser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position)=>{
            console.log(position)
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, ()=>{
                $sendLocationButton.removeAttribute('disabled')
                console.log('Location shared!')
            })
    })
})

// socket.emit('join', {unsername})