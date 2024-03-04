import { Message } from "./Message";

export function Allmessages() {
  return (
 <div className="h-screen overflow-auto pt-20 pb-16  px-4  bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-none  ">
      <Message></Message>
    </div>
  );
}
