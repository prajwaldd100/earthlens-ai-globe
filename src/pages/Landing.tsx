import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, Globe, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import earthHero from "@/assets/earth-hero.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${earthHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full border border-primary/50 text-sm text-primary bg-primary/10">
                <Sparkles className="inline h-4 w-4 mr-2" />
                Powered by AI & Real-Time Data
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-glow leading-tight">
              Visualize Earth's
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Environmental Future
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Track real-time environmental data, analyze global trends, and predict planetary changes with AI-powered insights from NASA, OpenWeatherMap, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 text-lg px-8 animate-glow-pulse">
                  Explore Dashboard
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ai-insights">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 border-primary/50">
                  <Brain className="h-5 w-5" />
                  AI Insights
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4 text-glow">Powerful Features</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to understand our planet's health
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:card-glow animate-slide-up">
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3D Interactive Globe</h3>
              <p className="text-muted-foreground">
                Explore environmental data layers on a beautiful 3D globe with real-time updates from multiple data sources.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:card-glow animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Data Analytics</h3>
              <p className="text-muted-foreground">
                Track temperature trends, CO₂ emissions, forest cover, and ocean temperatures with interactive charts.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:card-glow animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Predictions</h3>
              <p className="text-muted-foreground">
                Get AI-powered insights and predictions about Earth's future based on latest environmental data trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="glass-card max-w-4xl mx-auto p-12 rounded-2xl border border-primary/30 card-glow text-center">
            <h2 className="text-4xl font-bold mb-6 text-glow">
              Ready to Explore?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start visualizing Earth's environmental data and discover insights about our planet's future with AI-powered analytics.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 text-lg px-12 animate-glow-pulse">
                Launch Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-6">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 EarthLens. Powered by Lovable Cloud, NASA EarthData, OpenWeatherMap & AI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
