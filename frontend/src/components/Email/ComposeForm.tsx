import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import useEmailStore from '../../store/emailStore';

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

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialEmail ? 'Edit Email' : 'Compose Email'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="To"
          name="to"
          type="email"
          value={formData.to}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Message"
          name="body"
          value={formData.body}
          onChange={handleChange}
          required
          multiline
          rows={6}
          margin="normal"
        />
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : null
            }
          >
            {initialEmail ? 'Update' : 'Send'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ComposeForm;
