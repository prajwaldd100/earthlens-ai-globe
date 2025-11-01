import { Link, useLocation } from "react-router-dom";
import { Globe, Home, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass-card">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Globe className="h-8 w-8 text-primary group-hover:animate-float" />
          <span className="text-2xl font-bold text-glow">EarthLens</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button 
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button 
              variant={isActive("/dashboard") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Globe className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link to="/ai-insights">
            <Button 
              variant={isActive("/ai-insights") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              AI Insights
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
