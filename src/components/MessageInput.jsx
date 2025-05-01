function MessageInput({ input, setInput, handleSend }) {
  return (
    <div className="p-4 bg-white/80 border-t rounded-b-lg">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your question, fam! 😊"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-pink-500 hover:to-purple-500"
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
}

export default MessageInput;