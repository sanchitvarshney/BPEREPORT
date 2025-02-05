import { Box, Button, Card, CardActions, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router';
import { useUser } from 'hooks/useUser';

const index = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <Box>
      <Typography variant="h2">👋 Hi, Welcome Back {user?.username}</Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '70vh'
        }}
      >
        <Grid
          container
          spacing={5}
          sx={{
            padding: '0 100px',
            mt: 5
          }}
        >
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                width={'100px'}
                image="/device.svg"
                alt="Device"
                sx={{ width: '150px', height: '150px', objectFit: 'contain', margin: '0 auto' }}
              />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  sx={{ width: '100%' }}
                  onClick={() => navigate('/total-device-in-company')}
                >
                  Device Report
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                width={'100px'}
                image="/raw.svg"
                alt="Device"
                sx={{ width: '150px', height: '150px', objectFit: 'contain', margin: '0 auto' }}
              />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  sx={{ width: '100%' }}
                  onClick={() => navigate('/total-material-in-company')}
                >
                  Raw Material Report
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                width={'100px'}
                image="/dispatch.svg"
                alt="Device"
                sx={{ width: '150px', height: '150px', objectFit: 'contain', margin: '0 auto' }}
              />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  endIcon={<OpenInNewIcon />}
                  sx={{ width: '100%' }}
                  onClick={() => navigate('/total-dispatch-device')}
                >
                  Dispatch Report
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default index;
