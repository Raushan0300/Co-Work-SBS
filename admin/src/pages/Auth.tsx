import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchData } from "@/config";
import React, { useState } from "react";

const Auth = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const res = await fetchData("/auth/admin/signin", "POST", {email, password}, {});
    if(res.status === 200){
      const token = res.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } else{
      alert(res.data.err);
    }
  };

  const handleSignup = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const res = await fetchData("/auth/admin/signup", "POST", {name, email, password, role:"admin"}, {});
    if(res.status === 200){
      const token = res.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/";
    } else{
      alert(res.data.err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <Tabs
        defaultValue="login"
        className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="login" className="w-full font-bold">Signin</TabsTrigger>
          <TabsTrigger value="signup" className="w-full font-bold">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="flex flex-col gap-3">
            
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <Input placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <Input placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <Button type="submit">Sign In</Button>
            </form>
        </TabsContent>
        <TabsContent value="signup" className="flex flex-col gap-3">
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <Input placeholder="Name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <Input placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <Input placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
            <Button type="submit">Sign Up</Button>
            </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
