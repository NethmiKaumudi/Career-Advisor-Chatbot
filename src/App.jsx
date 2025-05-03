import { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  CircularProgress
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LandingPage from './components/LandingPage';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import BGImage1 from './assets/10683103.jpg';

// Create a more muted, professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3a7bd5',
      light: '#6291d9',
      dark: '#2c5fa8',
    },
    secondary: {
      main: '#5561B2',
      light: '#7986cb',
      dark: '#303f9f',
    },
    background: {
      default: '#f5f5f5',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#2A3A51',
      secondary: '#546e7a',
    },
    error: {
      main: '#e57373',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  },
});

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedTopics = [
    { id: 1, text: "Software Engineer", message: "How to be a Software Engineer..?" },
    { id: 2, text: "Data Scientist", message: "Best Degrees for Data Scientist.." },
    { id: 3, text: "Can I be a Teacher", message: "Skills to be a Teacher" },
  ];

  const handleStartChat = () => {
    setIsChatOpen(true);
    setMessages([
      { id: 1, text: "Hello! I'm your Education Advisor, here to help with your academic questions and concerns. What would you like assistance with today?", sender: 'bot' }
    ]);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setMessages([]);
    setInput('');
  };

  // Function to send message to API
  const sendMessageToAPI = async (message) => {
    try {
      setIsLoading(true);
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: message }), // Changed 'message' to 'query' to match backend
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); //Improved error handling
      }
      
      const data = await response.json();
      // Extract text response from the API response object
      return data.response || "Sorry, I couldn't process your request.";
    } catch (error) {
      console.error('Error sending message to API:', error);
      return "I'm having trouble connecting to my knowledge base. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicClick = async (topicMessage) => {
    const newMessage = { id: messages.length + 1, text: topicMessage, sender: 'user' };
    setMessages([...messages, newMessage]);

    const botResponse = await sendMessageToAPI(topicMessage);
    
    // Make sure we're handling the response properly
    const responseText = typeof botResponse === 'object' ? 
      (botResponse.response || JSON.stringify(botResponse)) : 
      botResponse;
    
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      text: responseText,
      sender: 'bot'
    }]);
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input;
      const newMessage = { id: messages.length + 1, text: userMessage, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      const botResponse = await sendMessageToAPI(userMessage);
      
      // Make sure we're handling the response properly
      const responseText = typeof botResponse === 'object' ? 
        (botResponse.response || JSON.stringify(botResponse)) : 
        botResponse;
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: responseText,
        sender: 'bot'
      }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {!isChatOpen ? (
          <LandingPage onStartChat={handleStartChat} />
        ) : (
          <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 4 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '85vh',
                borderRadius: 3,
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                background: 'white',
                border: '1px solid rgba(230, 235, 240, 0.8)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              }}
            >
              <AppBar position="static" elevation={0} sx={{ 
                background: '#3a7bd5', 
                borderBottom: 'none',
              }}>
                <Toolbar>
                  <SchoolIcon sx={{ mr: 2, color: 'white' }} />
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      flexGrow: 1, 
                      color: 'white',
                      textShadow: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Path for your Future Job
                  </Typography>
                  <Box 
                    sx={{ 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: 'rgba(255,255,255,0.15)',
                      px: 2,
                      py: 0.75,
                      borderRadius: 2,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.25)',
                      }
                    }} 
                    onClick={handleCloseChat}
                  >
                    <Typography variant="button" color="white">Close Chat</Typography>
                  </Box>
                </Toolbar>
              </AppBar>
              
              <Box sx={{ 
                p: 1.5, 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1.5, 
                bgcolor: '#f5f7fa',
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                {suggestedTopics.map(topic => (
                  <Chip
                    key={topic.id}
                    label={topic.text}
                    onClick={() => handleTopicClick(topic.message)}
                    color="primary"
                    variant="outlined"
                    clickable
                    disabled={isLoading}
                    sx={{
                      px: 1,
                      background: 'white',
                      border: '1px solid rgba(58, 123, 213, 0.3)',
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>
              
              <ChatArea messages={messages} messagesEndRef={messagesEndRef} />
              
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                  <CircularProgress size={24} sx={{ color: theme.palette.primary.main }} />
                </Box>
              )}
              
              <MessageInput 
                input={input} 
                setInput={setInput} 
                handleSend={handleSend} 
                isLoading={isLoading}
              />
            </Paper>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
