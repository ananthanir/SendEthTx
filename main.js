const crypto = require('crypto');
// const axios = require('axios');

// Ethereum node URL
const ethereumNodeUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID';

// Transaction object
const transactionObject = {
    "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
    "gas": "0x55555",
    "maxFeePerGas": "0x1234",
    "maxPriorityFeePerGas": "0x1234",
    "input": "0xabcd",
    "nonce": "0x0",
    "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
    "value": "0x1234"
  };

// Private key of the sender
const privateKey = Buffer.from('PRIVATE_KEY', 'hex');

// Create a new Ethereum transaction
const txData = {
  nonce: transactionObject.nonce,
  gasPrice: transactionObject.gasPrice,
  gasLimit: transactionObject.gasLimit,
  to: transactionObject.to,
  value: transactionObject.value,
  data: transactionObject.data,
};

// Get the transaction hash
const txHash = crypto.createHash('sha3-256').update(JSON.stringify(txData)).digest('hex');

// Sign the transaction hash
const { signature } = crypto.sign(null, Buffer.from(txHash, 'hex'), privateKey);

// Create the signed transaction object
const signedTx = {
  ...txData,
  v: '0x' + (signature[64] + 27).toString(16), // Recovery ID + 27
  r: '0x' + signature.slice(0, 32).toString('hex'),
  s: '0x' + signature.slice(32, 64).toString('hex'),
};

console.log(signedTx)

// Send the signed transaction
// axios.post(ethereumNodeUrl, {
//   jsonrpc: '2.0',
//   method: 'eth_sendRawTransaction',
//   params: [JSON.stringify(signedTx)],
//   id: 1,
// })
//   .then((response) => {
//     console.log('Transaction successful:', response.data.result);
//   })
//   .catch((error) => {
//     console.error('Transaction error:', error.response.data.error);
//   });
