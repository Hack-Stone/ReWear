
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Recycle, Users, Leaf, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400",
      condition: "Excellent",
      points: 75,
      category: "Outerwear"
    },
    {
      id: 2,
      title: "Designer Summer Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      condition: "Like New",
      points: 120,
      category: "Dresses"
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      condition: "Good",
      points: 60,
      category: "Footwear"
    },
    {
      id: 4,
      title: "Cozy Wool Sweater",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
      condition: "Excellent",
      points: 90,
      category: "Knitwear"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredItems.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredItems.length / 2)) % Math.ceil(featuredItems.length / 2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">
                <Leaf className="w-3 h-3 mr-1" />
                Sustainable Fashion
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Give Your Clothes a 
                <span className="text-green-600 block">Second Life</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Join our community of conscious fashion lovers. Swap, trade, and discover pre-loved clothing while reducing textile waste.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/auth">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                    Start Swapping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Browse Items
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop" 
                  alt="Sustainable clothing rack" 
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-pulse">
                  <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-500 rounded-full p-4 shadow-lg">
                  <Recycle className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How ReWear Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, sustainable, and social - discover the future of fashion exchange
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join the Community</h3>
              <p className="text-gray-600">
                Sign up and become part of our sustainable fashion community. Get 50 welcome points to start!
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Recycle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">List & Swap</h3>
              <p className="text-gray-600">
                Upload your unused clothes and swap them directly with other users or use our points system.
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover & Love</h3>
              <p className="text-gray-600">
                Find unique pieces, save money, and help reduce fashion waste. Every swap makes a difference!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Items
            </h2>
            <p className="text-xl text-gray-600">
              Discover amazing pieces from our community
            </p>
          </div>
          
          <div className="relative">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <Link key={item.id} to={`/item/${item.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                        <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 cursor-pointer" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-sm font-medium text-green-600">{item.points}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="text-xs">
                          {item.category}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="text-xs border-green-200 text-green-700"
                        >
                          {item.condition}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of fashion lovers who are making a difference, one swap at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Join ReWear Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                List Your First Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">ReWear</h3>
              <p className="text-gray-400 mb-4">
                Building a sustainable future through community-driven fashion exchange.
              </p>
              <div className="flex space-x-4">
                <Heart className="h-5 w-5 text-green-400 cursor-pointer hover:text-green-300" />
                <Recycle className="h-5 w-5 text-green-400 cursor-pointer hover:text-green-300" />
                <Users className="h-5 w-5 text-green-400 cursor-pointer hover:text-green-300" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Browse Items</a></li>
                <li><a href="#" className="hover:text-white">Points System</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReWear. Making fashion sustainable, one swap at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
