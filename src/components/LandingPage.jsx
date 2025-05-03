import { Box, Typography, Button, Paper, Container } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

function LandingPage({ onStartChat }) {
  return (
    <Container maxWidth="md" sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <Paper 
        elevation={6} 
        sx={{ 
          p: 6, 
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
          }
        }}
      >
        <SchoolIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
        
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          color="primary"
          sx={{ fontWeight: 'bold' }}
        >
          Education Advisor
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          paragraph 
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Your personalized academic assistant ready to help with your future Target Job, Degrees, Courses and more.
        </Typography>
        
        <Button 
          variant="contained" 
          size="large" 
          onClick={onStartChat}
          color="primary"
          sx={{ 
            py: 1.5, 
            px: 4, 
            borderRadius: 2,
            fontSize: '1rem',
            boxShadow: '0 4px 20px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              boxShadow: '0 6px 25px rgba(25, 118, 210, 0.5)',
            }
          }}
        >
          Start a Conversation
        </Button>
      </Paper>
    </Container>
  );
}

export default LandingPage;