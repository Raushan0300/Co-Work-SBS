import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-4 py-2 shadow-lg border-b border-gray-200 dark:border-gray-600 dark:shadow-gray-800">
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-5">
                <img src="/logo.png" alt="Co-Work" width={50} />
                <h1 className="text-2xl font-[Kablammo]">Co-Work</h1>
            </div>
            <div className="flex justify-center items-center gap-3">
                <ModeToggle />
                <Button onClick={()=>{navigate('/auth')}}>Sign In</Button>
            </div>
        </div>
    </div>
  )
}

export default Header;