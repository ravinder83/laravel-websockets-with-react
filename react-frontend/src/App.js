import React from 'react'
import MessageListing from './MessageListing'
import Echo from "laravel-echo";


const App = () => {
    window.Pusher = require("pusher-js");
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key:process.env.REACT_APP_PUSHER_KEY,
        wsHost: window.location.hostname,
        wsPort: 6001,
        wssport: 6001,
        transports: ['websocket'],
        enabledTransports: ['ws', 'wss'],
        forceTLS: false,
        disableStats: true,
        cluster:"ap2"
      })
    return (
        <div>
            <MessageListing />
        </div>
    )
}

export default App
