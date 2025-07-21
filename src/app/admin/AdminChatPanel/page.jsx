// "use client"

// import { useState } from "react"
// import ChatBox from "@/components/chat"
// import { useGetUsersListingQuery } from "@/store/slices/admin"
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Badge,
//   Chip,
//   InputAdornment,
//   IconButton,
//   Drawer,
//   AppBar,
//   Toolbar,
//   useTheme,
//   useMediaQuery,
//   Stack,
// } from "@mui/material"
// import {
//   Search as SearchIcon,
//   People as PeopleIcon,
//   Chat as ChatIcon,
//   ArrowBack as ArrowBackIcon,
//   FiberManualRecord as OnlineIcon,
// } from "@mui/icons-material"
// import { styled } from "@mui/material/styles"

// const SidebarContainer = styled(Paper)(({ theme }) => ({
//   height: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   borderRadius: 0,
//   borderRight: `1px solid ${theme.palette.divider}`,
// }))

// const SidebarHeader = styled(Box)(({ theme }) => ({
//   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
//   color: theme.palette.primary.contrastText,
//   padding: theme.spacing(3, 2),
// }))

// const UserListContainer = styled(Box)(({ theme }) => ({
//   flex: 1,
//   overflowY: "auto",
//   "&::-webkit-scrollbar": {
//     width: "6px",
//   },
//   "&::-webkit-scrollbar-track": {
//     background: theme.palette.grey[100],
//   },
//   "&::-webkit-scrollbar-thumb": {
//     background: theme.palette.grey[300],
//     borderRadius: "3px",
//   },
// }))

// const MainChatArea = styled(Box)(({ theme }) => ({
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   backgroundColor: theme.palette.grey[50],
// }))

// const EmptyState = styled(Box)(({ theme }) => ({
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   padding: theme.spacing(4),
// }))

// export default function AdminChatPanel() {
//   const { data: usersData } = useGetUsersListingQuery()
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

//   const admin = { id: 1, name: "Admin" }

//   const filteredUsers =
//     usersData?.users?.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase())) || []

//   const handleUserSelect = (user) => {
//     setSelectedUser(user)
//     if (isMobile) {
//       setMobileOpen(false)
//     }
//   }

//   const handleBackToList = () => {
//     setSelectedUser(null)
//     setMobileOpen(true)
//   }

//   const sidebarContent = (
//     <SidebarContainer elevation={0}>
//       {/* Sidebar Header */}
//       <SidebarHeader>
//         <Stack spacing={2}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <PeopleIcon />
//             <Typography variant="h6" sx={{ fontWeight: 600 }}>
//               Users
//             </Typography>
//             <Chip
//               label={`${filteredUsers.filter((u) => u.isOnline).length} online`}
//               size="small"
//               sx={{
//                 ml: "auto",
//                 bgcolor: "rgba(255,255,255,0.2)",
//                 color: "inherit",
//                 fontSize: "0.75rem",
//               }}
//             />
//           </Box>

//           {/* Search */}
//           <TextField
//             fullWidth
//             size="small"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 backgroundColor: "rgba(255,255,255,0.1)",
//                 borderRadius: 2,
//                 "& fieldset": {
//                   borderColor: "rgba(255,255,255,0.3)",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "rgba(255,255,255,0.5)",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "rgba(255,255,255,0.7)",
//                 },
//               },
//               "& .MuiInputBase-input": {
//                 color: "inherit",
//                 "&::placeholder": {
//                   color: "rgba(255,255,255,0.7)",
//                   opacity: 1,
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Stack>
//       </SidebarHeader>

//       {/* User List */}
//       <UserListContainer>
//         {filteredUsers.length === 0 ? (
//           <Box sx={{ p: 4, textAlign: "center", color: "text.secondary" }}>
//             <PeopleIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
//             <Typography variant="body2">No users found</Typography>
//           </Box>
//         ) : (
//           <List sx={{ p: 1 }}>
//             {filteredUsers.map((user) => (
//               <ListItem key={user.id} disablePadding sx={{ mb: 0.5 }}>
//                 <ListItemButton
//                   onClick={() => handleUserSelect(user)}
//                   selected={selectedUser?.id === user.id}
//                   sx={{
//                     borderRadius: 2,
//                     "&.Mui-selected": {
//                       bgcolor: "primary.50",
//                       "&:hover": {
//                         bgcolor: "primary.100",
//                       },
//                     },
//                   }}
//                 >
//                   <ListItemAvatar>
//                     <Badge
//                       overlap="circular"
//                       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                       badgeContent={
//                         <OnlineIcon
//                           sx={{
//                             fontSize: 12,
//                             color: user.isOnline ? "success.main" : "grey.400",
//                           }}
//                         />
//                       }
//                     >
//                       <Avatar
//                         sx={{
//                           bgcolor: "primary.main",
//                           background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
//                         }}
//                       >
//                         {user.name.charAt(0).toUpperCase()}
//                       </Avatar>
//                     </Badge>
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={
//                       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                         <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
//                           {user.name}
//                         </Typography>
//                         {user.unreadCount > 0 && (
//                           <Chip
//                             label={user.unreadCount}
//                             size="small"
//                             color="error"
//                             sx={{ height: 20, fontSize: "0.75rem" }}
//                           />
//                         )}
//                       </Box>
//                     }
//                     secondary={
//                       <Typography variant="caption" color="text.secondary" noWrap>
//                         {user.lastMessage || "No messages yet"}
//                       </Typography>
//                     }
//                   />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </UserListContainer>
//     </SidebarContainer>
//   )

//   return (
//     <Box sx={{ display: "flex", height: "100vh" }}>
//       {/* Mobile Drawer */}
//       {isMobile && (
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={() => setMobileOpen(false)}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             "& .MuiDrawer-paper": { width: 320 },
//           }}
//         >
//           {sidebarContent}
//         </Drawer>
//       )}

//       {/* Desktop Sidebar */}
//       {!isMobile && <Box sx={{ width: 320, flexShrink: 0 }}>{sidebarContent}</Box>}

//       {/* Main Chat Area */}
//       <MainChatArea>
//         {selectedUser ? (
//           <>
//             {/* Mobile Header */}
//             {isMobile && (
//               <AppBar position="static" elevation={1}>
//                 <Toolbar>
//                   <IconButton edge="start" color="inherit" onClick={handleBackToList} sx={{ mr: 2 }}>
//                     <ArrowBackIcon />
//                   </IconButton>
//                   <Typography variant="h6" sx={{ fontWeight: 500 }}>
//                     Back to users
//                   </Typography>
//                 </Toolbar>
//               </AppBar>
//             )}
//             <Box sx={{ flex: 1, p: 2 }}>
//               <ChatBox user={admin} peer={selectedUser} />
//             </Box>
//           </>
//         ) : (
//           <EmptyState>
//             <ChatIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
//             <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
//               Select a user to start chatting
//             </Typography>
//             <Typography variant="body2" sx={{ maxWidth: 400 }}>
//               Choose a user from the sidebar to view your conversation history and send messages
//             </Typography>
//             {isMobile && (
//               <IconButton onClick={() => setMobileOpen(true)} sx={{ mt: 2, bgcolor: "primary.main", color: "white" }}>
//                 <PeopleIcon />
//               </IconButton>
//             )}
//           </EmptyState>
//         )}
//       </MainChatArea>
//     </Box>
//   )
// }



"use client";
import { useEffect, useState } from "react";
import { skipToken } from '@reduxjs/toolkit/query';

import ChatBox from "@/components/chat";
import { useGetUsersListingQuery } from "@/store/slices/admin";
import { useGetConversationQuery } from "@/store/slices/message";
import { IdCard } from "lucide-react";



export default function AdminChatPanel() {
  const { data: usersData } = useGetUsersListingQuery();
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: conversation } = useGetConversationQuery(
  selectedUser?.id ?? skipToken
);

  
  
  const admin = { id: 1, name: "Admin" };
  
  console.log("consversa",selectedUser)

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Users</h3>
          <h1 className="text-4xl font-bold text-blue-600">Tailwind is working 🎉</h1>
        <ul>
          {usersData?.users.map((u) => (
            <li key={u.id}>
              <button
                onClick={() => setSelectedUser(u)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded"
              >
                {u.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 bg-white">
     
          <ChatBox user={admin} peer={selectedUser} 
          conversation={conversation || []}
          />
      
      </main>
    </div>
  );
}




// export default function AdminChatPanel() {
//      const { data: usersData, error, isLoading } = useGetUsersListingQuery();
// //   const [users, setUsers] = useState(usersData);
//   const [selectedUser, setSelectedUser] = useState(null);
// console.log("users", usersData?.users)
//   const admin = { id: 1, name: "Admin" };

//   return (
//     <div className="admin-panel">
//       <div className="user-list">
//         <h3>Users</h3>
//         {usersData?.users.map((u) => (
//           <button key={u.id} onClick={() => setSelectedUser(u)}>
//             {u.name}
//           </button>
//         ))}
//       </div>

      

//       <div className="chat-window">
//         {selectedUser && (
//           <ChatBox
//             user={admin}         // sender is admin
//             peer={selectedUser}  // receiver is selected user
//           />
//         )}
//       </div>
//     </div>
//   );
// }