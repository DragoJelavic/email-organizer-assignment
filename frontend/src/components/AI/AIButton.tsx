import React, { useState } from 'react';
import { Button } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { AIPromptModal } from './AIPromptModal';

interface AIButtonProps {
  onGenerate: (prompt: string) => Promise<void>;
}

export const AIButton: React.FC<AIButtonProps> = ({ onGenerate }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AutoAwesome />}
        onClick={() => setModalOpen(true)}
        sx={{ mr: 1 }}
      >
        AI Assist
      </Button>

      <AIPromptModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={onGenerate}
      />
    </>
  );
};
