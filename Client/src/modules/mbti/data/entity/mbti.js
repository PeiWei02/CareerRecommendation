import { mbtiAsset } from "../../view/asset";

export const mbtiResult = {
    I: {
      name: 'Introversion',
      description: 'Introversion - Focus on the inner world of thoughts and nameeas.',
      cognitiveFunction: 'Dominant: Introverted Intuition (Ni)',
      strengths: 'Reflective, independent, and deep thinker.',
      weaknesses: 'May struggle with expressing thoughts outwardly.',
      interaction: 'Prefers one-on-one conversations and thoughtful exchanges.',
      animation: mbtiAsset.introvert
    },
    E: {
      name: 'Extraversion',
      description: 'Extraversion - Focus on the outer world of people and activities.',
      cognitiveFunction: 'Dominant: Extraverted Thinking (Te)',
      strengths: 'Sociable, energetic, and action-oriented.',
      weaknesses: 'Can sometimes overlook personal reflection and introspection.',
      interaction: 'Prefers group discussions and brainstorming in teams.',
      animation: mbtiAsset.extrovert
    },
    S: {
      name: 'Sensing',
      description: 'Sensing - Focus on the present and concrete information gained from the senses.',
      cognitiveFunction: 'Auxiliary: Extraverted Sensing (Se)',
      strengths: 'Detail-oriented, practical, and grounded in reality.',
      weaknesses: 'May struggle with abstract or theoretical concepts.',
      interaction: 'Prefers hands-on tasks and direct communication.',
      animation: mbtiAsset.sensing
    },
    N: {
      name: 'Intuition',
      description: 'Intuition - Focus on future possibilities and abstract concepts.',
      cognitiveFunction: 'Auxiliary: Introverted Intuition (Ni)',
      strengths: 'Imaginative, visionary, and future-focused.',
      weaknesses: 'May overlook practical details and focus too much on big nameeas.',
      interaction: 'Enjoys brainstorming and exploring theoretical nameeas.',
      animation: mbtiAsset.intuition
    },
    T: {
      name: 'Thinking',
      description: 'Thinking - Making decisions based on logic and objective criteria.',
      cognitiveFunction: 'Dominant: Introverted Thinking (Ti)',
      strengths: 'Logical, analytical, and focused on objectivity.',
      weaknesses: 'May appear insensitive or overly critical.',
      interaction: 'Prefers fact-based discussions and problem-solving.',
      animation: mbtiAsset.thinking
    },
    F: {
      name: 'Feeling',
      description: 'Feeling - Making decisions based on personal values and how actions affect others.',
      cognitiveFunction: 'Dominant: Extraverted Feeling (Fe)',
      strengths: 'Empathetic, compassionate, and relationship-focused.',
      weaknesses: 'Can be overly concerned with others’ approval or harmony.',
      interaction: 'Values emotional connections and harmony in conversations.',
      animation: mbtiAsset.feeling
    },
    J: {
      name: 'Judging',
      description: 'Judging - Preferring a planned, organized approach to life.',
      cognitiveFunction: 'Auxiliary: Extraverted Judging (Te/Fe)',
      strengths: 'Organized, decisive, and goal-oriented.',
      weaknesses: 'May struggle with adapting to last-minute changes.',
      interaction: 'Prefers structured environments and clear plans in teams.',
      animation: mbtiAsset.judging
    },
    P: {
      name: 'Perceiving',
      description: 'Perceiving - Preferring a flexible and spontaneous approach to life.',
      cognitiveFunction: 'Auxiliary: Introverted Perceiving (Ti/Fi)',
      strengths: 'Adaptable, spontaneous, and open-minded.',
      weaknesses: 'May struggle with sticking to plans or deadlines.',
      interaction: 'Thrives in flexible environments and enjoys exploring new nameeas.',
      animation: mbtiAsset.perceiving
    }
  };