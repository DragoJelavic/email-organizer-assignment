import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';

interface AIPromptModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (prompt: string) => Promise<void>;
}

export const AIPromptModal: React.FC<AIPromptModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      await onSubmit(prompt);
      setPrompt('');
      onClose();
    } catch (error) {
      console.error('AI Prompt Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEnforceFocus
      keepMounted={false}
    >
      <DialogTitle>AI Assistant</DialogTitle>
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
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !prompt.trim()}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
