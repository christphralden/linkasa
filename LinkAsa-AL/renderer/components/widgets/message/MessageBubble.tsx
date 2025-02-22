import React from "react";
import { Typography, Box } from "@mui/material";
import { format, isToday } from "date-fns";

const getFormattedTimestamp = (timestamp) => {
  if (!timestamp) return "";

  const date = timestamp.toDate();
  if (isToday(date)) {
    return format(date, "p");
  } else {
    return format(date, "Pp");
  }
};

const MessageBubble = ({ message, currentUser, showSender }) => {
  const isCurrentUser = message.sender === currentUser;
  const timestamp = getFormattedTimestamp(message.timestamp);

  return (
    <Box
      my={1}
      display="flex"
      flexDirection="column"
      alignItems={isCurrentUser ? "flex-end" : "flex-start"}
    >
      {showSender && (
        <Typography variant="caption" gutterBottom mt={3}>
          {isCurrentUser ? `Me [${message.role}]` : `${message.sender} [${message.role}]`}
        </Typography>
      )}
      <Box
        borderRadius={3}
        display="flex"
        flexDirection={isCurrentUser ? "row-reverse" : "row"}
        alignItems="end"
        maxWidth="50%"
      >
        <Box
          borderRadius={3}
          padding={1}
          px={2}
          bgcolor={isCurrentUser ? "primary.main" : "white"}
          color={isCurrentUser ? "common.white" : "text.primary"}      
          maxWidth="90%"
          sx={{ wordBreak: "break-word",boxShadow: "0px 0px 20px -5px rgba(0, 0, 0, 0.1)" }}
        >
          <Typography variant="body2">{message.text}</Typography>
        </Box>
        <Typography variant="caption" sx={{fontSize:'10px', whiteSpace:'nowrap'}} mx={1}>
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
