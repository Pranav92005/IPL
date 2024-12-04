import { useSearchParams } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


import { API_ROUTE_URL } from "@/config";
import toast from "react-hot-toast";

 export const IPL = [
  { name: "MI", code: "X7A2G9", color: "rgb(0,102,204)", tagline: "#TheSpiritOfCricket" }, // Navy Blue
  { name: "CSK", code: "L4M9Q1", color: "rgb(255,204,0)", tagline: "#YelloveForever" }, // Yellow
  { name: "RCB", code: "P8Z3K5", color: "rgb(255,0,0)", tagline: "#PlayBold" }, // Red
  { name: "KKR", code: "T1R7Y6", color: "rgb(75,0,130)", tagline: "#AllHailTheKnights" }, // Violet
  { name: "DC", code: "F3B8J2", color: "rgb(0,51,204)", tagline: "#ThePowerOfCapitals" }, // Blue
  { name: "SRH", code: "Z5X9L4", color: "rgb(255,102,0)", tagline: "#RiseUpToEveryChallenge" }, // Orange
  { name: "PBKS", code: "Q6T1M8", color: "rgb(178,34,34)", tagline: "#LivePunjabPlayPunjab" }, // Dark Red
  { name: "RR", code: "K9L3X7", color: "rgb(255,20,147)", tagline: "#TheRoyalRule" }, // Pink
  { name: "LSG", code: "M2P5F9", color: "rgb(0,123,167)", tagline: "#SoaringHighLucknowStyle" }, // Light Blue
  { name: "GT", code: "Y8R4T2", color: "rgb(15,76,129)", tagline: "#GameChangers" } // Dark Blue
];


interface Product{

  _id:string;
  name:string;
  price:number;
  description:string,
  countInStock:number;
  image:string;
  iplteam:string;
category:string;
}




export default function Home() {
  const [searchParams] = useSearchParams();
  const teamcode = searchParams.get("team");
  const team = IPL.find((t) => t.code === teamcode)?.name || null;
  const name = searchParams.get("name") || null;
  const email = searchParams.get("email") || null;
  const teamcolor = IPL.find((t) => t.name === team)?.color || "transparent";
  const tagline = IPL.find((t) => t.name === team)?.tagline || "Where talent meets opportunity";
  const [teamdata, setTeamdata] = useState<Product[]>([]);
  const[loading,setloading]=useState(false);
  

  useEffect(() => {
    if (!team || !name) {
      window.location.href = "/auth";
    }
    setloading(true);

    const token = localStorage.getItem("token");
    if(!token){
      toast.error("Please login to continue");

      
      window.location.href = "/auth";
      
    }
    axios
      .get(`${API_ROUTE_URL}/product/allProduct`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const data = response.data as Product[];
       
        

        const filteredTeamdata = data.filter(
          (product: Product) => product.iplteam === team
        );

         
        
        setTeamdata(filteredTeamdata);
        setloading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");

      });
  }, [team]);

  



  return (
    <>
    {
      loading && <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-slate-600"></div></div>
    }
      <div className="w-screen">
        <Navbar  tagline={tagline||"Where talent meets opportunity"} color={teamcolor || "transparent"} team={team} name={name} email={email} />
      </div>
      
      <div className="bg-slate-200">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:mx-10">
          {teamdata.map((product: Product) => (
            <Card  key={product._id} product={product}  />
          ))}
        </div>
      </div>
      <div className="w-screen">
        <Footer  color={teamcolor} team={team || ""} />
      </div>

      
    </>
  );
}





//Product card

function Card({ product }: { product:Product}) {

  

  
  return (
    <>
      
        <div >
          <div>
            <div className="mx-2 mt-6  ">
              <div className="bg-white  md:h-[70vh] p-4 m-2 rounded-lg shadow-md">
              <Link to={`/product/?id=${product._id}`}>
                <img
                  src={`${product.image}`}
                  alt="product"
                  className="object-contain"
                />
                </Link>
                <div className="flex justify-center">

                  <div>
                  <div className="text-md font-semibold text-center">{product.name}</div>
                <div className="text-lg font-bold text-center">
                  Price: ₹ {product.price}
                </div>
                <div className="text-sm font-semibold text-center">
                  Left: {product.countInStock}
                </div>
                <div className="flex justify-center"> <button  className="bg-white-500  text-black border-slate-600 border-2 p-2 rounded-md mt-2">
                  Add to cart
                </button></div>
                
                  </div>
               

                </div>
               
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}






//Navbar

export function Navbar({

  color,
  team,
  name,
  email,
  tagline
}: {
  color: string;
  team: string | null;
  name: string | null;
  email: string | null;
  tagline: string | null; 
}) {
  

  return (
    <>
      <div
        className="flex justify-between p-2 h-36 w-screen"
        style={{ backgroundColor: color }}
      >
        <div className="flex, flex-col ">

        <img src={`${team}.png`} alt="logo"  className="ml-2  h-24" />
        <div className="text-white font-semibold ml-1  ">{tagline}</div>
        </div>
        

        <div className="flex items-center ml-[-8vw]  md:gap-14 gap-1 md:mr-2">
          <Button asChild variant="ghost" className="text-white hover:text-red-600">
            <div><ShoppingCart /></div>
              
          
          </Button>

        
            <div className="md:text-md md:font-semibold text-sm font-medium text-white">Orders</div>
          

          <Button asChild variant="ghost" className="text-white hover:text-red-600">
            <Link to={`/teamchange?email=${email}&name=${name}`}>
            <div className="flex flex-col items-center">

            <User />
            <p>{name}</p>

            </div>
             
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}


//footer


function Footer({ color, team }: { color: string; team: string }) {
  return (
    <div className=" text-white flex flex-col items-center text-center py-4" style={{background:color}}>
      
      <p>&copy; 2025 IPL Store. All rights reserved.</p>
      <img src={`${team}.png`}  width={80} alt="logo" />
      <p> </p>

    </div>
  );
}
