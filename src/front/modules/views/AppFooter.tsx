import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import TextField from '../components/TextField';
import NextLink from 'next/link';

function Copyright() {
  return (
    <>
    {'© '}
    Tech Tweet
    {new Date().getFullYear()}
    </>
  );
}

export default function AppFooter() {
  return (
    <Typography
      component="footer"
      sx={{ color: "secondary.light", opacity: 0.3, display: 'flex', bgcolor: 'secondary.dark', minHeight:  {xs: '25px' } }}
    >
      <Container sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={6}>
            <Copyright />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
              <Link
                color="inherit"
                variant="body1"
                underline="none"
                href="/privacy"
                component={NextLink}
              >
                {'プライバシーポリシー'}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
