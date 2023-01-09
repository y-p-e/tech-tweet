import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'primary.dark', pb: 5, minHeight: 'calc(100vh - 70px - 25px)' }}
    >
      <Container sx={{display: 'flex', position: 'relative', '& ::-webkit-scrollbar': {display: "none"}}} maxWidth="xl">
        <Grid container spacing={1} >
          <Grid item xs={12} md={6} sx={{ borderRight: 1}}>
            <Box sx={item}>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600], position: "fixed", width: 80, height: 80, zIndex: 1, mt: 1}}>
                <PersonIcon />
              </Avatar>
              <Box sx={{height: "100px"}}/>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'primary.dark',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 250px)',
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {[0, 1, 2, 3, 4].map((sectionId) => (
                  <li key={`section-${sectionId}`}>
                    <ul>
                      {[0, 1, 2].map((item) => (
                        <ListItem key={`item-${sectionId}-${item}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                          <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="secondary.light"
                              >
                                Ali Connors
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={item}>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600], position: "fixed", width: 80, height: 80, zIndex: 1, mt: 1 }}>
                <PersonIcon />
              </Avatar>
              <Box sx={{height: "100px"}}/>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'primary.dark',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 250px)',
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {[0, 1, 2, 3, 4].map((sectionId) => (
                  <li key={`section-${sectionId}`}>
                    <ul>
                      {[0, 1, 2].map((item) => (
                        <ListItem key={`item-${sectionId}-${item}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                          <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Brunch this weekend?"
                            secondary={
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="secondary.light"
                              >
                                Ali Connors
                              </Typography>
                            }
                          />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
