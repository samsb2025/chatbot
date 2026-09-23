// Import StrictMode from React.
// StrictMode is a development tool that helps us find
// potential problems in our React application.
import { StrictMode } from "react";

// Import createRoot from React DOM.
// createRoot is used to create the connection between
// our React application and the HTML element in index.html.
import { createRoot } from "react-dom/client";

// Import the CSS file.
// This makes the styles written in index.css available
// throughout our React application.
import "./index.css";

// Import the App component.
// App.jsx contains the main UI/component of our application.
import App from "./App.jsx";

// Find the HTML element with id="root".
// document.getElementById('root') searches the HTML page
// and finds something like:
// <div id="root"></div>
//
// createRoot(...) tells React:
// "This is the HTML element where my React application will live."
//
// .render(...) tells React:
// "Display this React component inside that element."
createRoot(document.getElementById("root")).render(
  // StrictMode wraps our App component.
  // It helps detect potential problems during development.
  <StrictMode>
   
    App.jsx.
    <App />
    // Close StrictMode.
  </StrictMode>,

  // End render().
);
