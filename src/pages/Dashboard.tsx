
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  Package, 
  RefreshCw, 
  Plus, 
  TrendingUp,
  Heart,
  Edit
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  const myItems = [
    {
      id: 1,
      title: "Vintage Band T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
      status: "Active",
      views: 24,
      likes: 5,
      points: 45
    },
    {
      id: 2,
      title: "Designer Handbag",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200",
      status: "Pending",
      views: 12,
      likes: 2,
      points: 120
    }
  ];

  const activeSwaps = [
    {
      id: 1,
      otherUser: "Sarah M.",
      myItem: "Vintage Band T-Shirt",
      theirItem: "Denim Jacket",
      status: "Pending",
      date: "2024-01-15"
    }
  ];

  const stats = [
    { label: "Total Points", value: user.points, icon: Star, color: "text-green-600" },
    { label: "Items Listed", value: myItems.length, icon: Package, color: "text-blue-600" },
    { label: "Successful Swaps", value: 3, icon: RefreshCw, color: "text-purple-600" },
    { label: "Profile Views", value: 47, icon: TrendingUp, color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your items, track swaps, and grow your sustainable wardrobe.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="items">My Items</TabsTrigger>
                <TabsTrigger value="swaps">Active Swaps</TabsTrigger>
              </TabsList>
              
              <TabsContent value="items" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Your Listed Items</h2>
                  <Link to="/add-item">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {myItems.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">{item.title}</h3>
                              <Badge 
                                variant={item.status === "Active" ? "default" : "secondary"}
                                className={item.status === "Active" ? "bg-green-100 text-green-800" : ""}
                              >
                                {item.status}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                {item.views} views
                              </span>
                              <span className="flex items-center">
                                <Heart className="h-4 w-4 mr-1" />
                                {item.likes} likes
                              </span>
                              <span className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-green-600" />
                                {item.points} pts
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="swaps" className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Active Swaps</h2>
                
                <div className="space-y-4">
                  {activeSwaps.map((swap) => (
                    <Card key={swap.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              Swap with {swap.otherUser}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              Your "{swap.myItem}" ↔ Their "{swap.theirItem}"
                            </p>
                            <p className="text-xs text-gray-500">
                              Initiated on {new Date(swap.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="secondary" className="mb-2">
                              {swap.status}
                            </Badge>
                            <Button variant="outline" size="sm" className="block">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-green-600" />
                  Points Balance
                </CardTitle>
                <CardDescription>
                  Use points to redeem items or earn more by listing items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {user.points}
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Available Points</p>
                  <Button className="w-full" variant="outline">
                    View Point History
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/add-item" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    List New Item
                  </Button>
                </Link>
                <Button variant="outline" className="w-full">
                  Browse Items
                </Button>
                <Button variant="outline" className="w-full">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Items Saved</span>
                    <span className="font-semibold">7 pieces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CO2 Saved</span>
                    <span className="font-semibold">12.3 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Water Saved</span>
                    <span className="font-semibold">450 L</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
