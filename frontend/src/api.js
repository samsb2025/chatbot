import axios from "axios";

export async function sendMessage(messages) {
  const response = await axios.post(
    "https://simple-chatbot-backend-r0vj.onrender.com/api/chat",
    {
      messages,
    },
  );

  return response.data;
}
