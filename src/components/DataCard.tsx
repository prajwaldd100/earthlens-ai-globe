import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DataCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  children?: ReactNode;
}

const DataCard = ({ title, value, change, icon: Icon, trend = "neutral", children }: DataCardProps) => {
  const trendColor = 
    trend === "up" ? "text-success" : 
    trend === "down" ? "text-destructive" : 
    "text-muted-foreground";

  return (
    <Card className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:card-glow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-glow">{value}</div>
        {change && (
          <p className={`text-xs ${trendColor} mt-2`}>
            {change}
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

export default DataCard;
