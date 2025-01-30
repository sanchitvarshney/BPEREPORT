import Box from '@mui/material/Box';
export default function AuthBackground() {
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(18px)',
        zIndex: -1,
        bottom: 0,
        transform: 'inherit'
      }}
    >
      <img src="/mslogo.png" width={'300px'} alt="" />
    </Box>
  );
}
