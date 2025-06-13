import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import useEmailStore from '../../store/emailStore';

const EmailSidebar: React.FC = () => {
  const {
    emails,
    selectedEmail,
    fetchEmails,
    getEmail,
    setSelectedEmail,
  } = useEmailStore();

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  const handleEmailClick = async (email: any) => {
    setSelectedEmail(email);
    if (email.id) {
      await getEmail(email.id);
    }
  };

  return (
    <Box
      sx={{
        width: 300,
        borderRight: 1,
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <List>
        {emails.map((email) => (
          <ListItem
            key={email.id}
            button
            selected={selectedEmail?.id === email.id}
            onClick={() => handleEmailClick(email)}
          >
            <ListItemText
              primary={email.subject}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {email.to}
                  </Typography>
                  {' — '}
                  {new Date(
                    email.created_at || ''
                  ).toLocaleDateString()}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmailSidebar;
