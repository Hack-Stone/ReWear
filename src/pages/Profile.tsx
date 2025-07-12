import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Edit, 
  Save, 
  X,
  Star,
  Package,
  RefreshCw,
  Award,
  Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Passionate about sustainable fashion and reducing textile waste. Love finding unique pieces and giving clothes a second life!",
    preferences: {
      categories: ["Vintage", "Casual", "Designer"],
      sizes: ["M", "L"],
      style: "Eclectic"
    }
  });

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      bio: "Passionate about sustainable fashion and reducing textile waste. Love finding unique pieces and giving clothes a second life!",
      preferences: {
        categories: ["Vintage", "Casual", "Designer"],
        sizes: ["M", "L"],
        style: "Eclectic"
      }
    });
    setIsEditing(false);
  };

  const stats = [
    { label: "Total Points", value: user?.points || 0, icon: Star, color: "text-green-600" },
    { label: "Items Listed", value: 12, icon: Package, color: "text-blue-600" },
    { label: "Successful Swaps", value: 8, icon: RefreshCw, color: "text-purple-600" },
    { label: "Member Since", value: "Jan 2024", icon: Calendar, color: "text-orange-600" }
  ];

  const recentActivity = [
    { type: "swap", description: "Completed swap: Vintage T-Shirt → Denim Jacket", date: "2 days ago" },
    { type: "listed", description: "Listed new item: Designer Handbag", date: "1 week ago" },
    { type: "points", description: "Earned 45 points from successful swap", date: "1 week ago" },
    { type: "swap", description: "Swap request received for Wool Sweater", date: "2 weeks ago" }
  ];

  const achievements = [
    { title: "Eco Warrior", description: "Completed 5 swaps", icon: Award, earned: true },
    { title: "Community Star", description: "Received 50+ positive ratings", icon: Star, earned: true },
    { title: "Trendsetter", description: "Listed 20+ items", icon: Package, earned: false },
    { title: "Swap Master", description: "Completed 25 swaps", icon: RefreshCw, earned: false }
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">
                Manage your account settings and view your activity
              </p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    ) : (
                      <p className="text-sm text-gray-900 mt-1">{profileData.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-900">{profileData.email}</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center mt-1">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">{profileData.phone}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-900">{profileData.location}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={3}
                      />
                    ) : (
                      <p className="text-sm text-gray-900 mt-1">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>My Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`p-2 rounded-full bg-gray-100 ${stat.color} inline-block mb-2`}>
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Your latest swaps, listings, and interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.description}
                            </p>
                            <p className="text-xs text-gray-500">{activity.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>
                      Unlock badges as you participate in the community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <div 
                          key={index} 
                          className={`p-4 border rounded-lg ${
                            achievement.earned 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              achievement.earned 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <achievement.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className={`font-semibold ${
                                achievement.earned ? 'text-green-900' : 'text-gray-500'
                              }`}>
                                {achievement.title}
                              </h3>
                              <p className={`text-sm ${
                                achievement.earned ? 'text-green-700' : 'text-gray-500'
                              }`}>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping Preferences</CardTitle>
                    <CardDescription>
                      Help us show you items you'll love
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Favorite Categories</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.preferences.categories.map((category, index) => (
                          <Badge key={index} variant="secondary">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Sizes</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {profileData.preferences.sizes.map((size, index) => (
                          <Badge key={index} variant="outline">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Style Preference</Label>
                      <p className="text-sm text-gray-900 mt-1">{profileData.preferences.style}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
