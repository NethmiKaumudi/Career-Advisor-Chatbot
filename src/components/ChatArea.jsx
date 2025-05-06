import { Box, Paper, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { memo, useEffect } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ReactMarkdown from 'react-markdown';

// Memoize individual message component with improved text rendering
const Message = memo(({ text, sender }) => {
  // Function to process and format message text
  const formatText = (text) => {
    if (typeof text !== 'string') {
      return JSON.stringify(text);
    }
    
    // If text contains line breaks, render with ReactMarkdown
    if (text.includes('\n') || text.includes('**') || text.includes('- ') || text.includes('* ')) {
      return (
        <ReactMarkdown
          components={{
            p: ({children}) => <Typography variant="body1" sx={{ my: 1 }}>{children}</Typography>,
            h1: ({children}) => <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>{children}</Typography>,
            h2: ({children}) => <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>{children}</Typography>,
            h3: ({children}) => <Typography variant="subtitle2" fontWeight="bold" sx={{ mt: 1.5, mb: 0.5 }}>{children}</Typography>,
            ul: ({children}) => <Box component="ul" sx={{ pl: 2, my: 1 }}>{children}</Box>,
            ol: ({children}) => <Box component="ol" sx={{ pl: 2, my: 1 }}>{children}</Box>,
            li: ({children}) => <Box component="li" sx={{ my: 0.5 }}>{children}</Box>,
            strong: ({children}) => <Box component="span" fontWeight="bold">{children}</Box>,
          }}
        >
          {text}
        </ReactMarkdown>
      );
    }
    
    // Simple text with better spacing for readability
    return <Typography variant="body1">{text}</Typography>;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: sender === 'bot' ? 'flex-start' : 'flex-end',
        mb: 2,
        maxWidth: '85%',
        alignSelf: sender === 'bot' ? 'flex-start' : 'flex-end',
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: sender === 'bot' ? '#f5f7fa' : '#3a7bd5',
          color: sender === 'bot' ? '#2A3A51' : 'white',
          width: '100%',
          '& p': {
            margin: '0.5em 0',
            lineHeight: 1.6,
          },
          '& ul, & ol': {
            marginTop: '0.5em',
            marginBottom: '0.5em',
            paddingLeft: '1.5em',
          },
          '& li': {
            marginBottom: '0.3em',
          },
        }}
      >
        {formatText(text)}
      </Paper>
    </Box>
  );
});

// Memoize the entire ChatArea component
const ChatArea = memo(({ messages, messagesEndRef }) => {
  // Add effect to ensure scrolling works properly
  useEffect(() => {
    if (messages.length > 0) {
      // Use requestAnimationFrame for smoother scrolling
      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      };
      
      const timeoutId = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, messagesEndRef]);

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        p: 3,
        bgcolor: 'rgba(245, 247, 250, 0.8)',
        backgroundImage: 'none',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        // Make scrollbars visible and consistent across browsers
        '&::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(58, 123, 213, 0.3)',
          borderRadius: '10px',
          '&:hover': {
            background: 'rgba(58, 123, 213, 0.5)',
          },
        },
        // Add Firefox scrollbar styling
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(58, 123, 213, 0.3) rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1,
      }}>
        {messages.map(message => (
          <Message key={message.id} text={message.text} sender={message.sender} />
        ))}
      </Box>
      <div ref={messagesEndRef} />
    </Box>
  );
});

export default ChatArea;