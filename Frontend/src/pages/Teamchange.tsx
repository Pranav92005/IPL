
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {  useState } from "react"
  import { useSearchParams } from "react-router-dom"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from 'lucide-react'

import SignupSuccessPopup from "@/components/ui/Popup"


  import axios from "axios"
  import { API_ROUTE_URL } from "@/config"
    
import {toast,Toaster} from "react-hot-toast"



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

export default function Teamchange() {
    const[team,setTeam]=useState<string>('');
    const [SearchParams]=useSearchParams();
    const email = SearchParams.get('email') || '';
    const name = SearchParams.get('name') || '';
    const [isChangingTeam, setIsChangingTeam] = useState(false)
    const [signupCompleted, setSignupCompleted] = useState(false);
    
    

    function handlechange(){


        if (!team) {
            toast.error("Please select a team");
            return;
          }

          setIsChangingTeam(false);
      
          
          
        axios.put(`${API_ROUTE_URL}/user/team`, { iplteam:team,
            email:email}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }},
          
        )
            .then((response) => {
            console.log(response);
            const data = response.data as { message: string };
            console.log(data.message);
            
            setSignupCompleted(true);
            
        }).catch((error) => {
            console.error(error);
            toast.error("Something went wrong");
        })
    }
    

  return (
    <>
    
    
    {!signupCompleted?(<Card className="w-full max-w-md mx-auto mt-5">
      <Toaster position="top-center" />
      
    <CardHeader className="flex flex-row items-center gap-4">
      <Avatar className="w-16 h-16">
        <AvatarImage src="/placeholder.svg?height=64&width=64" alt={name || 'User'} />
        <AvatarFallback>
          <User className="w-8 h-8" />
        </AvatarFallback>
      </Avatar>
      <CardTitle className="text-2xl">{name}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Current Team:</span>
        <span className="text-sm">{team|| "Not selected"}</span>
      </div>
      {isChangingTeam ? (
        <Select onValueChange={(value)=>{setTeam(value);setIsChangingTeam(false)}}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a team" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((team) => (
              <SelectItem key={team} value={team}>
                {team}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Button
          onClick={() => {
            if (!team) {
              setIsChangingTeam(true);
            } else {
              handlechange();
            }
          }}
          className="w-full"
        >
          Change Team
        </Button>
      )}
    </CardContent>
  </Card>):
  (<SignupSuccessPopup team={team} name={name} email={email} />)}
  </>
   
  )
}
