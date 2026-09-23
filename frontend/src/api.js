import axios from "axios";

export async function sendMessage(messages) {
  const response = await axios.post(
    "http://localhost:5000/api/chat",

    {
      messages,
    },
  );

  return response.data;
}
