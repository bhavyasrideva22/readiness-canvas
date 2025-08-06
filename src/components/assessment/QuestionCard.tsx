import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Question, UserResponse } from "@/types/assessment";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (response: UserResponse) => void;
  currentResponse?: UserResponse;
}

export const QuestionCard = ({ 
  question, 
  questionNumber, 
  totalQuestions, 
  onAnswer, 
  currentResponse 
}: QuestionCardProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    currentResponse?.value?.toString() || ""
  );
  const [textValue, setTextValue] = useState<string>(
    currentResponse?.value?.toString() || ""
  );

  const handleSubmit = () => {
    const value = question.type === 'scenario' ? textValue : selectedValue;
    if (!value) return;

    onAnswer({
      questionId: question.id,
      value: question.type === 'likert' || question.type === 'multiple-choice' 
        ? parseInt(value) : value,
      timestamp: new Date()
    });
  };

  const isAnswered = question.type === 'scenario' ? textValue.length > 10 : selectedValue !== "";

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium border-border/50">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
          </span>
        </div>
        <CardTitle className="text-xl leading-relaxed">{question.text}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'scenario' ? (
          <div className="space-y-3">
            <Label htmlFor="scenario-response" className="text-base font-medium">
              Your response:
            </Label>
            <Textarea
              id="scenario-response"
              placeholder="Share your experience or thoughts..."
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              Minimum 10 characters ({textValue.length}/10)
            </p>
          </div>
        ) : (
          <RadioGroup
            value={selectedValue}
            onValueChange={setSelectedValue}
            className="space-y-3"
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-start space-x-3 group">
                <RadioGroupItem 
                  value={index.toString()} 
                  id={`option-${index}`}
                  className="mt-1"
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className={cn(
                    "text-base leading-relaxed cursor-pointer transition-colors group-hover:text-primary",
                    selectedValue === index.toString() && "text-primary font-medium"
                  )}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit}
            disabled={!isAnswered}
            className="px-8 py-2 bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {questionNumber === totalQuestions ? "Complete Assessment" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};