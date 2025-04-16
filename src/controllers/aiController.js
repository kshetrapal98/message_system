const responses = [
    "Hello! How can I assist you?",
    "That's an interesting question.",
    "I'm here to help!",
  ];
  
  exports.generateAIResponse = (userMessage) => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };