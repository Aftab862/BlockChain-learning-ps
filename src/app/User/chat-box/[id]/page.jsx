// "use client"

// import { useState, useEffect } from "react"
// import ChatBox from "@/components/chat"
// import Cookies from "js-cookie"
// import {
//   Box,
//   Paper,
//   Typography,
//   AppBar,
//   Toolbar,
//   Avatar,
//   Chip,
//   IconButton,
//   Container,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material"
// import {
//   ArrowBack as ArrowBackIcon,
//   Headset as HeadsetIcon,
//   FiberManualRecord as OnlineIcon,
// } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"

// const HeaderContainer = styled(AppBar)(({ theme }) => ({
//   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
//   boxShadow: theme.shadows[2],
// }))

// const ChatContainer = styled(Container)(({ theme }) => ({
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   padding: theme.spacing(2),
//   maxWidth: "800px !important",
// }))

// const FooterContainer = styled(Paper)(({ theme }) => ({
//   borderTop: `1px solid ${theme.palette.divider}`,
//   padding: theme.spacing(1, 2),
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: 0,
// }))

// export default function UserChatPage() {
//   const [user, setUser] = useState({ id: 0, name: "User" })
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

//   const admin = {
//     id: 1,
//     name: "Admin Support",
//     isOnline: true,
//   }

//   useEffect(() => {
//     // Get user ID from cookies
//     const userId = Number.parseInt(Cookies.get("user-id") || "2")
//     const userName = Cookies.get("user-name") || "User"
//     setUser({ id: userId, name: userName })
//   }, [])

//   return (
//     <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "grey.50" }}>
//       {/* Header */}
//       <HeaderContainer position="static" elevation={2}>
//         <Toolbar>
//           {isMobile && (
//             <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
//               <ArrowBackIcon />
//             </IconButton>
//           )}

//           <Avatar
//             sx={{
//               bgcolor: "rgba(255,255,255,0.2)",
//               mr: 2,
//               width: 40,
//               height: 40,
//             }}
//           >
//             <HeadsetIcon />
//           </Avatar>

//           <Box sx={{ flex: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: 600 }}>
//               Support Chat
//             </Typography>
//             <Typography variant="body2" sx={{ opacity: 0.9 }}>
//               Get help from our support team
//             </Typography>
//           </Box>

//           <Chip
//             icon={<OnlineIcon sx={{ fontSize: "12px !important" }} />}
//             label="Online"
//             size="small"
//             sx={{
//               bgcolor: "rgba(76, 175, 80, 0.2)",
//               color: "#4caf50",
//               fontWeight: 500,
//               "& .MuiChip-icon": {
//                 color: "#4caf50",
//               },
//             }}
//           />
//         </Toolbar>
//       </HeaderContainer>

//       {/* Chat Container */}
//       <ChatContainer>
//         <Box
//           sx={{
//             height: "100%",
//             maxHeight: "calc(100vh - 140px)",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <ChatBox user={user} peer={admin} />
//         </Box>
//       </ChatContainer>

//       {/* Footer */}
//       <FooterContainer elevation={1}>
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{
//             textAlign: "center",
//             display: "block",
//             fontWeight: 500,
//           }}
//         >
//           Powered by Support Chat • Typically replies within minutes
//         </Typography>
//       </FooterContainer>
//     </Box>
//   )
// }


// "use client";

// import { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';
// const userId=12;
// export default function ChatBox({  }) {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const socketRef = useRef(null);

//   useEffect(() => {
//     // Initialize socket only once
//     socketRef.current = io('http://localhost:5000');

//     // Ensure userId is not null before joining
//     if (userId) {
//       socketRef.current.emit('join', userId);
//       console.log(`🧑‍💻 Joined room: user-${userId}`);
//     }

//     socketRef.current.on('receiveMessage', (msg) => {
//       console.log("📩 Received:", msg);
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => {
//       socketRef.current.disconnect();
//       console.log("🔌 Socket disconnected");
//     };
//   }, [userId]); // run effect only when userId changes

//   const sendMessage = () => {
//     const msg = {
//       senderId: userId,
//       receiverId: 1, // adminId (static or dynamic based on your logic)
//       content: message,
//     };

//     socketRef.current.emit('sendMessage', msg);
//     setChat((prev) => [...prev, msg]);
//     setMessage('');
//   };

//   return (
//     <div>
//       {chat.map((msg, idx) => (
//         <p key={idx}>
//           <strong>{msg.senderId === userId ? 'You' : 'Admin'}:</strong> {msg.content}
//         </p>
//       ))}

//       <input
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type message..."
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

"use client";

import ChatBox from "@/components/chat";
import { useGetConversationQuery } from "@/store/slices/message";
import { skipToken } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";



export default function UserChatPage() {
  const admin = { id: 1, name: "Admin" };
  const user = { id: parseInt(Cookies.get("user-id")) };
  const { data: conversation } = useGetConversationQuery(
  user?.id ?? skipToken
  );
  return (
    <ChatBox user={user} peer={admin}
    conversation={conversation || []}
    />
  );
}
