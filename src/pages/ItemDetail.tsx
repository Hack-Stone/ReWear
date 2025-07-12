
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Star, 
  ArrowLeft, 
  MessageCircle, 
  Flag,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ItemDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Mock item data - in real app, this would come from API
  const item = {
    id: id,
    title: "Vintage Denim Jacket",
    description: "Beautiful vintage denim jacket in excellent condition. Classic blue wash with minimal wear. Perfect for layering and adding a vintage touch to any outfit. From a smoke-free home.",
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    ],
    condition: "Excellent",
    size: "M",
    category: "Outerwear",
    brand: "Vintage",
    points: 75,
    tags: ["vintage", "denim", "classic", "unisex"],
    owner: {
      name: "Sarah M.",
      rating: 4.8,
      swapsCompleted: 24,
      joinDate: "2023-06-15"
    },
    isAvailable: true,
    views: 156,
    likes: 23,
    postedDate: "2024-01-10"
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const handleSwapRequest = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    toast.success("Swap request sent to " + item.owner.name);
  };

  const handleRedeemWithPoints = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (user.points < item.points) {
      toast.error("Insufficient points. You need " + (item.points - user.points) + " more points.");
      return;
    }
    toast.success("Item redeemed successfully!");
  };

  const toggleLike = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    setIsLiked(!isLiked);
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={item.images[currentImageIndex]} 
                alt={item.title}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              
              {item.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
              
              <div className="absolute top-4 right-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLike}
                  className="bg-white/80 hover:bg-white"
                >
                  <Heart 
                    className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </Button>
              </div>
            </div>

            {item.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span>{item.views} views</span>
                    <span>{item.likes} likes</span>
                    <span>Posted {new Date(item.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end mb-2">
                    <Star className="h-5 w-5 text-green-600 mr-1" />
                    <span className="text-2xl font-bold text-green-600">{item.points}</span>
                    <span className="text-gray-600 ml-1">pts</span>
                  </div>
                  <Badge 
                    variant={item.isAvailable ? "default" : "secondary"}
                    className={item.isAvailable ? "bg-green-100 text-green-800" : ""}
                  >
                    {item.isAvailable ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{item.category}</Badge>
                <Badge variant="outline">Size {item.size}</Badge>
                <Badge variant="outline">{item.condition}</Badge>
                <Badge variant="outline">{item.brand}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Owner Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {item.owner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.owner.name}</h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {item.owner.rating}
                      </div>
                      <span>{item.owner.swapsCompleted} successful swaps</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Member since {new Date(item.owner.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {item.isAvailable && (
              <div className="space-y-3">
                <Button 
                  onClick={handleSwapRequest}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  size="lg"
                >
                  Request Swap
                </Button>
                
                <Button 
                  onClick={handleRedeemWithPoints}
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3"
                  size="lg"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Redeem with {item.points} Points
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save to Favorites
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {!item.isAvailable && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">This item is no longer available</p>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Browse Other Items
                </Button>
              </div>
            )}

            {user?.points !== undefined && user.points < item.points && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 text-sm">
                  You need {item.points - user.points} more points to redeem this item. 
                  List more items to earn points!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
