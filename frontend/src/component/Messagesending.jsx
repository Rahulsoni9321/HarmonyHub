import { useRecoilState } from "recoil";
import { TbSend } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Loadingsendatom, Sendermessageatom } from "../atoms/SendMessageatom";
import { Mainmessageatom } from "../atoms/Conversationatom";


export function SendMessage() {
    const [messages, setMessages] = useRecoilState(Sendermessageatom);
    const [mainmessage,setmainmessage]=useRecoilState(Mainmessageatom)
    const [loading, setloading] = useRecoilState(Loadingsendatom);

    const[searchparams]=useSearchParams();
    const userid=searchparams.get('id')
    return (
        <>
        
        <div className="fixed bottom-0 w-full flex h-12 items-center outline-none">
          {" "}
           <label className="input w-3/4 input-bordered rounded-none outline-none border-t border-black flex items-center gap-2">
          <input
            type="text"
            className="grow outline-none text-gray-200 "
            placeholder="Start new chat..."
            value={messages}
            onChange={(e) => {
              setMessages(e.target.value);
            }}
          />
          {loading ? <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-10 h-6 opacity-70 cursor-pointer "
            onClick={async () => {
              setloading(false)
              try 
              {  const res= await axios.post(`http://localhost:3000/api/v1/send/${userid}`,
                  {
                  
                   messages:messages
   
                  },
                  {
                   headers:{
                     Authorization:`Bearer ${localStorage.getItem('token')}`
                   
                  }
             }
                 )
                 setmainmessage((messages)=>[...mainmessage,messages])
                 setloading(true);
                 setMessages("")
                 
               }
               catch(error){
                 console.error(error);
               }
               }}
          >
            <TbSend  />
          </svg>:<div className="loading loading-spinner w-6 h-6"></div>}
        </label>
        </div>
        </>
    )
}