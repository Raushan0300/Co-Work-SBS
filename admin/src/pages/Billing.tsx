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
import { Button } from "@/components/ui/button";

const Billing = () => {
    const token = localStorage.getItem("token");

    const [history, setHistory] = useState<any>([]);

    useEffect(()=>{
        const fetchHistory = async()=>{
            const res = await fetchData("/admin/history", "GET", {}, {Authorization: token});
            if(res.status === 200){
                setHistory(res.data.history);
            }
        };
        fetchHistory();
    },[token]);

    const handlePrint = async(id: string)=>{
        const res = await fetchData('/print', "GET", {}, {Authorization: token, historyid: id});
        if(res.status === 200){
          const originalContents = document.body.innerHTML;
          document.body.innerHTML = res.data;
          window.print();
          document.body.innerHTML = originalContents;
          window.location.reload();
        }
      }

  return (
    <div className="flex flex-col mt-10 gap-5 px-4 py-2">
        <h3 className="text-2xl font-semibold border-b leading-10 dark:border-white border-black">Billing History</h3>
        <div className="flex flex-col gap-5 items-center">
            {history.length > 0 ? history.map((item: any, index: number)=>(
                <Card className="w-full flex justify-between" key={index}>
                <div>
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
                </div>
                <div className="flex flex-col items-center justify-center px-4">
                  <Button onClick={()=>{handlePrint(item._id)}}>Print Receipt</Button>
                </div>
              </Card>              
            )) : <p>No Billings Yet</p>}
        </div>
    </div>
  )
};

export default Billing;