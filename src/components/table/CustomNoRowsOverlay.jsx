import { Box, Typography } from '@mui/material';

export const CustomNoRowsOverlay = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}
  >
    <Box
      sx={{
        height: '150px',
        width: '150px',
        background: "url('/empty.svg')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        opacity: '0.7'
      }}
    ></Box>
  </Box>
);
