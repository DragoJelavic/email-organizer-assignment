import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import useEmailStore from '../../store/emailStore';
import { AIButton } from '../AI/AIButton';
import { useAI } from '../../hooks/useAI';
import { useStreaming } from '../../hooks/useStreaming';

interface ComposeFormProps {
  onClose: () => void;
  initialEmail?: {
    id?: number;
    to: string;
    subject: string;
    body: string;
  };
}

const ComposeForm: React.FC<ComposeFormProps> = ({
  onClose,
  initialEmail,
}) => {
  const { createEmail, updateEmail } = useEmailStore();
  const { classifyIntent } = useAI();
  const { streamResponse, loading: streamingLoading } =
    useStreaming();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    to: initialEmail?.to || '',
    subject: initialEmail?.subject || '',
    body: initialEmail?.body || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialEmail?.id) {
        await updateEmail(initialEmail.id, formData);
      } else {
        await createEmail(formData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to save email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAIGenerate = async (prompt: string) => {
    try {
      let currentSubject = '';
      let currentBody = '';

      await streamResponse(prompt, (response) => {
        if (response.field === 'subject') {
          currentSubject = response.content;
          setFormData((prev) => ({
            ...prev,
            subject: currentSubject,
          }));
        } else if (response.field === 'body') {
          currentBody = response.content;
          setFormData((prev) => ({ ...prev, body: currentBody }));
        }
      });
    } catch (error) {
      console.error('Error generating email:', error);
      // Handle error appropriately
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%' }}
    >
      <TextField
        fullWidth
        label="To"
        name="to"
        type="email"
        value={formData.to}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                To:
              </Typography>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                Subject:
              </Typography>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}
      >
        <IconButton size="small">
          <FormatBoldIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <FormatItalicIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <FormatUnderlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <FormatListBulletedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <AttachFileIcon fontSize="small" />
        </IconButton>
        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
        <AIButton
          onGenerate={handleAIGenerate}
          loading={streamingLoading}
        />
      </Box>

      <TextField
        fullWidth
        name="body"
        value={formData.body}
        onChange={handleChange}
        required
        multiline
        rows={12}
        margin="normal"
        variant="outlined"
        placeholder="Write your message here..."
        sx={{ mb: 3 }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<AttachFileIcon />}
          sx={{ borderRadius: 28 }}
        >
          Attach
        </Button>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={onClose}
            disabled={loading}
            variant="outlined"
            sx={{ borderRadius: 28 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : null
            }
            sx={{
              borderRadius: 28,
              px: 3,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            {initialEmail ? 'Update' : 'Send'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ComposeForm;
