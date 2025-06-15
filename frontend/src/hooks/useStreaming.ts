import { useState } from 'react';
import api from '../lib/api';

interface StreamingResponse {
  field: 'subject' | 'body';
  content: string;
}

export const useStreaming = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const streamResponse = async (
    prompt: string,
    onChunk: (response: StreamingResponse) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${api.defaults.baseURL}/ai/classify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to stream response');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Failed to get response reader');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.field && data.content) {
                onChunk(data);
              }
            } catch (e) {
              console.error('Failed to parse streaming data:', e);
            }
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to stream response';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    streamResponse,
  };
};
