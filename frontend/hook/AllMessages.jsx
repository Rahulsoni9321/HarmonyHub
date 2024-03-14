import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUsercontext } from "../src/Context/SelectedUser";

export function useAllMessages() {
  const [loading, setloading] = useState(false);
  const [AllMessages, setAllMessages] = useState([]);
  const {SelectedUserId}=useSelectedUsercontext();
  useEffect(() => {  
    async function Conversation() {
      setloading(true);
      const response = await axios.get(
        `http://localhost:3000/api/v1/send/${SelectedUserId}`,
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
