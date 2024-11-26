import axios from "axios";
import { BACKEND_URL } from "../config";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserDetailsContext = () => {
    return useContext(UserContext)
}

export const UserContextProvider = ({ children }) => {
    const [userdetails, setuserdetails] = useState({});
    const [userloading, setloading] = useState(true);

    useEffect(() => {

        async function Userdetails() {
            try {
                
                fetch(
                    `${BACKEND_URL}/userprofile`,
                    {
                        method: "GET",

                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        },
                    }
                ).then(async function (res) {
                    const json = await res.json();
                    setuserdetails(json.user)
                   
                })
            }
            catch (error) {
                console.error(error);
            }
            setloading(false);
        }

        Userdetails();




    }, [])

    return (
        <UserContext.Provider value={{ userdetails, userloading }}>
            {children}
        </UserContext.Provider>
    )

}