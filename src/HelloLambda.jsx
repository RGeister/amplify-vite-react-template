// src/App.js
import React, { useState } from 'react';
import { API } from 'aws-amplify';

function HelloLambda() {
  const [message, setMessage] = useState('');


  //https://nosc3kvttk.execute-api.eu-central-1.amazonaws.com/default/HelloWorldFunction

  const fetchMessage = async () => {
    try {
      const response = await API.get('YOUR_API_NAME', '/');
      setMessage(response.message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Amplify App</h1>
        <button onClick={fetchMessage}>Fetch Message</button>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default HelloLambda;
