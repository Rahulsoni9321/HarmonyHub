export function SkeletonMessages() {
  return (
    <>
     
  <div className=" flex gap-4 items-center w-full flex-start mb-4">
    <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-opacity-70 bg-gray-800"></div>
      <div className="skeleton h-6 w-72 bg-opacity-60 bg-gray-800"></div>
  </div>
  <div className="flex gap-4 items-center justify-end">
      <div className="skeleton h-6 w-72 bg-opacity-60 bg-gray-800"></div>
    <div className="skeleton w-10 h-10 rounded-full shrink-0 bg-opacity-70 bg-gray-800"></div>
  </div>
  

    </>
  );
}

