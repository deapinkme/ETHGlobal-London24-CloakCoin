import React, { useState } from 'react';

const CreateTokenForm = () => {
  const [tokenName, setTokenName] = useState('');
  const [tokenType, setTokenType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send a request to your backend to create a new token with the provided details
    // Remember to handle any errors and display appropriate messages to the user
    console.log('Token Name:', tokenName);
    console.log('Token Type:', tokenType);
    // Reset the form fields after submission
    setTokenName('');
    setTokenType('');
  };

  return (
    <div>
      <h2>Create Token</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tokenName">Token Name:</label>
          <input
            type="text"
            id="tokenName"
            value={tokenName}
            onChange={(event) => setTokenName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tokenType">Token Type:</label>
          <input
            type="text"
            id="tokenType"
            value={tokenType}
            onChange={(event) => setTokenType(event.target.value)}
            required
          />
        </div>
        <button type="submit">Create Token</button>
      </form>
    </div>
  );
};

export default CreateTokenForm;
