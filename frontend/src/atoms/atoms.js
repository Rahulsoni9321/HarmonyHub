import axios from "axios";
import { atom, atomFamily, selector, selectorFamily } from "recoil";


export const Chatclickedatom=atom ({
  key:"Chatclickedatom",
  default:false
})

export const Messageatom = atom({
  key: "Messageatom",
  default: "",
});





