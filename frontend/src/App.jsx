// Import the useState Hook from React.
// useState allows our component to store and update data.
import { useState } from "react";

// Import the sendMessage function from our api.js file.
// This function will send the user's messages to our backend.
import { sendMessage } from "./api";

// Define the main React component.
// Everything inside this function controls our chat application.
function App() {
  // Create a state variable called "message".
  // It stores what the user is currently typing in the input box.
  //
  // message = current value
  // setMessage = function used to change message
  //
  // The initial value is an empty string.
  const [message, setMessage] = useState("");

  // Create a state variable called "messages".
  // It stores the entire conversation.
  //
  // Example:
  // [
  //   { role: "user", content: "Hello" },
  //   { role: "assistant", content: "Hi!" }
  // ]
  //
  // The initial value is an empty array.
  const [messages, setMessages] = useState([]);

  // Create a state variable called "loading".
  // It tells us whether the AI is currently generating an answer.
  //
  // false = AI is not loading
  // true = AI is currently loading
  const [loading, setLoading] = useState(false);

  // This function runs when the user submits the chat form.
  //
  // "async" allows us to use "await" inside this function.
  async function handleSubmit(event) {
    // Prevent the browser's normal form submission.
    //
    // Normally, submitting a form refreshes the page.
    // preventDefault() stops that from happening.
    event.preventDefault();

    // Check two things:
    //
    // 1. !message.trim()
    //    Checks whether the message is empty or only spaces.
    //
    // 2. loading
    //    Checks whether an AI request is already running.
    //
    // If either condition is true, stop the function.
    if (!message.trim() || loading) {
      return;
    }

    // Create an object representing the user's message.
    //
    // role tells us who sent the message.
    // content contains the actual message.
    const userMessage = {
      role: "user",
      content: message,
    };

    // Create a new array containing:
    //
    // ...messages
    //     All previous messages
    //
    // userMessage
    //     The new message the user just sent.
    //
    // Example:
    //
    // Old:
    // [
    //   { role: "user", content: "Hello" }
    // ]
    //
    // New:
    // [
    //   { role: "user", content: "Hello" },
    //   { role: "user", content: "How are you?" }
    // ]
    const updatedMessages = [...messages, userMessage];

    // Save the updated conversation into React state.
    setMessages(updatedMessages);

    // Clear the input box after the user sends the message.
    setMessage("");

    // Tell the UI that the AI request has started.
    //
    // This will:
    // - show the loading animation
    // - disable the input
    // - prevent another message from being submitted
    setLoading(true);

    // Start a try block.
    //
    // We put code that might fail inside "try".
    try {
      // Send the conversation to the backend.
      //
      // "await" waits for the backend to respond.
      //
      // The result is stored inside "data".
      const data = await sendMessage(updatedMessages);

      // Create an object representing the AI's response.
      //
      // role = assistant means the message came from the AI.
      //
      // data.answer contains the answer returned by our backend.
      const assistantMessage = {
        role: "assistant",
        content: data.answer,
      };

      // Add the AI's message to the existing conversation.
      //
      // previous = the current messages in React state.
      //
      // ...previous = keep all existing messages.
      //
      // assistantMessage = add the new AI response.
      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      // If something goes wrong, print the error
      // in the browser's developer console.
      console.error(error);

      // Add an error message to the chat.
      //
      // We use the previous messages so we don't lose
      // the existing conversation.
      setMessages((previous) => [
        ...previous,
        {
          // Make the error appear as an assistant message.
          role: "assistant",

          // Message shown to the user.
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      // This runs whether the request succeeded or failed.
      //
      // Turn off the loading state.
      setLoading(false);
    }
  }

  // Everything below "return" is the UI of our React application.
  return (
    // Main container for the entire application.
    <div className="app">
      {/* Background decoration */}
      {/* Decorative circle in the background. */}
      <div className="background-circle circle-one"></div>

      {/* Another decorative circle. */}
      <div className="background-circle circle-two"></div>

      {/* Main chat application container. */}
      <div className="chat-container">
        {/* Header */}
        {/* The top section of the chat application. */}
        <header className="chat-header">
          {/* Brand section containing logo and application name. */}
          <div className="brand">
            {/* AI logo. */}
            <div className="logo">✦</div>

            {/* Application name and online status. */}
            <div>
              {/* Application title. */}
              <h1>AI Assistant</h1>

              {/* Online status section. */}
              <div className="online-status">
                {/* Small circle used as the online indicator. */}
                <span></span>
                {/* Text showing that the AI is online. */}
                Online
              </div>
            </div>
          </div>

          {/* Clear conversation button. */}
          <button
            className="clear-button"
            // When clicked, replace the messages array
            // with an empty array.
            //
            // This removes all chat messages.
            onClick={() => setMessages([])}
          >
            Clear
          </button>
        </header>

        {/* Chat messages */}
        {/* Main area where messages are displayed. */}
        <main className="chat-body">
          {/* 
            Show the welcome screen only when there are
            zero messages.
          */}
          {messages.length === 0 && (
            <div className="welcome">
              {/* Welcome icon. */}
              <div className="welcome-icon">✨</div>

              {/* Welcome heading. */}
              <h2>How can I help you?</h2>

              {/* Welcome description. */}
              <p>
                Ask me anything. I'll use our conversation to give you better
                answers.
              </p>
            </div>
          )}

          {/* 
            Loop through every message in the messages array.

            map() creates HTML for each message.

            Example:

            messages = [
              { role: "user", content: "Hello" },
              { role: "assistant", content: "Hi!" }
            ]

            map() creates two message elements.
          */}
          {messages.map((item, index) => (
            // Create one row for each message.
            <div
              // React needs a unique key for each element
              // when using map().
              key={index}
              // Dynamically choose the CSS class.

              // If the message belongs to the user:
              // "message-row user-row"

              // Otherwise:
              // "message-row assistant-row"
              className={`message-row ${
                item.role === "user" ? "user-row" : "assistant-row"
              }`}
            >
              {/* 
                Show the AI avatar only for assistant messages.
              */}
              {item.role === "assistant" && (
                <div className="avatar ai-avatar">✦</div>
              )}

              {/* Message bubble. */}
              <div
                // Choose different CSS classes
                // depending on who sent the message.
                className={`message-bubble ${
                  item.role === "user" ? "user-bubble" : "assistant-bubble"
                }`}
              >
                {/* Display the actual message text. */}
                {item.content}
              </div>

              {/* 
                Show the user avatar only for user messages.
              */}
              {item.role === "user" && (
                <div className="avatar user-avatar">U</div>
              )}
            </div>
          ))}

          {/* Loading */}
          {/* 
            Only show this section when loading === true.
          */}
          {loading && (
            <div className="message-row assistant-row">
              {/* AI avatar while the AI is thinking. */}
              <div className="avatar ai-avatar">✦</div>

              {/* 
                The typing/loading bubble.
                CSS can animate these dots.
              */}
              <div className="assistant-bubble typing">
                {/* First typing dot. */}
                <span></span>

                {/* Second typing dot. */}
                <span></span>

                {/* Third typing dot. */}
                <span></span>
              </div>
            </div>
          )}
        </main>

        {/* Input */}
        {/* Form where the user types and sends messages. */}
        <form
          // CSS class for styling the input area.
          className="input-area"
          // When the form is submitted,
          // call handleSubmit().
          onSubmit={handleSubmit}
        >
          {/* Wrapper containing the input and send button. */}
          <div className="input-wrapper">
            {/* Text input. */}
            <input
              // The input's value is controlled by React.
              //
              // Whatever is inside "message" appears here.
              value={message}
              // Runs whenever the user types.
              onChange={(event) =>
                // Update the message state
                // with whatever the user typed.
                setMessage(event.target.value)
              }
              // Text shown when the input is empty.
              placeholder="Message AI Assistant..."
              // Disable the input while AI is responding.
              disabled={loading}
            />

            {/* Send button. */}
            <button
              // Tell the browser this is the form's submit button.
              type="submit"
              // Disable the button when:
              //
              // 1. AI is loading
              // OR
              // 2. The input is empty
              disabled={loading || !message.trim()}
              // CSS class used to style the button.
              className="send-button"
            >
              {/* Send icon. */}➤
            </button>
          </div>

          {/* Warning/disclaimer shown below the input. */}
          <p className="disclaimer">
            AI can make mistakes. Check important information.
          </p>
        </form>
      </div>
    </div>
  );
}

// Export the App component.
//
// This allows another file, usually main.jsx,
// to import and render <App />.
export default App;
