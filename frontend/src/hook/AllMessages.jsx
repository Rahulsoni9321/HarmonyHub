import axios from "axios";
import { useEffect, useState } from "react";
import { useSelectedUsercontext } from "../Context/SelectedUser";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export function useAllMessages() {
  const [loading, setloading] = useState(true);
  const [AllMessages, setAllMessages] = useState([]);
  const { SelectedUserId } = useSelectedUsercontext();
  useEffect(() => {
    async function Conversation() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/send/${SelectedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );


        setAllMessages(response.data.allmessages);
      }
      catch (error) {
        toast.error(error.response.data.message);
        console.error(error);
      }
      setloading(false);
    }
    Conversation();
  }, [SelectedUserId]);

  return { loading, AllMessages, setAllMessages };
}
