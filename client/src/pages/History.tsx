import { fetchData } from "@/config";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

const History = () => {
    const token = localStorage.getItem("token");

    const [history, setHistory] = useState<any>([]);

    useEffect(()=>{
        const fetchHistory = async()=>{
            const res = await fetchData("/history", "GET", {}, {Authorization: token});
            if(res.status === 200){
                setHistory(res.data.history);
            }
        };
        fetchHistory();
    },[token]);

  return (
    <div className="flex flex-col mt-10 gap-5 px-4 py-2">
        <h3 className="text-2xl font-semibold border-b leading-10 dark:border-white border-black">Booking History</h3>
        <div className="flex flex-col gap-5 items-center">
            {history.length > 0 ? history.map((item: any, index: number)=>(
                <Card className="w-full" key={index}>
                <CardHeader>
                  <CardTitle>{item.bookedRoom.roomName}</CardTitle>
                  <CardDescription>{item.bookedRoom.roomType}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-start">
                    <p>Check In Date: {format(item.checkInDate, "dd-MM-yy, HH:mm")}</p>
                    <p>Check Out Date: {format(item.checkOutDate, "dd-MM-yy, HH:mm")}</p>
                    <p>Location: {item.bookedRoom.roomLocation}</p>
                    <p>Total Amount: {item.totalAmount}</p>
                    <p>Booked On: {format(item.bookedDate, "dd-MM-yy, HH:mm")}</p>
                  </div>
                </CardContent>
              </Card>              
            )) : <p>No History Found</p>}
        </div>
    </div>
  )
};

export default History;