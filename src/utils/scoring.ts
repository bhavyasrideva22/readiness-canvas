import { UserResponse, SectionScore, WISCARScore, AssessmentResult } from "@/types/assessment";
import { assessmentSections } from "@/data/assessment-questions";

export function calculateSectionScore(sectionId: string, responses: UserResponse[]): SectionScore {
  const section = assessmentSections.find(s => s.id === sectionId);
  if (!section) throw new Error(`Section ${sectionId} not found`);

  const sectionResponses = responses.filter(r => 
    section.questions.some(q => q.id === r.questionId)
  );

  let totalScore = 0;
  let maxPossibleScore = 0;

  section.questions.forEach(question => {
    const response = sectionResponses.find(r => r.questionId === question.id);
    if (response && typeof response.value === 'number') {
      const weight = question.weight || 1;
      const questionScore = response.value * weight;
      const maxQuestionScore = (question.options?.length || 5) * weight;
      
      totalScore += questionScore;
      maxPossibleScore += maxQuestionScore;
    }
  });

  const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);
  
  return {
    sectionId,
    score: normalizedScore,
    maxScore: 100,
    interpretation: getScoreInterpretation(normalizedScore, sectionId)
  };
}

export function calculateWISCARScore(responses: UserResponse[]): WISCARScore {
  // This is a simplified WISCAR calculation
  // In a real implementation, you'd have more sophisticated mapping
  
  const interestResponses = responses.filter(r => r.questionId.includes('int_'));
  const personalityResponses = responses.filter(r => r.questionId.includes('pers_'));
  const cognitiveResponses = responses.filter(r => r.questionId.includes('cog_'));
  const motivationResponses = responses.filter(r => r.questionId.includes('mot_'));
  const technicalResponses = responses.filter(r => r.questionId.includes('tech_'));

  const calculateAverage = (responses: UserResponse[]) => {
    if (responses.length === 0) return 0;
    const sum = responses.reduce((acc, r) => acc + (typeof r.value === 'number' ? r.value * 20 : 0), 0);
    return Math.round(sum / responses.length);
  };

  return {
    will: calculateAverage(motivationResponses), // Persistence/Grit
    interest: calculateAverage(interestResponses), // Natural inclination
    skill: calculateAverage(technicalResponses), // Current abilities
    cognitive: calculateAverage(cognitiveResponses), // Learning capacity
    ability: Math.round((calculateAverage(personalityResponses) + calculateAverage(cognitiveResponses)) / 2), // Trainability
    realWorld: Math.round((calculateAverage(personalityResponses) + calculateAverage(technicalResponses)) / 2) // Job fit
  };
}

export function generateAssessmentResult(responses: UserResponse[]): AssessmentResult {
  const sectionScores = assessmentSections.map(section => 
    calculateSectionScore(section.id, responses)
  );
  
  const wiscarScore = calculateWISCARScore(responses);
  
  const overallScore = Math.round(
    sectionScores.reduce((acc, score) => acc + score.score, 0) / sectionScores.length
  );

  const recommendation = getOverallRecommendation(overallScore, wiscarScore);
  const personalizedFeedback = generatePersonalizedFeedback(sectionScores, wiscarScore, recommendation);
  const nextSteps = generateNextSteps(recommendation, sectionScores);
  const careerRecommendations = generateCareerRecommendations(sectionScores, wiscarScore);
  const learningPath = generateLearningPath(recommendation, sectionScores);

  return {
    sectionScores,
    wiscarScore,
    overallScore,
    recommendation,
    personalizedFeedback,
    nextSteps,
    careerRecommendations,
    learningPath,
    completedAt: new Date()
  };
}

function getScoreInterpretation(score: number, sectionId: string): string {
  const interpretations = {
    interest: {
      high: "You show strong natural interest in design elements and visual communication",
      medium: "You have moderate interest in design with room to grow",
      low: "Design interest appears limited - consider exploring related fields"
    },
    personality: {
      high: "Your personality traits align well with successful designers",
      medium: "Good personality fit with some areas for development",
      low: "Some personality traits may challenge design work - consider support strategies"
    },
    cognitive: {
      high: "Excellent visual-spatial abilities and design thinking skills",
      medium: "Good cognitive abilities with potential for development",
      low: "May need extra practice with visual-spatial reasoning"
    },
    motivation: {
      high: "Strong motivation and persistence for creative work",
      medium: "Good motivation with opportunity to strengthen persistence",
      low: "Consider what would increase your motivation for design work"
    },
    technical: {
      high: "Strong foundation in design principles and tools",
      medium: "Good basic knowledge with room for technical growth",
      low: "Would benefit from fundamental design education"
    }
  };

  const category = interpretations[sectionId as keyof typeof interpretations];
  if (score >= 75) return category.high;
  if (score >= 50) return category.medium;
  return category.low;
}

function getOverallRecommendation(overallScore: number, wiscar: WISCARScore): 'yes' | 'maybe' | 'no' {
  // Strong recommendation criteria
  if (overallScore >= 75 && wiscar.interest >= 70 && wiscar.will >= 60) {
    return 'yes';
  }
  
  // Weak recommendation criteria
  if (overallScore < 50 || wiscar.interest < 40 || wiscar.will < 30) {
    return 'no';
  }
  
  return 'maybe';
}

function generatePersonalizedFeedback(scores: SectionScore[], wiscar: WISCARScore, recommendation: string): string {
  const strengths = scores.filter(s => s.score >= 70).map(s => s.sectionId);
  const weaknesses = scores.filter(s => s.score < 50).map(s => s.sectionId);
  
  let feedback = "";
  
  if (recommendation === 'yes') {
    feedback = `You show strong potential for graphic design success! Your strongest areas are ${strengths.join(', ')}. `;
    if (weaknesses.length > 0) {
      feedback += `Focus on developing your ${weaknesses.join(' and ')} skills to maximize your potential.`;
    } else {
      feedback += "You have a well-rounded profile that aligns excellently with design careers.";
    }
  } else if (recommendation === 'maybe') {
    feedback = "You have some good foundations for graphic design, but there are areas that need attention. ";
    if (wiscar.interest >= 60) {
      feedback += "Your interest level is promising. ";
    }
    if (weaknesses.length > 0) {
      feedback += `Consider strengthening your ${weaknesses.join(' and ')} before committing fully to design studies.`;
    }
  } else {
    feedback = "Based on your responses, graphic design may not be the best fit for you right now. ";
    if (wiscar.interest < 50) {
      feedback += "Your interest level suggests you might find more fulfillment in other fields. ";
    }
    feedback += "Consider exploring related creative fields or developing foundational skills before revisiting design.";
  }
  
  return feedback;
}

function generateNextSteps(recommendation: string, scores: SectionScore[]): string[] {
  const steps = [];
  
  if (recommendation === 'yes') {
    steps.push("Start with basic design principles course (typography, color theory, layout)");
    steps.push("Learn industry-standard tools: Figma, Adobe Creative Suite");
    steps.push("Build a portfolio with 3-5 personal projects");
    steps.push("Join design communities (Dribbble, Behance, Design Twitter)");
    steps.push("Consider specializing in UI/UX, branding, or print design");
  } else if (recommendation === 'maybe') {
    steps.push("Take a beginner design fundamentals course");
    steps.push("Experiment with free tools like Canva and Figma");
    steps.push("Complete design challenges to test your interest");
    steps.push("Shadow a designer or take informational interviews");
    steps.push("Reassess after 3-6 months of exploration");
  } else {
    steps.push("Explore adjacent creative fields (content strategy, marketing)");
    steps.push("Develop visual literacy through design appreciation");
    steps.push("Consider design thinking for problem-solving in other fields");
    steps.push("Focus on your stronger areas of interest and aptitude");
  }
  
  return steps;
}

function generateCareerRecommendations(scores: SectionScore[], wiscar: WISCARScore): string[] {
  const careers = [];
  
  const technicalScore = scores.find(s => s.sectionId === 'technical')?.score || 0;
  const cognitiveScore = scores.find(s => s.sectionId === 'cognitive')?.score || 0;
  const personalityScore = scores.find(s => s.sectionId === 'personality')?.score || 0;
  
  if (technicalScore >= 70 && cognitiveScore >= 70) {
    careers.push("UI/UX Designer", "Web Designer");
  }
  
  if (personalityScore >= 70 && wiscar.interest >= 70) {
    careers.push("Brand Designer", "Creative Director");
  }
  
  if (cognitiveScore >= 60) {
    careers.push("Graphic Designer", "Visual Content Creator");
  }
  
  if (careers.length === 0) {
    careers.push("Design Assistant", "Marketing Coordinator", "Content Strategist");
  }
  
  return careers;
}

function generateLearningPath(recommendation: string, scores: SectionScore[]): string {
  if (recommendation === 'yes') {
    return "Professional Track: 6-12 month intensive program → Portfolio development → Job placement";
  } else if (recommendation === 'maybe') {
    return "Exploration Track: 3-6 month fundamentals → Assessment → Decide on continuation";
  } else {
    return "Alternative Path: Focus on complementary skills in related creative fields";
  }
}