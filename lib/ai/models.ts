import { openai } from '@ai-sdk/openai';
import { fireworks } from '@ai-sdk/fireworks';
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';

export const DEFAULT_CHAT_MODEL: string = 'helia-sun-shield';

export const myProvider = customProvider({
  languageModels: {
    'helia-sun-shield': openai('gpt-4o'),
    'helia-growth-ray': openai('gpt-4o'),
    'helia-sunbeam': openai('gpt-4o'),
    'helia-inner-dawn': openai('gpt-4o'),
    'title-model': openai('gpt-4-turbo'),
    'block-model': openai('gpt-4o-mini'),
  },
  imageModels: {
    'small-model': openai.image('dall-e-2'),
    'large-model': openai.image('dall-e-3'),
  },
});

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'helia-sun-shield',
    name: 'Helia Sun Shield 🛡️',
    description: 'Digital safety, cybersecurity, and online privacy expert',
  },
  {
    id: 'helia-growth-ray',
    name: 'Helia Growth Ray 💡',
    description: 'Emotional intelligence and personal development guide',
  },
  {
    id: 'helia-sunbeam',
    name: 'Helia Sunbeam 🗣️',
    description: 'Confidence, social skills, and relationship expert',
  },
  {
    id: 'helia-inner-dawn',
    name: 'Helia Inner Dawn 🧘',
    description: 'Mindfulness, meditation, and wellness guide',
  },
];
