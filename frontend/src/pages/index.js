import { Typography, Container } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to AI Email Assistant
      </Typography>
      <Typography variant="body1">
        Your AI-powered email composition system
      </Typography>
    </Container>
  );
}
