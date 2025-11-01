import { useState } from "react";
import Navigation from "@/components/Navigation";
import Globe3D from "@/components/Globe3D";
import DataCard from "@/components/DataCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Leaf, Sparkles, Thermometer, Wind } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { toast } from "sonner";

// Mock data for charts
const temperatureData = [
  { month: 'Jan', temp: 14.2 },
  { month: 'Feb', temp: 14.5 },
  { month: 'Mar', temp: 14.8 },
  { month: 'Apr', temp: 15.1 },
  { month: 'May', temp: 15.4 },
  { month: 'Jun', temp: 15.7 },
];

const co2Data = [
  { year: '2020', ppm: 414 },
  { year: '2021', ppm: 416 },
  { year: '2022', ppm: 418 },
  { year: '2023', ppm: 421 },
  { year: '2024', ppm: 424 },
  { year: '2025', ppm: 427 },
];

const Dashboard = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePredictFuture = async () => {
    setIsGenerating(true);
    toast.loading("AI is analyzing global data...");
    
    // Simulate AI processing
    setTimeout(() => {
      toast.dismiss();
      toast.success("Prediction Generated!", {
        description: "Based on current trends, global temperatures are projected to rise 0.3°C over the next 30 days with increased CO₂ levels in industrialized regions.",
        duration: 8000,
      });
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-glow mb-2">Environmental Dashboard</h1>
              <p className="text-muted-foreground">Real-time planetary health monitoring</p>
            </div>
            <Button 
              size="lg" 
              onClick={handlePredictFuture}
              disabled={isGenerating}
              className="gap-2 animate-glow-pulse"
            >
              <Sparkles className="h-5 w-5" />
              Predict Earth's Future
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataCard
              title="Global Temperature"
              value="15.7°C"
              change="+0.3°C from last month"
              icon={Thermometer}
              trend="up"
            />
            <DataCard
              title="CO₂ Levels"
              value="427 ppm"
              change="+3 ppm from last year"
              icon={Cloud}
              trend="up"
            />
            <DataCard
              title="Forest Cover"
              value="31.2%"
              change="-0.8% deforestation rate"
              icon={Leaf}
              trend="down"
            />
            <DataCard
              title="Ocean Temperature"
              value="17.4°C"
              change="+0.2°C from baseline"
              icon={Droplets}
              trend="up"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Globe */}
            <Card className="lg:col-span-2 glass-card border-border/50 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-primary" />
                  Interactive Earth View
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Globe3D />
              </CardContent>
            </Card>

            {/* Air Quality Index */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Air Quality Index</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>North America</span>
                    <span className="text-success font-semibold">Good (42)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[42%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Europe</span>
                    <span className="text-warning font-semibold">Moderate (68)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-warning w-[68%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Asia</span>
                    <span className="text-destructive font-semibold">Poor (142)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-destructive w-[85%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Africa</span>
                    <span className="text-success font-semibold">Good (38)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success w-[38%]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Temperature Trend */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>Temperature Trend (2025)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={temperatureData}>
                    <defs>
                      <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #0ea5e9',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#0ea5e9" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#tempGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* CO2 Emissions */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle>CO₂ Emissions (PPM)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={co2Data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" domain={[410, 430]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #0ea5e9',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ppm" 
                      stroke="#0ea5e9" 
                      strokeWidth={3}
                      dot={{ fill: '#0ea5e9', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
