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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchData } from "@/config";
import InputRoom from "@/components/input-room";

const Home = () => {
  interface Room {
    _id: string;
    roomName: string;
    roomType: string;
    roomCapacity: number;
    roomPrice: number;
    roomAmentities: string[];
    roomAvailability: boolean;
    roomLocation: string;
  }

  const [rooms, setRooms] = useState<Room[]>([]);

  const [roomName, setRoomName] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");
  const [roomCapacity, setRoomCapacity] = useState<number>();
  const [roomPrice, setRoomPrice] = useState<number>();
  const [roomAmentities, setRoomAmentities] = useState<string[]>([]);
  const [roomAvailability, setRoomAvailability] = useState<boolean>(false);
  const [roomLocation, setRoomLocation] = useState<string>("");

  const token = localStorage.getItem("token");

  const handleAddRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetchData(
      "/admin/add-room",
      "POST",
      {
        roomName,
        roomAmentities,
        roomAvailability,
        roomCapacity,
        roomLocation,
        roomType,
        roomPrice,
      },
      { Authorization: token }
    );
    if (res.status === 200) {
      alert("Room Added Successfully");
      window.location.reload();
    }
    // window.location.reload();
  };

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetchData(
        "/admin/get-rooms",
        "GET",
        {},
        { Authorization: token }
      );
      if (res.status === 200) {
        setRooms(res.data);
        console.log(res.data);
      }
    };
    getRooms();
  }, [token]);

  const handleDeleteRoom = async(id: string) => {
    const res = await fetchData(
      `/admin/delete-room/?id=${id}`,
      "POST",
      {},
      { Authorization: token }
    );
    if(res.status === 200){
      alert(res.data.msg);
      window.location.reload();
    } else{
      alert(res.data.err);
    }
  };

  const handleUpdateRoom = async(id: string) => {
    const res = await fetchData(
      `/admin/update-room/?id=${id}`,
      "POST",
      {
        roomName,
        roomAmentities,
        roomAvailability,
        roomCapacity,
        roomLocation,
        roomType,
        roomPrice,
      },
      { Authorization: token }
    );
    if(res.status === 200){
      alert(res.data.msg);
      window.location.reload();
    } else{
      alert(res.data.err);
    }
  };

  const showCrousel = (room: Room) => {
    const setRooms = (room:Room) => {
      setRoomName(room.roomName);
      setRoomAmentities(room.roomAmentities);
      setRoomAvailability(room.roomAvailability);
      setRoomCapacity(room.roomCapacity);
      setRoomLocation(room.roomLocation);
      setRoomPrice(room.roomPrice);
      setRoomType(room.roomType);
    }
    return(
      <Dialog>
            <DialogTrigger asChild>
            <CarouselItem
                  key={room._id}
                  className="p-4 md:basis-1/4 sm:basis-1/2" onClick={()=>{setRooms(room)}}>
                  <div className="bg-gray-300 dark:bg-white p-4 rounded-lg shadow-md cursor-pointer h-full">
                    <div className="w-full h-40 overflow-hidden rounded-lg mb-4">
                      <img
                        src="/workspace.jpeg"
                        alt="WorkSpace Pic"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between mb-1">
                      <h3 className="text0lg font-semibold text-black">
                        {room.roomName}
                      </h3>
                      <h3 className="text-lg font-semibold text-black">
                        $ {room.roomPrice}/hr
                      </h3>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Space Type: {room.roomType}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        Amenities: {room.roomAmentities.join(", ")}
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacity: {room.roomCapacity}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Room</DialogTitle>
                <InputRoom
                  roomName={roomName}
                  roomAmentities={roomAmentities}
                  roomAvailability={roomAvailability}
                  roomCapacity={roomCapacity || null}
                  roomLocation={roomLocation}
                  roomPrice={roomPrice || null}
                  roomType={roomType}
                  setRoomAmentities={setRoomAmentities}
                  setRoomAvailability={setRoomAvailability}
                  setRoomCapacity={setRoomCapacity}
                  setRoomLocation={setRoomLocation}
                  setRoomName={setRoomName}
                  setRoomPrice={setRoomPrice}
                  setRoomType={setRoomType}
                  handleAddRoom={handleAddRoom}
                  isEditing={true}
                  handleDeleteRoom={()=>{handleDeleteRoom(room._id)}}
                  handleUpdateRoom={()=>{handleUpdateRoom(room._id)}}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
    )
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-3 px-4 py-2 mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">Your Rooms</h2>
          <Dialog>
            <DialogTrigger>
              <Button>Add New Room</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Room</DialogTitle>
                <InputRoom
                  roomName={roomName}
                  roomAmentities={roomAmentities}
                  roomAvailability={roomAvailability}
                  roomCapacity={roomCapacity || null}
                  roomLocation={roomLocation}
                  roomPrice={roomPrice || null}
                  roomType={roomType}
                  setRoomAmentities={setRoomAmentities}
                  setRoomAvailability={setRoomAvailability}
                  setRoomCapacity={setRoomCapacity}
                  setRoomLocation={setRoomLocation}
                  setRoomName={setRoomName}
                  setRoomPrice={setRoomPrice}
                  setRoomType={setRoomType}
                  handleAddRoom={handleAddRoom}
                  isEditing={false}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        {rooms.length > 0 ? (
          <Carousel className="mx-10">
            <CarouselContent className="flex justify-center items-stretch">
              {rooms.map((room: Room) => (
                showCrousel(room)
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="text-center">You not added any Rooms Yet</p>
        )}
      </div>
    </div>
  );
};

export default Home;
