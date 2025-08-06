import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, Brain, TrendingUp, Users, Palette } from "lucide-react";

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Should You Learn Graphic Design?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A Personal Readiness & Fit Assessment
          </p>
        </div>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          Discover if graphic design aligns with your interests, personality, learning style, and career goals. 
          Get personalized insights and a clear roadmap for your creative journey.
        </p>
      </div>

      {/* What is Graphic Design */}
      <Card className="border-primary/20 bg-gradient-subtle">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            What is Graphic Design?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/80">
            Graphic design is the practice of visual communication using tools like typography, color, 
            imagery, and layout. It spans across print, digital, web, UI, branding, and advertising.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Graphic Designer",
              "UI/UX Designer", 
              "Visual Content Creator",
              "Brand Designer",
              "Motion Graphics Artist",
              "Creative Director"
            ].map((career) => (
              <Badge key={career} variant="secondary" className="justify-center py-2">
                {career}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              What We'll Assess
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Interest & Natural Inclination</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Personality & Work Style</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Cognitive Abilities & Learning Style</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span>Motivation & Persistence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                <span>Technical Knowledge & Skills</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              You'll Discover
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span>Your design readiness score</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent" />
                <span>Best-fit design career paths</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>Personalized learning recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-warning" />
                <span>Clear next steps for your journey</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Details */}
      <Card className="bg-accent-soft/30 border-accent/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <div>
                <div className="font-semibold">20-30 minutes</div>
                <div className="text-sm text-muted-foreground">Total time</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">50+ Questions</div>
                <div className="text-sm text-muted-foreground">5 sections</div>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border"></div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-success" />
              <div>
                <div className="font-semibold">Science-based</div>
                <div className="text-sm text-muted-foreground">Validated methods</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="text-center">
        <Button 
          onClick={onStart}
          size="lg"
          className="px-12 py-4 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
        >
          Start Your Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          Free • No signup required • Get instant results
        </p>
      </div>
    </div>
  );
};