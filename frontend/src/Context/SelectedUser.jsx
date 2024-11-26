import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../config";

const SelectedUserContext = createContext();

export const useSelectedUsercontext = () => {
  return useContext(SelectedUserContext);
};

export const SelectedUserContextProvider = ({ children }) => {
  const [searchparams] = useSearchParams();
  const SelectedUserId = searchparams.get("id");
  const [SelectedUser, setSelectedUser] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    try {
      async function SelectedUser() {
        setloading(true);
        const response = await axios.get(
          `${BACKEND_URL}/receiveruser?id=${SelectedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setloading(false);
        setSelectedUser(response.data.receiveruser);
      }
      if (SelectedUserId) {

        SelectedUser();
      }
    } catch (error) {
      console.log("Error in SelectedUser context ", error);
    }
  }, [SelectedUserId]);

  return (
    <SelectedUserContext.Provider
      value={{ SelectedUserId, SelectedUser, loading }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
};
