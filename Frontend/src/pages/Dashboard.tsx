
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, ShoppingCart, Star, TrendingUp } from 'lucide-react'

const products = [
  { id: 1, name: 'Chennai Super Kings bat', price: 1999, rating: 4.5, image: 'cskbat.jpeg' },
  { id: 2, name: 'KKR cap', price: 599, rating: 4.7, image: 'kkrcap.webp' },
  { id: 3, name: 'RCB Jersey', price: 4999, rating: 4.9, image: 'rcbjrsi.webp' },
  { id: 4, name: 'IPL 2025 Match Ball', price: 799, rating: 4.3, image: 'cskball.jpeg' },
]

const featuredTeams = [
  { name: 'Mumbai Indians', color: 'bg-blue-500', logo: 'MI.png' },
  { name: 'Chennai Super Kings', color: 'bg-yellow-500', logo: 'CSK.png' },
  { name: 'Royal Challengers Bangalore', color: 'bg-red-500', logo: 'RCB.png' },
  { name: 'Kolkata Knight Riders', color: 'bg-purple-500', logo: 'KKR.png' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[url('/placeholder.svg?height=1080&width=1920&text=Cricket+Stadium')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-violet-950  ">
        <header className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            
            <img src="iplLogo.png" alt="IPL Logo"  width={60} height={60} className="rounded-full "/>
            <span className="text-2xl font-bold text-white">IPL Store</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-white hover:text-blue-300">
              <Link to="/cart">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <section className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              IPL 2025 Official Store
              
            </h1>
            <p className="text-xl mb-8 text-white">Get your favorite team's merchandise and official IPL products!</p>
            <img src="ipl.png" alt="IPL Trophy" width={200} height={200} className="mx-auto mb-8 rounded-md" />
          </section>

          <Tabs defaultValue="featured" className="mb-16">
            <TabsList className="grid w-full grid-cols-4 bg-blue-800 rounded-full p-1">
              <TabsTrigger value="featured" className="rounded-full text-white data-[state=active]:bg-blue-500">Featured</TabsTrigger>
              <TabsTrigger value="jerseys" className="rounded-full text-white data-[state=active]:bg-blue-500">Jerseys</TabsTrigger>
              <TabsTrigger value="accessories" className="rounded-full text-white data-[state=active]:bg-blue-500">Accessories</TabsTrigger>
              <TabsTrigger value="memorabilia" className="rounded-full text-white data-[state=active]:bg-blue-500">Memorabilia</TabsTrigger>
            </TabsList>
            <TabsContent value="featured" className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="bg-white bg-opacity-90 text-gray-800 overflow-hidden transform transition duration-300 hover:scale-105">
                    <CardHeader className="p-0">
                      <img src={product.image} alt={product.name} width={400} height={300} className="w-full h-48 object-cover" />
                    </CardHeader>
                    <CardContent className="p-4">
                      <CardTitle>{product.name}</CardTitle>
                      <p className="text-2xl font-bold mt-2 text-blue-600">₹{product.price}</p>
                      <div className="flex items-center mt-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="jerseys">
              <Card className="bg-white bg-opacity-90">
                <CardHeader>
                  <CardTitle>Team Jerseys</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Browse official IPL team jerseys. Coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="accessories">
              <Card className="bg-white bg-opacity-90">
                <CardHeader>
                  <CardTitle>IPL Accessories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Explore IPL-themed accessories. Coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="memorabilia">
              <Card className="bg-white bg-opacity-90">
                <CardHeader>
                  <CardTitle>IPL Memorabilia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Discover exclusive IPL memorabilia. Coming soon!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-white">Featured Teams</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {featuredTeams.map((team, index) => (
                <Card key={index} className={`${team.color} text-white overflow-hidden transform transition duration-300 hover:scale-105`}>
                  <CardHeader>
                    <CardTitle className="text-center">{team.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <img src={team.logo} alt={team.name} width={80} height={80} className="rounded-full" />
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" className="w-full bg-white text-gray-800 hover:bg-gray-200">Shop Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white bg-opacity-90 transform transition duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flash Sale</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">24 Hours Left</div>
                <p className="text-xs text-gray-600">Up to 50% off on select items</p>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-90 transform transition duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Arrivals</CardTitle>
                <Star className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">IPL 2025 Collection</div>
                <p className="text-xs text-gray-600">Fresh designs now available</p>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-90 transform transition duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Match</CardTitle>
                <CalendarDays className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">MI vs CSK</div>
                <p className="text-xs text-gray-600">Get your gear before the big game!</p>
              </CardContent>
            </Card>
            <Card className="bg-white bg-opacity-90 transform transition duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
                <ShoppingCart className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">Earn 2x Points</div>
                <p className="text-xs text-gray-600">On all purchases this week</p>
              </CardContent>
            </Card>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Join the IPL Fanclub</h2>
            <p className="mb-4 text-white">Get exclusive deals, early access to new products, and more!</p>
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Link to="/auth">Sign Up Now</Link>
            </Button>
          </section>
        </main>

        <footer className="bg-blue-800 py-8 mt-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <p>&copy; 2025 IPL Official Store. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

