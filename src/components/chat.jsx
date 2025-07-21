import { useEffect, useState, useRef } from "react";
import socket from "@/socket";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Send } from "lucide-react";
import { ArrowBack, ForkLeft } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function ChatBox({ user, peer, conversation = [] }) {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    if (conversation.length) setChat(conversation);
  }, [conversation]);

  useEffect(() => {
    if (!user?.id || !peer?.id) return;

    socket.connect();
    socket.emit("join", user.id);

    const handleIncomingMessage = (incomingMsg) => {
      if (
        (incomingMsg.senderId === peer.id && incomingMsg.receiverId === user.id) ||
        (incomingMsg.senderId === user.id && incomingMsg.receiverId === peer.id)
      ) {
        setChat((prev) => [...prev, incomingMsg]);
      }
    };

    socket.on("receiveMessage", handleIncomingMessage);

    return () => {
      socket.off("receiveMessage", handleIncomingMessage);
      socket.disconnect();
    };
  }, [user?.id, peer?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSend = () => {
    if (!msg.trim()) return;

    const newMsg = {
      senderId: user.id,
      receiverId: peer.id,
      content: msg,
    };

    socket.emit("sendMessage", newMsg);
    setChat((prev) => [...prev, newMsg]);
    setMsg("");
  };

  const isTyping = false;

  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        overflow: "hidden",
        bgcolor: theme.palette.background.paper,
      }}
    >
      {/* Header */}
      <Paper
        elevation={1}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          px: 2,
          py: 1.5,
        }}
      >

        <Box display="flex" alignItems="center" gap={2}>

          <ArrowBack onClick={() => router.back()} />
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {peer?.name?.[0] || "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              {peer?.name || "User"}
            </Typography>
            {isTyping && (
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  animation: "pulse 1.5s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 0.2 },
                    "50%": { opacity: 1 },
                    "100%": { opacity: 0.2 },
                  },
                }}
              >
                typing...
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 2,
          overflowY: "auto",
          backgroundColor: theme.palette.grey[50],
        }}
      >
        {chat.map((m, i) => {
          const isMe = m.senderId === user.id;
          const sender = isMe ? user : peer;

          return (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: 1,
                mb: 2,
              }}
            >
              {!isMe && (
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.light }}
                >
                  {sender?.name?.[0] || "U"}
                </Avatar>
              )}
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  maxWidth: "70%",
                  borderRadius: 3,
                  borderTopLeftRadius: isMe ? 3 : 0,
                  borderTopRightRadius: isMe ? 0 : 3,
                  bgcolor: isMe ? theme.palette.primary.main : theme.palette.grey[300],
                  color: isMe ? theme.palette.common.white : theme.palette.text.primary,
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="body2">{m.content}</Typography>
              </Box>
              {isMe && (
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.light }}
                >
                  {sender?.name?.[0] || "U"}
                </Avatar>
              )}
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!msg.trim()}
          sx={{ ml: 1 }}
        >
          <Send size={20} />
        </IconButton>
      </Box>
    </Container>
  );
}




























// export default function ChatBox({ user, peer }) {
//   const [msg, setMsg] = useState("");
//   const [chat, setChat] = useState([]);

//   useEffect(() => {
//     if (!user?.id || !peer?.id) return;

//     socket.connect();
//     socket.emit("join", user.id);

//     const handleIncomingMessage = (incomingMsg) => {
//       console.log("receiveMessage", incomingMsg);
//       if (
//         (incomingMsg.senderId === peer.id && incomingMsg.receiverId === user.id) ||
//         (incomingMsg.senderId === user.id && incomingMsg.receiverId === peer.id)
//       ) {
//         setChat((prev) => [...prev, incomingMsg]);
//       }
//     };

//     socket.on("receiveMessage", handleIncomingMessage);

//     return () => {
//       socket.off("receiveMessage", handleIncomingMessage); // 🔥 remove listener
//       socket.disconnect(); // optional, you might want to keep connection alive instead
//     };
//   }, [user?.id, peer?.id]);


//   const handleSend = async () => {
//     const newMsg = {
//       senderId: user.id,
//       receiverId: peer.id,
//       content: msg,
//     };

//     socket.emit("sendMessage", newMsg);
//     setChat((prev) => [...prev, newMsg]);

//     // try {
//     //   await axios.post("http://localhost:5000/send", newMsg);
//     // } catch (err) {
//     //   console.error(err);
//     // }

//     setMsg("");
//   };

//   return (
//     <div>
//       <h4>Chat with {peer.name}</h4>
//       <div className="chat-log">
//         {chat.map((m, i) => (
//           <p key={i}>
//             <strong>{m.senderId === user.id ? "You" : peer.name}:</strong>{" "}
//             {m.content}
//           </p>
//         ))}
//       </div>

//       <input value={msg} onChange={(e) => setMsg(e.target.value)} />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// }