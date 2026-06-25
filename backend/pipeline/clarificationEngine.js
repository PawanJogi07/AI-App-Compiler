function clarificationEngine(prompt) {
  const vagueWords = [
    "app",
    "business",
    "system",
    "platform"
  ];

  if (
    prompt.toLowerCase() === "make an app" ||
    prompt.toLowerCase().includes("my business")
  ) {
    return {
      needsClarification: true,
      questions: [
        "What type of business?",
        "Who are the users?",
        "Do you need authentication?"
      ]
    };
  }

  return {
    needsClarification: false,
    questions: []
  };
}

module.exports = clarificationEngine;