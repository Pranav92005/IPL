import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_ROUTE_URL } from '@/config'


import { Toaster, toast } from "react-hot-toast";
import SignupSuccessPopup from '@/components/ui/Popup'



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const teams = [
  "MI",  
"CSK",  
"RCB",  
"KKR",  
"DC",  
"SRH",  
"PBKS",  
"RR", 
"LSG",
"GT" 
]



export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [iplteam, setTeam] = useState<string>('');
  const [signupCompleted, setSignupCompleted] = useState(false);









//handle signin
  // handle signin
const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);

  try {
    const response = await axios.post(`${API_ROUTE_URL}/user/signin`, {
      email,
      password,
    });

    const data = response.data as { token: string; name: string; team: string };
    localStorage.setItem("token", data.token);
    setName(data.name);
    setTeam(data.team);
    setSignupCompleted(true);
  } catch (error) {
    console.error(error);
    toast.error("Invalid Credentials", {
      style: { background: "#EF4444", color: "#FFF" },
      duration: 2000,
    });
  } finally {
    setIsLoading(false);
  }
};

// handle signup
const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setIsLoading(true);

  if (!iplteam) {
    toast.error("Please select your favorite team", {
      style: { background: "#EF4444", color: "#FFF" },
      duration: 2000,
    });
    setIsLoading(false);
    return;
  }

  try {
    const response = await axios.post(`${API_ROUTE_URL}/user/signup`, {
      email,
      password,
      name,
      iplteam,
    });

    const data = response.data as { token: string };
    localStorage.setItem("token", data.token);
    setSignupCompleted(true);
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong", {
      style: { background: "#EF4444", color: "#FFF" },
      duration: 2000,
    });
  } finally {
    setIsLoading(false);
  }
};



  return (

    <>
        {!signupCompleted ? (
          <>
            <Toaster position="top-center" />
            <div className='bg-violet-950  flex justify-center  '>
              <img src="logo2.png" alt="logo" className="mt-4 absolute" height={120} width={120} />
            </div>
            <div className="min-h-screen  bg-violet-950 flex items-center justify-center px-4">
              <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">IPL Store Access</CardTitle>
                    <img src="iplLogo.png" alt="IPL Logo" width={40} height={40} className="rounded-full" />
                  </div>
                  <CardDescription>Sign in to your account or create a new one to start shopping</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="signin" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signin">
                      <form onSubmit={handleSignin} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="m@example.com" required type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" required type="password" placeholder='min 6 chars' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                          {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="signup">
                      <form onSubmit={handleSignup} className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="John Doe" onChange={(e) => { setName(e.target.value) }} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" placeholder="m@example.com" required type="email" onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" required type="password" placeholder='min 6 chars' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="team">Favorite Team</Label>
                          <Select onValueChange={(value) => setTeam(value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your favorite team" />
                            </SelectTrigger>
                            <SelectContent>
                              {teams.map((team) => (
                                <SelectItem key={team} value={team}>
                                  {team}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full" type="submit" disabled={isLoading}>
                          {isLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to="/">Back to Store</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        ) : 

        (<SignupSuccessPopup team={iplteam} name={name} email={email} />)
        
        
        }
      </>
    
  )
}

