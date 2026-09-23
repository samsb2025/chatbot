// Export the function so other JavaScript files can import and use it.
//
// "buildContext" is the name of the function.
// "messages" is the data that we give to the function.
export function buildContext(messages) {
  // Return an object.
  // The object contains the conversation history.
  return {
    // Create a property called "conversationHistory".
    //
    // "messages" is the value we received as the function parameter.
    //
    // Example:
    // messages = [
    //   { role: "user", content: "Hello" },
    //   { role: "assistant", content: "Hi!" }
    // ]
    //
    // Then conversationHistory will contain those messages.
    conversationHistory: messages,
  };
}
