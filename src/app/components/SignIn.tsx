
import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 3, // Use a slight shadow
  p: 4,
  borderRadius: 2,
};

export default function SignIn() {
  return (
    <div>
      <Box sx={style}>
        <Typography className="text-black font-bold" variant="h6" component="h3" gutterBottom>
          <span className="font-bold">Sign In</span>
        </Typography>
        <Typography className="text-[#898989]" variant="body1" component="h3" gutterBottom>
        Welcome back! Sign in to your account to continue.
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Sign In
        </Button>

        <Divider sx={{ mb: 2 }}>OR</Divider>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<GitHubIcon />}
          sx={{ mb: 1 }}
        >
          Sign in with GitHub
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{ mb: 1 }}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<MicrosoftIcon />}
        >
          Sign In with Microsoft
        </Button>
      </Box>
    </div>
  );
}