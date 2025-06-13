import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailSidebar from '../components/Email/EmailSidebar';
import EmailViewer from '../components/Email/EmailViewer';
import ComposeForm from '../components/Email/ComposeForm';
import { useEmails } from '../hooks/useEmails';

const Home: React.FC = () => {
  const [isComposing, setIsComposing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { selectedEmail, fetchEmails } = useEmails();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const handleCompose = () => {
    setIsComposing(true);
  };

  const handleCloseCompose = () => {
    setIsComposing(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsComposing(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* App Bar */}
      <AppBar
        position="static"
        color="default"
        elevation={1}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <EmailIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Email Client
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCompose}
            sx={{
              borderRadius: 28,
              px: 3,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            Compose
          </Button>
          <IconButton color="inherit" sx={{ ml: 2 }}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Box
          component="aside"
          sx={{
            width: sidebarOpen ? 300 : 0,
            flexShrink: 0,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflow: 'hidden',
            borderRight: 1,
            borderColor: 'divider',
            display: {
              xs: sidebarOpen ? 'block' : 'none',
              sm: 'block',
            },
          }}
        >
          <EmailSidebar />
        </Box>

        {/* Email Content */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', height: '100%' }}>
          <EmailViewer onEdit={handleEdit} />
        </Box>
      </Box>

      {/* Compose Modal */}
      <Modal
        open={isComposing || isEditing}
        onClose={handleCloseCompose}
        aria-labelledby="compose-modal-title"
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '60%' },
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            outline: 'none',
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" component="h2">
              {isEditing ? 'Edit Email' : 'New Message'}
            </Typography>
            <IconButton onClick={handleCloseCompose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 2 }}>
            <ComposeForm
              onClose={handleCloseCompose}
              initialEmail={isEditing ? selectedEmail : undefined}
            />
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default Home;
