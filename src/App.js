import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { encodeURL } from '@solana/pay';
import QRCode from 'react-qr-code';

function App() {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [qrCodeValue, setQrCodeValue] = useState('');

    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    const createPaymentRequest = () => {
        const url = encodeURL({
            recipient: new PublicKey(recipient),
            amount: parseFloat(amount),
            label: 'Solana Pay Demo',
            message: message,
            memo: `Paid to ${recipient}`, // Optional
        });
        setQrCodeValue(url);
    };

    return (
        <div className="App">
            <h1>Send SOL with a Message</h1>
            <input type="text" placeholder="Recipient Address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            <input type="number" placeholder="Amount in SOL" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={createPaymentRequest}>Generate QR Code</button>
            {qrCodeValue && <QRCode value={qrCodeValue} />}
        </div>
    );
}

export default App;
