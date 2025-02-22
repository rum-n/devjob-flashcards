import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { explanation, correctAnswer } = await req.json();

  const result = streamText({
    model: openai('gpt-3.5-turbo'),
    messages: [
      {
        role: 'system',
        content: 'You are evaluating a student\'s verbal explanation of a technical concept. Provide brief, constructive feedback on their explanation\'s accuracy and completeness.'
      },
      {
        role: 'user',
        content: `Correct answer: ${correctAnswer}\nStudent's explanation: ${explanation}\nProvide feedback on the accuracy and completeness of the explanation.`
      }
    ],
  });

  return result.toDataStreamResponse();
}