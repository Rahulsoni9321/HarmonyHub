import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUsercontext } from "../Context/SelectedUser";
import { BACKEND_URL } from "../config";

export function useAllMessages() {
  const [loading, setloading] = useState(false);
  const [AllMessages, setAllMessages] = useState([]);
  const {SelectedUserId}=useSelectedUsercontext();
  useEffect(() => {  
    async function Conversation() {
      setloading(true);
      const response = await axios.get(
        `${BACKEND_URL}/send/${SelectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setloading(false);

      setAllMessages(response.data.allmessages);
    }
    Conversation();
  }, [SelectedUserId]);

  return { loading, AllMessages,setAllMessages };
}
