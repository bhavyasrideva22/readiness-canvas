import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreCard } from "@/components/ui/score-card";
import { AssessmentResult } from "@/types/assessment";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, BookOpen, Users, ArrowRight } from "lucide-react";

interface ResultsDashboardProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export const ResultsDashboard = ({ result, onRestart }: ResultsDashboardProps) => {
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes': return <CheckCircle className="h-6 w-6 text-success" />;
      case 'maybe': return <AlertCircle className="h-6 w-6 text-warning" />;
      case 'no': return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (result.recommendation) {
      case 'yes': return 'Yes, you should pursue Graphic Design!';
      case 'maybe': return 'Maybe - explore with caution';
      case 'no': return 'Consider alternative paths';
    }
  };

  const getRecommendationVariant = () => {
    switch (result.recommendation) {
      case 'yes': return 'success' as const;
      case 'maybe': return 'warning' as const;
      case 'no': return 'danger' as const;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Your Assessment Results</h1>
        <p className="text-lg text-muted-foreground">
          Based on your responses, here's your personalized graphic design readiness report
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className={`border-2 shadow-strong ${
        result.recommendation === 'yes' ? 'border-success bg-success-soft/20' :
        result.recommendation === 'maybe' ? 'border-warning bg-warning-soft/20' :
        'border-destructive bg-destructive/5'
      }`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-4 text-center">
            {getRecommendationIcon()}
            <div>
              <h2 className="text-2xl font-bold">{getRecommendationText()}</h2>
              <p className="text-lg text-muted-foreground mt-1">
                Overall Readiness Score: {result.overallScore}/100
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Scores */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Detailed Breakdown</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.sectionScores.map((score) => (
            <ScoreCard
              key={score.sectionId}
              title={score.sectionId.charAt(0).toUpperCase() + score.sectionId.slice(1)}
              score={score.score}
              maxScore={score.maxScore}
              description={score.interpretation}
              variant={score.score >= 80 ? 'success' : score.score >= 60 ? 'warning' : 'default'}
            />
          ))}
        </div>
      </div>

      {/* WISCAR Analysis */}
      <Card className="bg-gradient-subtle border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            WISCAR Framework Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(result.wiscarScore).map(([key, value]) => (
              <div key={key} className="text-center space-y-2">
                <div className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </div>
                <div className={`text-2xl font-bold ${
                  value >= 80 ? 'text-success' :
                  value >= 60 ? 'text-warning' :
                  value >= 40 ? 'text-accent' : 'text-destructive'
                }`}>
                  {value}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ${
                      value >= 80 ? 'bg-success' :
                      value >= 60 ? 'bg-warning' :
                      value >= 40 ? 'bg-accent' : 'bg-destructive'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Personalized Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{result.personalizedFeedback}</p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              Career Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.careerRecommendations.map((career, index) => (
                <Badge key={index} variant="secondary" className="mr-2 mb-2">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Path */}
      <Card className="bg-accent-soft/30 border-accent/20">
        <CardHeader>
          <CardTitle className="text-center">Your Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="text-lg font-medium bg-gradient-accent bg-clip-text text-transparent">
              {result.learningPath}
            </div>
            <p className="text-muted-foreground">
              This path is tailored to your current skill level and learning preferences
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button 
          onClick={onRestart}
          variant="outline"
          size="lg"
          className="px-8"
        >
          Retake Assessment
        </Button>
        <Button 
          size="lg"
          className="px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          Download Results
        </Button>
      </div>
    </div>
  );
};