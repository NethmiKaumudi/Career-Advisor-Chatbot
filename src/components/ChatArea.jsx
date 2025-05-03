import { Box, Paper, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ReactMarkdown from 'react-markdown';

function ChatArea({ messages, messagesEndRef }) {
  // Helper function to detect if the text is formatted with markdown-like syntax
  const isFormattedText = (text) => {
    if (typeof text !== 'string') return false;
    
    // Check for common markdown patterns like headers, bullet points, or sections with emojis
    return (
      text.includes('**') || 
      text.includes('- ') || 
      /[\*\-#]/.test(text) || 
      /\n.*:/.test(text) ||
      /[🛠️📚🎓🗺️]/.test(text)
    );
  };
  
  // Format nicely structured text
  const renderFormattedText = (text) => {
    if (!text || typeof text !== 'string') return "Error displaying message";
    
    return (
      <Box sx={{ width: '100%' }}>
        <ReactMarkdown
          components={{
            h1: (props) => <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom {...props} />,
            h2: (props) => <Typography variant="h6" fontWeight="bold" color="primary.main" gutterBottom {...props} />,
            h3: (props) => <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom {...props} />,
            p: (props) => <Typography variant="body1" paragraph {...props} />,
            strong: (props) => <Box component="span" fontWeight="bold" color="secondary.main" {...props} />,
            ul: (props) => <List dense {...props} />,
            li: (props) => (
              <ListItem dense>
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <FiberManualRecordIcon fontSize="small" color="primary" sx={{ fontSize: 10 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={props.children} 
                  sx={{ m: 0 }}
                />
              </ListItem>
            ),
          }}
        >
          {text}
        </ReactMarkdown>
      </Box>
    );
  };

  // Helper function to safely render message text
  const renderMessageText = (text) => {
    if (typeof text === 'string') {
      if (isFormattedText(text)) {
        return renderFormattedText(text);
      }
      return text;
    } else if (typeof text === 'object') {
      // If it's an object, convert it to a string
      return JSON.stringify(text);
    }
    // Default fallback
    return "Error displaying message";
  };

  return (
    <Box 
      sx={{ 
        flexGrow: 1, 
        overflowY: 'auto',
        p: 3,
        bgcolor: 'rgba(245, 247, 250, 0.8)',
        backgroundImage: 'none',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        '&::-webkit-scrollbar': {
          width: '8px',
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
      }}
    >
      {messages.map(message => (
        <Box
          key={message.id}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 2,
            maxWidth: '100%',
            animation: message.sender === 'bot' ? 'fadeInLeft 0.3s ease-out' : 'fadeInRight 0.3s ease-out',
            '@keyframes fadeInLeft': {
              from: { opacity: 0, transform: 'translateX(-10px)' },
              to: { opacity: 1, transform: 'translateX(0)' }
            },
            '@keyframes fadeInRight': {
              from: { opacity: 0, transform: 'translateX(10px)' },
              to: { opacity: 1, transform: 'translateX(0)' }
            }
          }}
        >
          <Avatar 
            sx={{ 
              bgcolor: message.sender === 'bot' ? 
                '#3a7bd5' : 
                '#5561B2',
              width: 38,
              height: 38,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
            }}
          >
            {message.sender === 'bot' ? <SchoolIcon /> : <PersonIcon />}
          </Avatar>
          
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: message.sender === 'bot' ? '2px 16px 16px 16px' : '16px 2px 16px 16px',
              maxWidth: 'calc(100% - 60px)',
              width: message.sender === 'bot' && isFormattedText(message.text) ? 'calc(100% - 60px)' : 'auto',
              bgcolor: message.sender === 'bot' ? 
                'white' : 
                '#3a7bd5',
              color: message.sender === 'bot' ? 'text.primary' : 'white',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-1px)',
                boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
              },
              position: 'relative',
              '&::before': message.sender === 'bot' ? {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-8px',
                width: '16px',
                height: '16px',
                backgroundColor: 'white',
                borderRadius: '0 0 16px 0',
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
              } : {
                content: '""',
                position: 'absolute',
                top: 0,
                right: '-8px',
                width: '16px',
                height: '16px',
                backgroundColor: '#3a7bd5',
                borderRadius: '0 0 0 16px',
                clipPath: 'polygon(0 0, 0 100%, 100% 0)',
              }
            }}
          >
            <Typography 
              variant="body1" 
              component="div" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                color: message.sender === 'bot' ? 'text.primary' : 'white',
                fontWeight: message.sender !== 'bot' ? 500 : 400,
                // Increase contrast for user messages
                textShadow: message.sender !== 'bot' ? '0 1px 1px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {renderMessageText(message.text)}
            </Typography>
          </Paper>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
}

export default ChatArea;