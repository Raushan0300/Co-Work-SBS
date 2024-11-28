import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { UserCircle2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchData } from "@/config";

const Header = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(token){
      setLoggedIn(true);
    } else{
      setLoggedIn(false);
    };
  }, [token]);

  useEffect(()=>{
    const fetchProfile = async()=>{
      if(token){
        const res = await fetchData("/profile", "GET", {}, {'authorization': token});
      if(res.status === 200){
        setName(res.data.user.name);
      }
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="flex flex-col px-4 py-2 shadow-lg border-b border-gray-200 dark:border-gray-600 dark:shadow-gray-800">
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-5">
                <img src="/logo.png" alt="Co-Work" width={50} />
                <h1 className="text-2xl font-[Kablammo]">Co-Work</h1>
            </div>
            <div className="flex justify-center items-center gap-3">
                <ModeToggle />
                {!loggedIn ? <Button onClick={()=>{navigate('/auth')}}>Sign In</Button> : <DropdownMenu>
  <DropdownMenuTrigger><UserCircle2Icon className="cursor-pointer" /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>{navigate("/profile")}} className="cursor-pointer">Profile</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer" onClick={()=>{navigate("/history")}}>History</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer">Sign Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}
            </div>
        </div>
    </div>
  )
}

export default Header;