import { useSelectedUsercontext } from "../Context/SelectedUser";

export function Dashboardnav() {
  const { loading, SelectedUser } = useSelectedUsercontext();

  return (
    <div className="w-full overflow-auto">
      <div className="w-3/4 z-10 fixed top-0 h-16 flex items-center justify-between  bg-[#1d2226] rounded-none bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-80 border-b border-black ">
        <div className="flex justify-between ml-12 items-center">
          {loading ? (
            <div className="loading loading-spinner w-6 h-6"></div>
          ) : (
            <>
              <div className="avatar online placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-lg">
                    <img src={SelectedUser.profilepic} />
                  </span>
                </div>
              </div>
              <p className="ml-4 text-white font-sans font-semibold">
                {SelectedUser.firstname} {SelectedUser.lastname}
              </p>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
