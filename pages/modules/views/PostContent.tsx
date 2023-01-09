import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { marked } from 'marked';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
  color: "white",
};

type PostContentProps = {
  title: string,
  content: string,
}

function PostContent(props: PostContentProps) {
  const {title, content} = props
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
              <h1>{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PostContent;
