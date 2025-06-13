import React, { useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Avatar,
  ListItemAvatar,
  Divider,
  Paper,
  InputBase,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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

  // Get first letter of email for avatar
  const getInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Search bar */}
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          m: 1,
          borderRadius: 20,
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search emails"
          inputProps={{ 'aria-label': 'search emails' }}
        />
      </Paper>

      <Divider sx={{ my: 1 }} />

      <List sx={{ overflow: 'auto', flexGrow: 1 }}>
        {emails.map((email) => (
          <React.Fragment key={email.id}>
            <ListItem
              button
              selected={selectedEmail?.id === email.id}
              onClick={() => handleEmailClick(email)}
              sx={{
                borderRadius: 1,
                mx: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                  }}
                >
                  {getInitial(email.to)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 'normal',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {email.subject}
                  </Typography>
                }
                secondary={
                  <Box component="span">
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {email.to}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {email.body.substring(0, 50)}...
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default EmailSidebar;
