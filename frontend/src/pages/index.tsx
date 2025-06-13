import React, { useState } from 'react';
import { Box, Button, Container, Grid, Modal } from '@mui/material';
import EmailSidebar from '../components/Email/EmailSidebar';
import EmailViewer from '../components/Email/EmailViewer';
import ComposeForm from '../components/Email/ComposeForm';
import { useEmails } from '../hooks/useEmails';

const Home: React.FC = () => {
  const [isComposing, setIsComposing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { selectedEmail } = useEmails();

  const handleCompose = () => {
    setIsComposing(true);
  };

  const handleCloseCompose = () => {
    setIsComposing(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Container maxWidth={false} sx={{ height: '100vh', p: 0 }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid
          item
          xs={12}
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" onClick={handleCompose}>
            Compose
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ height: 'calc(100% - 64px)' }}>
          <Box sx={{ display: 'flex', height: '100%' }}>
            <EmailSidebar />
            <Box sx={{ flex: 1, height: '100%' }}>
              <EmailViewer onEdit={handleEdit} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={isComposing || isEditing}
        onClose={handleCloseCompose}
      >
        <Box
          sx={{
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <ComposeForm
            onClose={handleCloseCompose}
            initialEmail={isEditing ? selectedEmail : undefined}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;
