import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Allmessages } from "./Messages";
import { SendMessage } from "./Messagesending";

export function ChatArea() {
  return (
    <>
      <div className="w-full">
        <Allmessages></Allmessages>
      </div>

      <SendMessage></SendMessage>
    </>
  );
}
