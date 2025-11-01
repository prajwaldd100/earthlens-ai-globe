import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Brain, Send, Sparkles, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIInsights = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI environmental analyst. I can help you understand global climate trends, analyze environmental data, and answer questions about Earth's health. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-insights', {
        body: { message: userMessage }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response 
      }]);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-glow mb-2">AI Insights</h1>
            <p className="text-muted-foreground">Ask questions about environmental data and get AI-powered answers</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <Card className="lg:col-span-2 glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Chat with AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Messages */}
                <div className="h-[500px] overflow-y-auto space-y-4 pr-4">
                  {messages.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 ${
                          msg.role === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'glass-card border border-border/50'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="glass-card border border-border/50 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about environmental trends..."
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !input.trim()}
                    size="icon"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Questions */}
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleQuickQuestion("Which region had the highest air pollution this week?")}
                  >
                    Which region had highest air pollution?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleQuickQuestion("What are the current CO₂ emission trends?")}
                  >
                    Current CO₂ emission trends?
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleQuickQuestion("How is deforestation affecting global temperatures?")}
                  >
                    Deforestation impact on temperature?
                  </Button>
                </CardContent>
              </Card>

              {/* Daily Insights */}
              <Card className="glass-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Today's Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-warning mt-0.5" />
                    <p className="text-muted-foreground">
                      Arctic ice melt accelerated by 12% this month
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                    <p className="text-muted-foreground">
                      Renewable energy adoption increased in Europe
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-destructive mt-0.5" />
                    <p className="text-muted-foreground">
                      Amazon deforestation rates remain critical
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIInsights;
