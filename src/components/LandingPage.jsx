function LandingPage({ onStartChat }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {/* Semi-transparent purple middle box */}
      <div className="bg-purple-200/80 backdrop-blur-sm p-8 rounded-xl shadow-lg flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4 animate-pulse drop-shadow-2xl">
          Welcome to Career Advisor! 🚀
        </h1>
        <p className="text-lg text-gray-800 mb-6 drop-shadow-xl">
          Your super cool guide to career awesomeness—let’s get started! 🎉
        </p>
        <button
          onClick={onStartChat}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-110 animate-bounce"
        >
          Get Career Advice Now! ✨
        </button>
      </div>
    </div>
  );
}

export default LandingPage;