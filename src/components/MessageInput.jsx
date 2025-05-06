import { memo } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// Memoize the MessageInput component to prevent unnecessary re-renders
const MessageInput = memo(({ input, setInput, handleSend, isLoading }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        bgcolor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        value={input}
        onChange={setInput}
        onKeyPress={handleKeyPress}
        placeholder="Type your question here..."
        variant="outlined"
        autoComplete="off"
        disabled={isLoading}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: 'white',
          }
        }}
      />
      <IconButton
        color="primary"
        onClick={handleSend}
        disabled={isLoading || !input.trim()}
        sx={{ ml: 1 }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
});

export default MessageInput;