import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface AIPromptModalProps {
  open: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => Promise<void>;
}

export const AIPromptModal: React.FC<AIPromptModalProps> = ({
  open,
  onClose,
  onGenerate,
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async () => {
    if (prompt.trim()) {
      await onGenerate(prompt);
      setPrompt('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>AI Email Assistant</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="What kind of email would you like to write?"
          fullWidth
          multiline
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Write a follow-up email to a potential client about our meeting last week"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Generate
        </Button>
      </DialogActions>
    </Dialog>
  );
};
