import React, { useState } from 'react';

const MintTokenForm = () => {
  const [tokenType, setTokenType] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can send a request to your backend to mint tokens of the specified type and quantity
    // Remember to handle any errors and display appropriate messages to the user
    console.log('Token Type:', tokenType);
    console.log('Quantity:', quantity);
    // Reset the form fields after submission
    setTokenType('');
    setQuantity(0);
  };

  return (
    <div>
      <h2>Mint Token</h2>
      <form onSubmit={handleSubmit}>
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
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(parseInt(event.target.value))}
            required
          />
        </div>
        <button type="submit">Mint Tokens</button>
      </form>
    </div>
  );
};

export default MintTokenForm;
