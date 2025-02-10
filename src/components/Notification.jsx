// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const NotificationComponent = ({ userId }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [message, setMessage] = useState('');
//   const [targetUserId, setTargetUserId] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Connect to the Socket.IO server
//     const newSocket = io('http://localhost:5000/notifications', {
//       transports: ['websocket'],
//     });
//     setSocket(newSocket);

//     // Join the user's notification room
//     newSocket.emit('joinNotifications', userId);

//     // Listen for incoming notifications
//     newSocket.on('receiveNotification', (notification) => {
//         console.log('Received notification', notification);
//         setNotifications(notification)
//       // setNotifications((prevNotifications) => [...prevNotifications, notification]);
//     });


//     // Cleanup on unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [userId]);

//   const sendNotification = async () => {
//     if (!targetUserId) {
//       alert('Please enter a message and target user ID.');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/noti/connect-rm', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: userId,
//           propertyId: '123', // Example property ID
//           tar_id: targetUserId,
//         }),
//       });

//       const data = await response.json();
//       console.log('Notification sent:', data);
//     } catch (error) {
//       console.error('Failed to send notification:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Notification System</h1>
//       <h2>User ID: {userId}</h2>

//       <div>
//         <h3>Send Notification</h3>
//         <input
//           type="text"
//           placeholder="Enter target user ID"
//           value={targetUserId}
//           onChange={(e) => setTargetUserId(e.target.value)}
//           style={{ marginRight: '10px', padding: '5px' }}
//         />
//         <button onClick={sendNotification} style={{ padding: '5px 10px' }}>
//           Send Notification
//         </button>
//       </div>

//       <div>
//         <h3>Received Notifications</h3>
//         <ul>
//           {notifications.map((notification, index) => (
//             <li key={index} style={{ marginBottom: '10px' }}>
//               <strong>{notification.Type}</strong>: {notification.Text}
//               <small>Sent at: {new Date(notification.created_at).toLocaleString()}</small>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default NotificationComponent;

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationComponent = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io('http://localhost:5000/notifications', {
      transports: ['websocket'],
    });
    setSocket(newSocket);

    // Join the user's notification room
    newSocket.emit('joinNotifications', userId);

    // Listen for incoming notifications
    newSocket.on('receiveNotification', (notificationData) => {
      console.log('Received notification', notificationData);
      
      const newNotifications = Array.isArray(notificationData) ? notificationData : [notificationData];
      setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  const sendNotification = async () => {
    if (!targetUserId) {
      alert('Please enter a target user ID.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/noti/connect-rm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          propertyId: '123', // Example property ID
          tar_id: targetUserId,
        }),
      });

      const data = await response.json();
      console.log('Notification sent:', data);
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Notification System</h1>
      <h2>User ID: {userId}</h2>

      <div>
        <h3>Send Notification</h3>
        <input
          type="text"
          placeholder="Enter target user ID"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={sendNotification} style={{ padding: '5px 10px' }}>
          Send Notification
        </button>
      </div>

      <div>
        <h3>Received Notifications</h3>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>{notification.Type}</strong>: {notification.Text} <br />
              <small>Sent at: {new Date(notification.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationComponent;
