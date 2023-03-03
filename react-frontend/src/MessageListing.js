import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Pusher from "pusher-js";

const MessageListing = () => {
    const [message, setMessage] = useState([]);

    useEffect(() => {
    console.log(window.Echo.channel);
    window.Echo.channel('channel-message').listen('.all-messages', (response) => {
        setMessage(response.data.data);
     });
            const response = axios.get(`http://127.0.0.1:8000/api/message`)
                .then(response => {
                    setMessage(response.data.data);
                })
                .catch(err => {
                    console.error(err);
                });
        return () => {
            window.Echo.leave("channel-message");
        };

    }, [])

    const sendMessage = ()=>{
        axios
        .post(`http://127.0.0.1:8000/api/message`, {
          message: "Coder Nik !",
        })
        .then((response) => {
            setMessage(response.data.data);
        })
        .catch(err => {
            console.error(err);
        });
    }
    return (
        <div className='container'>
            <div className='m-4'>
                <h1>Message Broadcast</h1>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Enter Message</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="inputPassword" />
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary mb-3" onClick={sendMessage}>Submit</button>
                    </div>
                </div>
            </div>
            <div className=''>
                {message?.map((messages) =>
                    <ul key={messages.id}>
                        <li>{messages.message}</li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default MessageListing
