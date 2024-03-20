import { Logout } from "./Logout"

export function UserArea({userdetails,loading}) {

  if (loading){
    <div className="w-1/4 h-8">
      Loading...
    </div>
  }
      
    return (  <div className="flex items-center justify-between">

    <div className="flex items-center gap-2 my-2 mt-4 ml-2">
    <div className="w-12 h-12 flex items-center rounded-full bg-blend border border-red-100">
      <div className="px-2 rounded-full ">
        <img
          className="w-9 h-8 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
          onClick={() =>
            document
              .getElementById(`my_modal_${userdetails._id}`)
              .showModal()
          }
          src={userdetails.profilepic}
        />
        <dialog id={`my_modal_${userdetails._id}`} className="modal">
          <div className="modal-box w-1/3  bg- rounded-full bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-0 ">
            <img className="p-4 bg-contain" src={userdetails.profilepic} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
    <div className="text-white ">
      {userdetails.firstname} {userdetails.lastname}{" "}
    </div>
  </div>
        
   <Logout></Logout>
 </div>)
  }

  