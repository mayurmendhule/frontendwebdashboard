import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manufacturer.css';

function ManufacturerDashboard({ user }) {
  const [messages, setMessages] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [transporter, setTransporter] = useState('');
  const [transporterOptions, setTransporterOptions] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://webdashboardbackend.onrender.com/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchTransporterOptions = async () => {
      try {
        const response = await axios.get('https://webdashboardbackend.onrender.com/transporters');
        setTransporterOptions(response.data);
      } catch (error) {
        console.error('Error fetching transporter options', error);
      }
    };

    fetchTransporterOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the orderId is already used
    const existingOrder = messages.find((message) => message.orderId === orderId);
    if (existingOrder) {
      alert('Please use a unique Order ID');
      return;
    }

    try {
      await axios.post('https://webdashboardbackend.onrender.com/messages/send', {
        orderId,
        to,
        from,
        quantity,
        address,
        transporter,
      });
      alert('Message sent successfully');
      // Clear input fields
      setOrderId('');
      setTo('');
      setFrom('');
      setQuantity('');
      setAddress('');
      setTransporter('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div>
      <h2>Manufacturer Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          <option value="">Select Quantity</option>
          <option value="1">1 ton</option>
          <option value="2">2 tons</option>
          <option value="3">3 tons</option>
        </select>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Transporter"
          value={transporter}
          onChange={(e) => setTransporter(e.target.value)}
          list="transporterOptions"
        />
        <datalist id="transporterOptions">
          {transporterOptions.map((option) => (
            <option key={option.id} value={option.name} />
          ))}
        </datalist>
        <button type="submit">Send Message</button>
      </form>
      <h3>Received Messages</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>To</th>
            <th>From</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Address</th>
            <th>Transporter</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.orderId}>
              <td>{message.orderId}</td>
              <td>{message.to}</td>
              <td>{message.from}</td>
              <td>{message.quantity}</td>
              <td>{message.price}</td>
              <td>{message.address}</td>
              <td>{message.transporter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManufacturerDashboard;

