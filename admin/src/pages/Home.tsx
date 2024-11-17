import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/config";

const Home = () => {
  const [rooms, setRooms] = useState<any>([]);

  const [roomName, setRoomName] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");
  const [roomCapacity, setRoomCapacity] = useState<number>();
  const [roomPrice, setRoomPrice] = useState<number>();
  const [roomAmentities, setRoomAmentities] = useState<string[]>([]);
  const [roomAvailability, setRoomAvailability] = useState<boolean>(false);
  const [roomLocation, setRoomLocation] = useState<string>("");

  const token = localStorage.getItem("token");

  const handleAddRoom = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchData("/admin/add-room", "POST", {roomName, roomAmentities, roomAvailability, roomCapacity, roomLocation, roomType, roomPrice}, {Authorization: token});
    if(res.status === 200){
      alert("Room Added Successfully");
      window.location.reload();
    }
    // window.location.reload();
  };

  useEffect(()=>{
    const getRooms = async()=>{
      const res = await fetchData("/admin/get-rooms", "GET", {}, {Authorization: token});
      if(res.status === 200){
        setRooms(res.data);
        console.log(res.data);
      }
    };
    getRooms();
  },[])
  return (
    <div>
        <Header />
        <div className="flex flex-col gap-3 px-4 py-2 mt-10">
          <div className="flex justify-between items-center">
          <h2 className="text-2xl">Your Rooms</h2>
          <Dialog>
  <DialogTrigger><Button>Add New Room</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Room</DialogTitle>
      <DialogDescription>
        <form className="flex flex-col gap-2 mt-4 dark:text-white text-gray-900" onSubmit={handleAddRoom}>
          <Input placeholder="Enter Room Name" value={roomName} onChange={(e)=>{setRoomName(e.target.value)}} />
          <Input placeholder="Enter Room Type" value={roomType} onChange={(e)=>{setRoomType(e.target.value)}} />
          <Input placeholder="Enter Room Capacity" type="number" value={roomCapacity} onChange={(e)=>{setRoomCapacity(parseInt(e.target.value))}} />
          <Input placeholder="Enter Room Price" type="number" value={roomPrice} onChange={(e)=>{setRoomPrice(parseInt(e.target.value))}} />
          <Input placeholder="Enter Room Amenities" value={roomAmentities.join(",")} onChange={(e)=>{setRoomAmentities(e.target.value.split(", "))}} />
          <Input placeholder="Enter Room Location" value={roomLocation} onChange={(e)=>{setRoomLocation(e.target.value)}} />
          <div className="flex justify-between items-center">
            <h4>Availaibilty</h4>
          <Input className="w-6" placeholder="Enter Room Availability" type="checkbox" checked={roomAvailability} onChange={(e)=>{setRoomAvailability(e.target.checked)}} />
          </div>
          <Button type="submit">Add Room</Button>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

          </div>
          {rooms.length > 0?<Carousel className="mx-10">
          <CarouselContent className="flex justify-center items-stretch">
            {rooms.map((room: any) => (
              <CarouselItem key={room.id} className="p-4 md:basis-1/4 sm:basis-1/2">
                <div className="bg-gray-300 dark:bg-white p-4 rounded-lg shadow-md cursor-pointer h-full">
                  <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
                    <img src="/workspace.jpeg" alt="WorkSpace Pic" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between mb-1">
                  <h3 className="text0lg font-semibold text-black">{room.roomName}</h3>
                  <h3 className="text-lg font-semibold text-black">$ {room.roomPrice}/hr</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Space Type: {room.roomType}</p>
                    <p className="text-sm text-gray-500 mb-1">Amenities: {room.roomAmentities.join(", ")}</p>
                    <p className="text-sm text-gray-500">Capacity: {room.roomCapacity}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>:<p className="text-center">You not added any Rooms Yet</p>}
        </div>
    </div>
  )
}

export default Home