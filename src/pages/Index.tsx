import { useState } from "react";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ResultsDashboard } from "@/components/assessment/ResultsDashboard";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { useAssessment } from "@/hooks/useAssessment";
import heroImage from "@/assets/hero-design.jpg";

const Index = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const {
    state,
    currentSection,
    currentQuestion,
    totalQuestions,
    answeredQuestions,
    addResponse,
    restart,
    getCurrentResponse
  } = useAssessment();

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleRestart = () => {
    restart();
    setHasStarted(false);
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-10 container mx-auto px-4 py-12">
          <AssessmentIntro onStart={handleStart} />
        </div>
      </div>
    );
  }

  if (state.isComplete && state.result) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="container mx-auto px-4 py-12">
          <ResultsDashboard result={state.result} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  if (!currentQuestion || !currentSection) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {currentSection.title}
            </h1>
            <p className="text-muted-foreground">
              {currentSection.description}
            </p>
          </div>
          
          <ProgressIndicator 
            currentStep={answeredQuestions + 1}
            totalSteps={totalQuestions}
          />
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          questionNumber={answeredQuestions + 1}
          totalQuestions={totalQuestions}
          onAnswer={addResponse}
          currentResponse={getCurrentResponse()}
        />
      </div>
    </div>
  );
};

export default Index;
