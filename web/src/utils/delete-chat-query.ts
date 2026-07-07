export const deleteChat = async ({ token, chatId }: { token: string; chatId: string }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const options = {
    headers: { Authorization: `Bearer ${token}` },
    method: 'DELETE'
  }

  const res = await fetch(`${BASE_URL}/chats/${chatId}`, options)
  if (!res.ok) {
    throw new Error("Failed to delete chat")
  }
}
