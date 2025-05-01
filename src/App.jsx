import { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import BGImage1 from './assets/10683103.jpg'; // Static image

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedTopics = [
    { id: 1, text: "Career Change", message: "I wanna switch careers, help me out, yo!" },
    { id: 2, text: "Resume Tips", message: "Make my resume POP, pretty please! 🎉" },
    { id: 3, text: "Interview Prep", message: "I got an interview—help me SLAY it! 💪" },
  ];

  const handleStartChat = () => {
    setIsChatOpen(true);
    setMessages([
      { id: 1, text: "Yo, superstar! 🌟 I’m your Career Advisor, here to make your career sparkle! ✨ What’s the vibe today? 😎", sender: 'bot' }
    ]);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setMessages([]);
    setInput('');
  };

  const handleTopicClick = (topicMessage) => {
    const newMessage = { id: messages.length + 1, text: topicMessage, sender: 'user' };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `Ooh, let’s dive into ${topicMessage.split(' ').slice(-2).join(' ').toLowerCase()}! 🎈 Spill the tea—what’s your next move, fam? 🍵`,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Yasss, I’m loving your question! 💖 Tell me more about your career dreams, bestie! 🌈",
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BGImage1})`,
        backgroundSize: 'cover', // Use cover to fit the screen
        backgroundPosition: 'center',
      }}
    >
      {!isChatOpen ? (
        <LandingPage onStartChat={handleStartChat} />
      ) : (
        <div className="w-[400px] h-[500px] bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex flex-col animate-bounce-in">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h1 className="text-xl font-bold">Career Advisor Chatbot 😜</h1>
            <button
              onClick={handleCloseChat}
              className="text-white hover:text-gray-200"
            >
              Close Chat
            </button>
          </div>
          <div className="p-2 bg-gray-100 flex flex-wrap gap-2">
            {suggestedTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => handleTopicClick(topic.message)}
                className="bg-pink-400 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-500 transition-transform transform hover:scale-105"
              >
                {topic.text}
              </button>
            ))}
          </div>
          <ChatArea messages={messages} messagesEndRef={messagesEndRef} />
          <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
        </div>
      )}
    </div>
  );
}

export default App;