import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { fetchData } from "@/config";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<any>([]);

  const token = localStorage.getItem("token");

  const fetchRooms = async()=>{
    const res = await fetchData("/get-rooms", "GET", {}, {Authorization: token});
    if(res.status === 200){
      setRooms(res.data);
    };
  }

  useEffect(()=>{
    fetchRooms();
  },[]);
  return (
    <div>
      <div className="flex flex-col mt-10">
        <h1 className="text-3xl text-center">
          Welcome to <span className="text-3xl font-[Kablammo]">Co-Work</span>
        </h1>
        <p className="text-center mt-5 text-lg">
          A place where you can work together with your friends
        </p>
      </div>

      <div className="mt-10 px-4">
        <h2 className="text-2xl mb-5">Our Top Rated Rooms</h2>
        <Carousel className="mx-10">
          <CarouselContent className="flex justify-center items-stretch">
            {rooms.map((room: any) => (
              <CarouselItem key={room._id} className="p-4 md:basis-1/4 sm:basis-1/2" onClick={()=>{navigate(`/room?id=${room._id}`)}}>
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
        </Carousel>
      </div>

      <div className="mt-16 bg-gray-100 py-10">
        <h2 className="text-2xl text-center mb-5 text-gray-800">What Our Client Say</h2>
        <div className="flex flex-col sm:flex-row justify-around px-8">
          <div className="bg-white p-4 rounded-lg shadow-md mb-5 sm:mb-0 sm:mr-3">
            <p className="text-gray-700">"Co-Work has been a game changer for our remote meetings. The rooms are always clean, well-equipped, and just perfect for our needs."</p>
            <p className="text-sm font-semibold text-gray-600 mt-2">- John D</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-5 sm:mb-0 sm:mr-3">
            <p className="text-gray-700">"Co-Work has been a game changer for our remote meetings. The rooms are always clean, well-equipped, and just perfect for our needs."</p>
            <p className="text-sm font-semibold text-gray-600 mt-2">- John D</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-5 sm:mb-0 sm:mr-3">
            <p className="text-gray-700">"Co-Work has been a game changer for our remote meetings. The rooms are always clean, well-equipped, and just perfect for our needs."</p>
            <p className="text-sm font-semibold text-gray-600 mt-2">- John D</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-5 sm:mb-0 sm:mr-3">
            <p className="text-gray-700">"Co-Work has been a game changer for our remote meetings. The rooms are always clean, well-equipped, and just perfect for our needs."</p>
            <p className="text-sm font-semibold text-gray-600 mt-2">- John D</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md mb-5 sm:mb-0 sm:mr-3">
            <p className="text-gray-700">"Co-Work has been a game changer for our remote meetings. The rooms are always clean, well-equipped, and just perfect for our needs."</p>
            <p className="text-sm font-semibold text-gray-600 mt-2">- John D</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
