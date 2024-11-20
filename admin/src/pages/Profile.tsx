import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchData } from "@/config";
import { useEffect, useState } from "react";

const Profile = () => {
    const token = localStorage.getItem("token");

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [isEditing, setIsEditing] = useState<boolean>(false);
    useEffect(()=>{
        const fetchProfile = async()=>{
          if(token){
            const res = await fetchData("/profile", "GET", {}, {'authorization': token});
          if(res.status === 200){
            setName(res.data.user.name);
            setEmail(res.data.user.email);
          }
          }
        };
        fetchProfile();
      }, [token]);

      const handleUpdateProfile = async()=>{
        const res = await fetchData("/profile/update", "PUT", {name}, {'authorization': token});
        if(res.status === 200){
          setIsEditing(false);
        }
      }
  return (
    <div className="flex flex-col px-20 py-4 h-[70vh]">
        <h2 className="text-2xl dark:text-blue-400 text-blue-600">Profile</h2>
        {!isEditing ? <div className="flex flex-col mt-10">
            <p className="text-lg">Name: <span className="font-semibold text-red-500">{name}</span></p>
            <p className="text-lg">Email: <span className="font-semibold text-red-500">{email}</span></p>
        </div> : <div className="flex flex-col mt-10">
        <div className="flex items-center gap-4">
        <p className="text-lg">Name: </p>
        <Input value={name} onChange={(e)=>{setName(e.target.value)}} />
        </div>
            </div>}
        {!isEditing?<Button variant={"outline"} className="w-1/12 mt-5" onClick={()=>{setIsEditing(true)}}>Edit Profile</Button>:<Button className="w-1/12 mt-5" onClick={handleUpdateProfile}>Update Profile</Button>}
    </div>
  )
};

export default Profile;