const socket = io()

socket.on('countUpdated', () => {
    console.log('the count has been updated!')
})