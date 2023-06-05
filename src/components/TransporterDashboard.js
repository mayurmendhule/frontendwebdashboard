import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/Transporter.css"

function TransporterDashboard({ user }) {
  const [messages, setMessages] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [price, setPrice] = useState('');
  const [repliedOrderIds, setRepliedOrderIds] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://webdashboardbackend.onrender.com/messages', {
          params: {
            user: user
          }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, [user]);

  useEffect(() => {
    const fetchRepliedOrderIds = async () => {
      try {
        const response = await axios.get('https://webdashboardbackend.onrender.com/replied-order-ids');
        setRepliedOrderIds(response.data);
      } catch (error) {
        console.error('Error fetching replied order IDs', error);
      }
    };

    fetchRepliedOrderIds();
  }, []);

  const handleReply = async (e) => {
    e.preventDefault();
    
    if (repliedOrderIds.includes(orderId)) {
      alert('Reply already sent for this order ID');
      return;
    }

    try {
      await axios.post('https://webdashboardbackend.onrender.com/messages/reply', { orderId, price });
      alert('Reply sent successfully');
      setRepliedOrderIds([...repliedOrderIds, orderId]);
    } catch (error) {
      console.error('Error sending reply', error);
    }
  };

  return (
    <div>
      <h2>Transporter Dashboard</h2>
      <form onSubmit={handleReply}>
        <select
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        >
          <option value="">Select Order ID</option>
          {messages.map((message) => (
            <option value={message.orderId} key={message.orderId}>
              {message.orderId}
            </option>
          ))}
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Reply</button>
      </form>
      <h3>Received Messages</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>To</th>
            <th>From</th>
            <th>Quantity</th>
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
              <td>{message.address}</td>
              <td>{message.transporter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransporterDashboard;
