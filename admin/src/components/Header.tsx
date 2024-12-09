import { ModeToggle } from "./mode-toggle";
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
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const token = localStorage.getItem("token");

  useEffect(()=>{
    const fetchProfile = async()=>{
      if(token){
        const res = await fetchData("/profile", "GET", {}, {'authorization': token});
      if(res.status === 200){
        setName(res.data.user.name);
        setRole(res.data.user.role);
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
                <h1 className="text-2xl font-[Kablammo]">Co-Work <span className="text-sm text-gray-500 font-sans">(Admin)</span></h1>
            </div>
            <div className="flex justify-center items-center gap-3">
                <ModeToggle />
                <DropdownMenu>
  <DropdownMenuTrigger><UserCircle2Icon className="cursor-pointer" /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{name} <span className="text-sm text-gray-500">({role})</span></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={()=>{navigate("/profile")}} className="cursor-pointer">Profile</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer" onClick={()=>{navigate("/billing")}}>Billing</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer">Subscription</DropdownMenuItem>
    <DropdownMenuItem className="cursor-pointer">Sign Out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            </div>
        </div>
    </div>
  )
}

export default Header;