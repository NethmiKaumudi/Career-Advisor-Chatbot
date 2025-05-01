function ChatArea({ messages, messagesEndRef }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-background">
      {messages.map(message => (
        <div
          key={message.id}
          className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
        >
          <div
            className={`max-w-[80%] p-3 rounded-lg font-[Comic Sans MS, cursive] ${
              message.sender === 'user' ? 'bg-secondary text-white' : 'bg-white shadow'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatArea;