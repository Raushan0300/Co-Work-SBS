import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
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
          <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button>Sign In</Button>
        </TabsContent>
        <TabsContent value="signup" className="flex flex-col gap-3">
            <Input placeholder="Name" type="text" />
        <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />
            <Button>Sign Up</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
