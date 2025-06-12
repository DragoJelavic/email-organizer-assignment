import '@/styles/globals.css';
import Head from 'next/head';
import AppLayout from '@/components/Layout/AppLayout';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { AccountBox } from '@mui/icons-material';
import Link from 'next/link';

const DRAWER_WIDTH = 240;

export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Head>
        <title>AI Email Assistant</title>
        <meta
          name="description"
          content="AI-powered email composition system"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem button component={Link} href="/">
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Emails" />
          </ListItem>
          <ListItem button component={Link} href="/leads">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Leads" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Component {...pageProps} />
      </Box>
    </AppLayout>
  );
}
