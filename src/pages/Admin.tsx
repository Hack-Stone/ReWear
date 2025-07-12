
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  X, 
  Eye, 
  Flag, 
  Users, 
  Package, 
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user?.isAdmin) {
    navigate("/");
    return null;
  }

  const [pendingItems] = useState([
    {
      id: 1,
      title: "Designer Handbag",
      user: "Emily Chen",
      category: "Accessories",
      condition: "Like New",
      points: 120,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200",
      submittedDate: "2024-01-15",
      description: "Authentic designer handbag in excellent condition..."
    },
    {
      id: 2,
      title: "Vintage Concert T-Shirt",
      user: "Mike Johnson",
      category: "Tops",
      condition: "Good",
      points: 45,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200",
      submittedDate: "2024-01-14",
      description: "Rare vintage band t-shirt from 1995 tour..."
    }
  ]);

  const [reportedItems] = useState([
    {
      id: 3,
      title: "Questionable Item",
      user: "Anonymous User",
      reportReason: "Inappropriate content",
      reportCount: 3,
      severity: "High"
    }
  ]);

  const stats = [
    { label: "Pending Approvals", value: pendingItems.length, icon: Package, color: "text-orange-600" },
    { label: "Total Users", value: 1247, icon: Users, color: "text-blue-600" },
    { label: "Reported Items", value: reportedItems.length, icon: Flag, color: "text-red-600" },
    { label: "This Month's Growth", value: "+12%", icon: TrendingUp, color: "text-green-600" }
  ];

  const handleApprove = (itemId: number) => {
    toast.success("Item approved successfully");
  };

  const handleReject = (itemId: number) => {
    toast.success("Item rejected and user notified");
  };

  const handleRemoveReported = (itemId: number) => {
    toast.success("Reported item removed");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage items, moderate content, and oversee the ReWear community
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
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              Pending Approvals ({pendingItems.length})
            </TabsTrigger>
            <TabsTrigger value="reported">
              Reported Items ({reportedItems.length})
            </TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="space-y-6">
            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">by {item.user}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-green-600 mb-1">
                              {item.points} pts
                            </div>
                            <Badge variant="secondary">
                              {item.condition}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <Badge variant="outline">{item.category}</Badge>
                          <span>Submitted {new Date(item.submittedDate).toLocaleDateString()}</span>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center space-x-3">
                          <Button 
                            onClick={() => handleApprove(item.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleReject(item.id)}
                            variant="destructive"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reported" className="space-y-6">
            <div className="space-y-4">
              {reportedItems.map((item) => (
                <Card key={item.id} className="border-red-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Posted by {item.user}</p>
                        <div className="flex items-center space-x-4">
                          <Badge 
                            variant="destructive" 
                            className={item.severity === "High" ? "bg-red-100 text-red-800" : ""}
                          >
                            {item.severity} Priority
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {item.reportCount} reports
                          </span>
                          <span className="text-sm text-gray-600">
                            Reason: {item.reportReason}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button 
                          onClick={() => handleRemoveReported(item.id)}
                          variant="destructive"
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Active Users</h4>
                      <p className="text-sm text-gray-600">1,247 registered users</p>
                    </div>
                    <Button variant="outline">View All</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Suspended Users</h4>
                      <p className="text-sm text-gray-600">12 temporarily suspended</p>
                    </div>
                    <Button variant="outline">Review</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">User Reports</h4>
                      <p className="text-sm text-gray-600">3 pending user reports</p>
                    </div>
                    <Button variant="outline">Investigate</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
