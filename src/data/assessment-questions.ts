import { AssessmentSection } from "@/types/assessment";

export const assessmentSections: AssessmentSection[] = [
  {
    id: "interest",
    title: "Interest & Passion Assessment",
    description: "How naturally drawn are you to design and visual elements?",
    timeEstimate: 5,
    questions: [
      {
        id: "int_1",
        text: "How often do you notice design elements in products, apps, or websites?",
        type: "likert",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
        category: "interest",
        weight: 1.2
      },
      {
        id: "int_2", 
        text: "When you see poor design (confusing layouts, bad color choices), how does it affect you?",
        type: "likert",
        options: ["Doesn't bother me", "Slightly annoying", "Moderately frustrating", "Very bothersome", "Extremely frustrating"],
        category: "interest",
        weight: 1.0
      },
      {
        id: "int_3",
        text: "How curious are you about learning how visual things are made?",
        type: "likert", 
        options: ["Not curious", "Slightly curious", "Moderately curious", "Very curious", "Extremely curious"],
        category: "interest",
        weight: 1.1
      },
      {
        id: "int_4",
        text: "Do you follow design trends on social media or design websites?",
        type: "multiple-choice",
        options: ["Never", "Occasionally browse", "Sometimes save examples", "Regularly follow design accounts", "Actively engage with design content"],
        category: "interest"
      },
      {
        id: "int_5",
        text: "When creating presentations or documents, how much time do you spend on visual appearance?",
        type: "likert",
        options: ["Minimal - content only", "Basic formatting", "Moderate attention to visuals", "Significant time on design", "Extensive focus on visual appeal"],
        category: "interest"
      }
    ]
  },
  {
    id: "personality",
    title: "Personality & Work Style",
    description: "Understanding your personality traits that align with design careers.",
    timeEstimate: 6,
    questions: [
      {
        id: "pers_1",
        text: "How do you typically respond to creative criticism or feedback?",
        type: "multiple-choice",
        options: [
          "I get defensive and take it personally",
          "I listen but often disagree internally", 
          "I consider feedback but trust my own judgment",
          "I actively seek feedback and iterate based on it",
          "I thrive on feedback and see it as collaboration"
        ],
        category: "personality",
        framework: "big5",
        weight: 1.3
      },
      {
        id: "pers_2",
        text: "When working on a project, which scenario energizes you most?",
        type: "multiple-choice",
        options: [
          "Working alone with complete creative control",
          "Collaborating with one trusted partner", 
          "Working in a small creative team",
          "Leading a larger team through the creative process",
          "Being part of a large collaborative effort"
        ],
        category: "personality",
        framework: "big5"
      },
      {
        id: "pers_3",
        text: "How comfortable are you with ambiguous creative briefs or open-ended projects?",
        type: "likert",
        options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"],
        category: "personality",
        framework: "big5"
      },
      {
        id: "pers_4",
        text: "When you have multiple creative ideas, what's your typical approach?",
        type: "multiple-choice",
        options: [
          "I stick with my first good idea",
          "I develop 2-3 options and pick the best",
          "I explore many possibilities before deciding",
          "I create multiple versions and get feedback",
          "I iterate constantly, even after 'finishing'"
        ],
        category: "personality",
        framework: "big5"
      },
      {
        id: "pers_5",
        text: "How detail-oriented are you in your work?",
        type: "likert",
        options: ["Focus on big picture only", "Some attention to details", "Balance of both", "Very detail-focused", "Perfectionist with details"],
        category: "personality",
        framework: "big5",
        weight: 1.2
      }
    ]
  },
  {
    id: "cognitive",
    title: "Cognitive Style & Aptitude", 
    description: "Testing your visual-spatial reasoning and design thinking abilities.",
    timeEstimate: 8,
    questions: [
      {
        id: "cog_1",
        text: "When you look at this pattern: ●○●○●○, what comes next?",
        type: "multiple-choice",
        options: ["●", "○", "●●", "○○", "The pattern restarts"],
        category: "cognitive"
      },
      {
        id: "cog_2",
        text: "If you rotate a triangle 90° clockwise, which direction does the point that was facing up now face?",
        type: "multiple-choice", 
        options: ["Up", "Right", "Down", "Left", "It depends on the triangle"],
        category: "cognitive"
      },
      {
        id: "cog_3",
        text: "Which learning style best describes you?",
        type: "multiple-choice",
        options: [
          "I learn best by reading instructions",
          "I prefer listening to explanations",
          "I need to see visual examples and diagrams", 
          "I learn by doing and experimenting",
          "I combine multiple approaches"
        ],
        category: "cognitive"
      },
      {
        id: "cog_4",
        text: "When solving problems, which approach do you prefer?",
        type: "multiple-choice",
        options: [
          "Step-by-step logical analysis",
          "Intuitive, big-picture thinking",
          "Trial and error experimentation",
          "Research similar solutions first",
          "Brainstorm multiple approaches"
        ],
        category: "cognitive"
      },
      {
        id: "cog_5",
        text: "How well can you visualize 3D objects in your mind?",
        type: "likert",
        options: ["Very difficult", "Somewhat difficult", "Average", "Pretty good", "Excellent"],
        category: "cognitive",
        weight: 1.2
      }
    ]
  },
  {
    id: "motivation", 
    title: "Motivation & Goals",
    description: "Understanding what drives your interest in design and your learning persistence.",
    timeEstimate: 5,
    questions: [
      {
        id: "mot_1",
        text: "What primarily motivates your interest in graphic design?",
        type: "multiple-choice",
        options: [
          "Creative self-expression and artistic fulfillment",
          "Career opportunities and job security",
          "Flexible work options and freelancing",
          "Making visual impact and solving problems",
          "Building a portfolio and personal brand"
        ],
        category: "motivation",
        framework: "growth-mindset"
      },
      {
        id: "mot_2",
        text: "When learning something challenging, how long do you typically persist?",
        type: "multiple-choice",
        options: [
          "I give up quickly if it's too hard",
          "I try a few times then move on",
          "I persist for days or weeks",
          "I keep trying for months if needed", 
          "I persist until I master it, no matter how long"
        ],
        category: "motivation",
        framework: "grit",
        weight: 1.3
      },
      {
        id: "mot_3",
        text: "How do you view creative 'failures' or designs that don't work?",
        type: "multiple-choice",
        options: [
          "As proof I'm not good at this",
          "As frustrating setbacks",
          "As normal parts of the process",
          "As valuable learning opportunities",
          "As stepping stones to better solutions"
        ],
        category: "motivation", 
        framework: "growth-mindset",
        weight: 1.2
      },
      {
        id: "mot_4",
        text: "What's your ideal work environment for creative tasks?",
        type: "multiple-choice",
        options: [
          "Quiet, private space with minimal distractions",
          "Coffee shop or casual environment with background noise",
          "Collaborative workspace with other creatives",
          "Home office with personal control over environment",
          "Varies depending on the project and my mood"
        ],
        category: "motivation"
      }
    ]
  },
  {
    id: "technical",
    title: "Technical Knowledge & Skills",
    description: "Assessing your current understanding of design principles and tools.",
    timeEstimate: 6,
    questions: [
      {
        id: "tech_1",
        text: "Which of these is a fundamental principle of good design?",
        type: "multiple-choice",
        options: [
          "Using as many colors as possible",
          "Creating visual hierarchy through contrast",
          "Making text as small as possible to fit more content",
          "Using different fonts for each element",
          "Centering everything on the page"
        ],
        category: "technical"
      },
      {
        id: "tech_2",
        text: "What does 'white space' (or negative space) refer to in design?",
        type: "multiple-choice",
        options: [
          "Space that must be colored white",
          "Mistakes or empty areas that need to be filled",
          "Empty space around and between design elements",
          "The background color of a design",
          "Space reserved for text only"
        ],
        category: "technical"
      },
      {
        id: "tech_3", 
        text: "Which tool would be BEST for creating a company logo?",
        type: "multiple-choice",
        options: [
          "Microsoft PowerPoint",
          "Adobe Photoshop",
          "Adobe Illustrator", 
          "Canva",
          "Microsoft Paint"
        ],
        category: "technical"
      },
      {
        id: "tech_4",
        text: "What's the difference between RGB and CMYK color modes?",
        type: "multiple-choice",
        options: [
          "RGB is for print, CMYK is for screens",
          "RGB is for screens, CMYK is for print",
          "They're the same thing with different names",
          "RGB has more colors, CMYK has fewer",
          "CMYK is newer and better than RGB"
        ],
        category: "technical"
      },
      {
        id: "tech_5",
        text: "How familiar are you with design software?",
        type: "multiple-choice",
        options: [
          "I've never used any design software",
          "I've tried basic tools like Canva or PowerPoint",
          "I have some experience with Adobe or similar tools",
          "I'm comfortable with multiple design programs",
          "I'm proficient in professional design software"
        ],
        category: "technical",
        weight: 1.1
      }
    ]
  }
];

export const wiscarQuestions = [
  {
    id: "wiscar_will_1",
    text: "Describe a time you kept improving a creative piece over days or weeks, even when others thought it was 'good enough'.",
    type: "scenario" as const,
    category: "wiscar" as const,
    framework: "grit"
  },
  {
    id: "wiscar_interest_2", 
    text: "You follow design trends on social media and actively engage with design content.",
    type: "likert" as const,
    options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    category: "wiscar" as const
  },
  {
    id: "wiscar_realworld_1",
    text: "How would you feel about editing 30 similar design assets with tight deadlines?",
    type: "multiple-choice" as const,
    options: [
      "Overwhelmed and stressed",
      "Manageable but not enjoyable", 
      "Challenging but doable",
      "Energizing production work",
      "Thriving in fast-paced environment"
    ],
    category: "wiscar" as const
  }
];