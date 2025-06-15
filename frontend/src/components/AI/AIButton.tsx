import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { AutoAwesome, SmartToy } from '@mui/icons-material';
import { AIPromptModal } from './AIPromptModal';

interface AIButtonProps {
  onGenerate: (prompt: string) => Promise<void>;
  loading?: boolean;
}

export const AIButton: React.FC<AIButtonProps> = ({
  onGenerate,
  loading = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={loading}
        color="primary"
        title="AI Assist"
      >
        <SmartToy />
      </IconButton>

      <AIPromptModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onGenerate={onGenerate}
      />
    </>
  );
};
