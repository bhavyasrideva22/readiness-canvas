import { useState, useCallback } from "react";
import { AssessmentState, UserResponse, AssessmentResult } from "@/types/assessment";
import { assessmentSections } from "@/data/assessment-questions";
import { generateAssessmentResult } from "@/utils/scoring";

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    isComplete: false
  });

  const currentSection = assessmentSections[state.currentSection];
  const currentQuestion = currentSection?.questions[state.currentQuestion];
  const totalQuestions = assessmentSections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = state.responses.length;

  const addResponse = useCallback((response: UserResponse) => {
    setState(prev => {
      const newResponses = [
        ...prev.responses.filter(r => r.questionId !== response.questionId),
        response
      ];

      const newState = { ...prev, responses: newResponses };

      // Move to next question
      if (prev.currentQuestion < currentSection.questions.length - 1) {
        newState.currentQuestion = prev.currentQuestion + 1;
      } else if (prev.currentSection < assessmentSections.length - 1) {
        newState.currentSection = prev.currentSection + 1;
        newState.currentQuestion = 0;
      } else {
        // Assessment complete
        newState.isComplete = true;
        newState.result = generateAssessmentResult(newResponses);
      }

      return newState;
    });
  }, [currentSection]);

  const goToQuestion = useCallback((sectionIndex: number, questionIndex: number) => {
    setState(prev => ({
      ...prev,
      currentSection: sectionIndex,
      currentQuestion: questionIndex
    }));
  }, []);

  const restart = useCallback(() => {
    setState({
      currentSection: 0,
      currentQuestion: 0,
      responses: [],
      isComplete: false
    });
  }, []);

  const getCurrentResponse = useCallback(() => {
    if (!currentQuestion) return undefined;
    return state.responses.find(r => r.questionId === currentQuestion.id);
  }, [currentQuestion, state.responses]);

  return {
    state,
    currentSection,
    currentQuestion,
    totalQuestions,
    answeredQuestions,
    addResponse,
    goToQuestion,
    restart,
    getCurrentResponse,
    progress: (answeredQuestions / totalQuestions) * 100
  };
};