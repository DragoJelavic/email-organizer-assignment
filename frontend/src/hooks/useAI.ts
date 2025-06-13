import { useState } from 'react';
import api from '../lib/api';
import { AIResponse } from '../types/ai';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classifyIntent = async (
    prompt: string
  ): Promise<AIResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<AIResponse>('/ai/classify', {
        prompt,
      });
      return response.data;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to classify intent';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    classifyIntent,
  };
};
