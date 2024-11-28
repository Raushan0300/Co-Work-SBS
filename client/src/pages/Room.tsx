import { Button } from "@/components/ui/button";
import { fetchData } from "@/config";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";  
import { DateTimePicker } from "@/components/date-time-picker";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Room = () => {
  const navigate = useNavigate();
    const location = useLocation();
    const search = new URLSearchParams(location.search);
    const roomId = search.get("id");

    const [room, setRoom] = useState<any>({});
    const [checkInDate, setCheckInDate] = useState<Date>();
    const [checkOutDate, setCheckOutDate] = useState<Date>();
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const token = localStorage.getItem("token");

    useEffect(()=>{
        const fetchRoomDetails = async()=>{
            const res = await fetchData(`/get-room?id=${roomId}`, "GET", {}, {Authorization: token});
            if(res.status === 200){
                setRoom(res.data);
            }
        };

        fetchRoomDetails();
    },[token, roomId]);

    const dateDifference = (date1: string, date2: string) => {
      const diffInMilliseconds = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());

      const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

      const price = room?.roomPrice * diffInHours;
      setTotalPrice(Number(price.toFixed(2)));
    };

    const handleRoomBook = async()=>{
      const res = await fetchData('/book', "POST", {bookedRoom: roomId, checkInDate, checkOutDate, totalAmount: totalPrice}, {Authorization: token});
      if(res.status === 200){
        alert(res.data.msg);
        navigate("/history");
      }
    }

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
        <Dialog>
  <DialogTrigger><Button className="w-full mt-5">Book Room</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
       <div className="flex justify-between gap-2 items-center">
       <div className="flex flex-col gap-3 mt-5">
          <p className="dark:text-white text-gray-800">Check In</p>
        <DateTimePicker date={checkInDate} setDate={setCheckInDate} dateText="Check In Date" />
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <p className="dark:text-white text-gray-800">Check Out</p>
        <DateTimePicker date={checkOutDate} setDate={setCheckOutDate} dateText="Check Out Date" />
        </div>
       </div>
       <AlertDialog>
  <AlertDialogTrigger className="w-full"><Button className="w-full mt-5" onClick={()=>{dateDifference(checkInDate?.toISOString() ?? "", checkOutDate?.toISOString() ?? "");}}>Book Room</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription className="dark:text-white text-gray-800">
        You are about to book the room. Please confirm your check-in and check-out dates. <br />
        <div className="mt-5">
        <strong>Check In:</strong> {checkInDate?.toLocaleString()} <br />
        <strong>Check Out:</strong> {checkOutDate?.toLocaleString()} <br />
        <strong>Total Price:</strong> $ {totalPrice} <br />
        </div>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleRoomBook}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default Room;