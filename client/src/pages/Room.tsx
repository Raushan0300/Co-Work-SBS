import { fetchData } from "@/config";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Room = () => {
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const roomId = search.get("id");

    const [room, setRoom] = useState<any>({});

    const token = localStorage.getItem("token");

    useEffect(()=>{
        const fetchRoomDetails = async()=>{
            const res = await fetchData(`/get-room?id=${roomId}`, "GET", {}, {Authorization: token});
            if(res.status === 200){
                setRoom(res.data);
            }
        };

        fetchRoomDetails();
    },[]);
  return (
    <div className="flex flex-col px-32 py-2 mt-10">
        <div className="flex flex-col justify-center items-center">
        <div className="w-1/2 h-1/2">
            <img src="/workspace.jpeg" alt="Workspace Pic" className="w-full h-full" />
        </div>
        </div>
        <div className="flex flex-col mt-10">
            <h2 className="text-2xl dark:text-blue-400 text-blue-600">{room?.roomName}</h2>
            <p className="text-lg">Room Type: <span className="font-semibold text-red-500">{room?.roomType}</span></p>
            <p className="text-lg">Room Capacity: <span className="font-semibold text-red-500">{room?.roomCapacity}</span></p>
            <p className="text-lg">Room Price: <span className="font-semibold text-red-500">{room?.roomPrice}</span></p>
            <p className="text-lg">Room Amenities: <span className="font-semibold text-red-500">{room?.roomAmentities?.join(", ")}</span></p>
            <p className="text-lg">Room Location: <span className="font-semibold text-red-500">{room?.roomLocation}</span></p>
            <p className="text-lg">Room Availability: <span className="font-semibold text-red-500">{room?.roomAvailability ? "YES" : "NO"}</span></p>
        </div>
    </div>
  )
}

export default Room