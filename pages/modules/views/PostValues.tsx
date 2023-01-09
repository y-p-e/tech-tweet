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
import NextLink from 'next/link';
import Link from '@mui/material/Link';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function PostValues({posts}) {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'primary.dark', pb: 5, minHeight: 'calc(100vh - 70px - 25px)' }}
    >
      <Container sx={{display: 'flex', position: 'relative', '& ::-webkit-scrollbar': {display: "none"}}} maxWidth="xl">
        <Grid container spacing={1} >
          <Grid item xs={12}>
            <Box sx={item}>
              <Box sx={{height: "100px"}}/>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'primary.dark',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: '100vh',
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                {posts.map((post) => (
                  <Link key={post.slug} href={`/posts/${post.slug}`} component={NextLink}>
                    <ListItem sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                      <ListItemText primary={post.frontMatter.title} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PostValues;
