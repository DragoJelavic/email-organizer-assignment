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
      const result = await classifyIntent(prompt);

      // Update form based on AI classification
      if (result.type === 'SALES') {
        setFormData((prev) => ({
          ...prev,
          subject: 'Business Opportunity',
          body: `I hope this email finds you well. I'm reaching out because I believe our services could be valuable to your business. Would you be open to a brief conversation about how we might help you achieve your goals?`,
        }));
      } else if (result.type === 'FOLLOWUP') {
        setFormData((prev) => ({
          ...prev,
          subject: 'Following Up',
          body: `I hope you're doing well. I wanted to follow up on our previous conversation. Would you have some time to discuss this further?`,
        }));
      } else {
        // For OTHER type, we'll just use the prompt as the body
        setFormData((prev) => ({
          ...prev,
          body: prompt,
        }));
      }
    } catch (error) {
      console.error('AI Generation Error:', error);
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
        <AIButton onGenerate={handleAIGenerate} />
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
