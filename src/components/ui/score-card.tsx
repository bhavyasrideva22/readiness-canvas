import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  description?: string;
  className?: string;
  variant?: "default" | "success" | "warning" | "danger";
}

export const ScoreCard = ({ 
  title, 
  score, 
  maxScore = 100, 
  description, 
  className,
  variant = "default" 
}: ScoreCardProps) => {
  const percentage = (score / maxScore) * 100;
  
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-soft/30";
      case "warning":
        return "border-warning/20 bg-warning-soft/30";
      case "danger":
        return "border-destructive/20 bg-destructive/5";
      default:
        return "border-primary/20 bg-gradient-subtle";
    }
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    if (percentage >= 40) return "text-accent";
    return "text-destructive";
  };

  return (
    <Card className={cn("transition-all duration-300 hover:shadow-medium", getVariantStyles(), className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between mb-3">
          <span className={cn("text-3xl font-bold", getScoreColor())}>
            {score}
          </span>
          <span className="text-sm text-muted-foreground">/ {maxScore}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-700 ease-out",
              percentage >= 80 ? "bg-success" :
              percentage >= 60 ? "bg-warning" :
              percentage >= 40 ? "bg-accent" : "bg-destructive"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};