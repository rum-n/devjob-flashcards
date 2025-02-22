import { useCallback, useState } from 'react';

export const useAIFeedback = () => {
  const [isLoading, setIsLoading] = useState(false);

  const evaluateExplanation = useCallback(async (explanation: string, correctAnswer: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ explanation, correctAnswer }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI feedback');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let result = '';

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        result += chunk;
      }

      return result;
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, there was an error evaluating your explanation.';
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, evaluateExplanation };
};