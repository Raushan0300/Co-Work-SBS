import { Button } from "./ui/button";
import { DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";

interface InputRoomProps {
  roomName: string;
  setRoomName: (roomName: string) => void;
  roomType: string;
  setRoomType: (roomType: string) => void;
  roomCapacity: number | null;
  setRoomCapacity: (roomCapacity: number) => void;
  roomPrice: number | null;
  setRoomPrice: (roomPrice: number) => void;
  roomAmentities: string[];
  setRoomAmentities: (roomAmentities: string[]) => void;
  roomAvailability: boolean;
  setRoomAvailability: (roomAvailability: boolean) => void;
  roomLocation: string;
  setRoomLocation: (roomLocation: string) => void;
  handleAddRoom: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
  handleDeleteRoom?: () => void;
  handleUpdateRoom?: () => void;
}

const InputRoom = (props: InputRoomProps) => {
  const {
    roomName,
    setRoomName,
    roomType,
    setRoomType,
    roomCapacity,
    setRoomCapacity,
    roomPrice,
    setRoomPrice,
    roomAmentities,
    setRoomAmentities,
    roomAvailability,
    setRoomAvailability,
    roomLocation,
    setRoomLocation,
    handleAddRoom,
    isEditing,
    handleDeleteRoom,
    handleUpdateRoom,
  } = props;

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!isEditing){
        handleAddRoom(e);
    }
  }
  return (
    <DialogDescription>
      <form
        className="flex flex-col gap-2 mt-4 dark:text-white text-gray-900"
        onSubmit={handleOnSubmit}>
        <Input
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
        <Input
          placeholder="Enter Room Type"
          value={roomType}
          onChange={(e) => {
            setRoomType(e.target.value);
          }}
        />
        <Input
          placeholder="Enter Room Capacity"
          type="number"
          value={roomCapacity || ""}
          onChange={(e) => {
            setRoomCapacity(parseInt(e.target.value));
          }}
        />
        <Input
          placeholder="Enter Room Price"
          type="number"
          value={roomPrice || ""}
          onChange={(e) => {
            setRoomPrice(parseInt(e.target.value));
          }}
        />
        <Input
          placeholder="Enter Room Amenities"
          value={roomAmentities.join(",")}
          onChange={(e) => {
            setRoomAmentities(e.target.value.split(", "));
          }}
        />
        <Input
          placeholder="Enter Room Location"
          value={roomLocation}
          onChange={(e) => {
            setRoomLocation(e.target.value);
          }}
        />
        <div className="flex justify-between items-center">
          <h4>Availaibilty</h4>
          <Input
            className="w-6"
            placeholder="Enter Room Availability"
            type="checkbox"
            checked={roomAvailability}
            onChange={(e) => {
              setRoomAvailability(e.target.checked);
            }}
          />
        </div>
        <div className="flex justify-between gap-3 items-center">
            {!isEditing&&<Button type="submit" className="w-full">Add Room</Button>}
            {isEditing && <Button  className="w-full" onClick={handleUpdateRoom}>Update Room</Button>}
            {isEditing && <Button variant={"destructive"} className="w-full" onClick={handleDeleteRoom}>Delete Room</Button>}
        </div>
      </form>
    </DialogDescription>
  );
};

export default InputRoom;
