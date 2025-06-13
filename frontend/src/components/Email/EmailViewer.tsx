import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Divider,
  Avatar,
  Chip,
  Tooltip,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplyIcon from '@mui/icons-material/Reply';
import ForwardIcon from '@mui/icons-material/Forward';
import ArchiveIcon from '@mui/icons-material/Archive';
import useEmailStore from '../../store/emailStore';

interface EmailViewerProps {
  onEdit: () => void;
}

const EmailViewer: React.FC<EmailViewerProps> = ({ onEdit }) => {
  const { selectedEmail, deleteEmail } = useEmailStore();

  if (!selectedEmail) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Box
          component="img"
          src="/placeholder.svg?height=120&width=120"
          alt="No email selected"
          sx={{ width: 120, height: 120, opacity: 0.5, mb: 2 }}
        />
        <Typography variant="h6" color="text.secondary">
          Select an email to view
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Choose an email from the list to view its contents
        </Typography>
      </Box>
    );
  }

  const handleDelete = async () => {
    if (selectedEmail.id) {
      await deleteEmail(selectedEmail.id);
    }
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Card elevation={0} sx={{ mb: 2 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {selectedEmail.to.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={
            <Typography variant="h6" component="div">
              {selectedEmail.subject}
            </Typography>
          }
          subheader={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1,
                mt: 0.5,
              }}
            >
              <Chip
                label={`To: ${selectedEmail.to}`}
                size="small"
                variant="outlined"
              />
              <Typography variant="caption" color="text.secondary">
                {formatDate(selectedEmail.created_at || '')}
              </Typography>
            </Box>
          }
          action={
            <Box>
              <Tooltip title="Reply">
                <IconButton size="small" sx={{ mx: 0.5 }}>
                  <ReplyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Forward">
                <IconButton size="small" sx={{ mx: 0.5 }}>
                  <ForwardIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Archive">
                <IconButton size="small" sx={{ mx: 0.5 }}>
                  <ArchiveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton
                  onClick={onEdit}
                  size="small"
                  sx={{ mx: 0.5 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={handleDelete}
                  size="small"
                  color="error"
                  sx={{ mx: 0.5 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          }
        />
        <Divider />
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
            }}
          >
            {selectedEmail.body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmailViewer;
