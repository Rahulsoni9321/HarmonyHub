
export function Inputbox({placeholder,setvalue,type}) {
    return <div className="flex justify-center w-full">
    <input className="w-11/12 p-1 pl-3 text-xs text-gray-100  bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  outline-none shadow-3xl"
    type={type}
    onChange={(e)=>{
        setvalue(e.target.value)
    }} 
    placeholder={placeholder}></input>
    </div>
}