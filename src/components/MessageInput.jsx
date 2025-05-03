import { Box, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

function MessageInput({ input, setInput, handleSend, isLoading }) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'white',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        boxShadow: 'none',
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 1,
          position: 'relative',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          placeholder="Type your question here..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && !isLoading && handleSend()}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: '#f5f7fa',
              boxShadow: 'none',
              transition: 'all 0.2s',
              '&:hover': {
                background: '#edf0f5',
              },
              '&.Mui-focused': {
                background: '#ffffff',
                boxShadow: '0 0 0 2px rgba(58, 123, 213, 0.2)',
              }
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  variant="contained"
                  color="primary"
                  sx={{ 
                    borderRadius: 2,
                    minWidth: '90px',
                    height: '40px',
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 2px 6px rgba(58, 123, 213, 0.3)',
                    },
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send'}
                  <SendIcon sx={{ ml: 1, fontSize: '1.2rem' }} />
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}

export default MessageInput;