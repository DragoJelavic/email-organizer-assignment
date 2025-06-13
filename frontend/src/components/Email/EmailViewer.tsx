import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useEmailStore from '../../store/emailStore';

interface EmailViewerProps {
  onEdit: () => void;
}

const EmailViewer: React.FC<EmailViewerProps> = ({ onEdit }) => {
  const { selectedEmail, deleteEmail } = useEmailStore();

  if (!selectedEmail) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Select an email to view
        </Typography>
      </Box>
    );
  }

  const handleDelete = async () => {
    if (selectedEmail.id) {
      await deleteEmail(selectedEmail.id);
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h5">
            {selectedEmail.subject}
          </Typography>
          <Box>
            <IconButton onClick={onEdit} size="small">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
        >
          To: {selectedEmail.to}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, whiteSpace: 'pre-wrap' }}
        >
          {selectedEmail.body}
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmailViewer;
