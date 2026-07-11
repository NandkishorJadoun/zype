import { API_URL } from "../config";

export const deleteChat = async ({ token, chatId }: { token: string; chatId: string }) => {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
    method: 'DELETE'
  }

  const res = await fetch(`${API_URL}/chats/${chatId}`, options)
  if (!res.ok) {
    throw new Error("Failed to delete chat")
  }
}
