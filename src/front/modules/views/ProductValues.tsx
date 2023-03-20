import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import useSWR from 'swr'
import { fetcher } from '../../utils';
import ImageListItem from '@mui/material/ImageListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Link from '@mui/material/Link';

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: { xs: 0, md: 5 },
};

export type TweetNumberProps = {
  firstTweetNumber: number,
  secondTweetNumber: number,
  setFirstTweetNumber: (tweetNumber: number) => void;
  setSecondTweetNumber: (tweetNumber: number) => void;
  tweetMap: Map<number, Tweets>;
  bookMap: Map<number, Books[]>;
}

export type Tweet = {
  profileImg: string
  tweet: string
  tweetedAt: string
  url: string
}

export type Tweets = {
  img: string
  tweets: Tweet[]
}

export type Books = {
  img: string
  title: string
  descriptin: string
  url: string
}

function ProductValues(props: TweetNumberProps) {
  const {tweetMap, bookMap, firstTweetNumber, secondTweetNumber, setFirstTweetNumber, setSecondTweetNumber} = props
  const { data } = useSWR('/api/current-user', fetcher)
  React.useEffect(() => {
    setFirstTweetNumber(data.firstDefault)
    setSecondTweetNumber(data.secondDefault)
  }, [data])
  const firstTweet = tweetMap.get(firstTweetNumber)
  const secondTweet = tweetMap.get(secondTweetNumber)
  const firstBooks = bookMap.get(firstTweetNumber) ?? []
  const secondBooks = bookMap.get(secondTweetNumber) ?? []
  let firstBookI = 0
  let secondBookI = 0
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'primary.dark', pb: 5, minHeight: 'calc(100vh - 70px - 25px)' }}
    >
      <Container sx={{display: 'flex', position: 'relative', '& ::-webkit-scrollbar': {display: "none"}}} maxWidth="xl">
        <Grid container spacing={1} >
          <Grid item xs={12} md={6} sx={{ borderRight: { xs: 0, md: 1 }}}>
            <Box sx={item}>
            <Avatar src={firstTweet?.img} sx={{display: { xs: 'none', md: 'block' }, position: "fixed", width: 80, height: 80, zIndex: 1, mt: 1}} />
              <Box sx={{height: { xs: "10px", md: "100px" }}}/>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'primary.dark',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: { xs: 'calc(100vh)', md: 'calc(100vh - 250px)' },
                  '& ul': { padding: 0 },
                }}
                subheader={<li />}
              >
                <ul>
                  {firstTweet?.tweets.map((tweet, id) => {
                    const match = /(http[s]?:\/\/)[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/.exec(tweet.tweet)
                    const regexp_url = /(http[s]?:\/\/)[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/g;
                    const tweet_text = tweet.tweet.replace(regexp_url, '');
                    const url = match?.[0]
                    if (id !== 0 && id % 5 === 0) {
                      firstBookI = firstBookI === firstBooks.length ? 0 : firstBookI
                      const firstBook = firstBooks[firstBookI]
                      firstBookI += 1
                      return (
                        <div key={id}>
                         <Link href={firstBook.url} target="_blank">
                          <ListItemButton key={`book-${id}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                            <ImageListItem sx={{width: 150, mr: 4}}>
                              <img
                                src={firstBook.img}
                                srcSet={`${firstBook.img} 2x`}
                                alt={firstBook.title}
                                loading="lazy"
                              />
                            </ImageListItem>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{display: 'inline', pb: 3 }}
                                  component="span"
                                  variant="body1"
                                  color="secondary.light"
                                >
                                  {firstBook.title}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="secondary.light"
                                >
                                  {firstBook.descriptin}
                                </Typography>
                                
                              }
                            />
                          </ListItemButton>
                         </Link>
                        <ListItem>
                        <ListItemText
                              primary={
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body1"
                                  color="secondary.light"
                                >
                                  {tweet.tweetedAt}
                                </Typography>
                              }
                            />
                        </ListItem>
                        <Link href={tweet.url} target="_blank">
                          <ListItemButton key={`item-${id}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={tweet.profileImg} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body1"
                                  color="secondary.light"
                                >
                                  {tweet.tweet}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </Link>
                        </div>
                      )
                    }
                    return (
                    <div key={id}>
                    <ListItem>
                    <ListItemText
                          primary={
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body1"
                              color="secondary.light"
                            >
                              {tweet.tweetedAt}
                            </Typography>
                          }
                        />
                    </ListItem>
                    <Link href={tweet.url} target="_blank">
                      <ListItemButton key={`item-${id}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={tweet.profileImg} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body1"
                              color="secondary.light"
                            >
                              {tweet.tweet}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </Link>
                    </div>
                    )
                  })}
                </ul>
              </List>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }}}>
            <Box sx={item}>
              <Avatar src={secondTweet?.img} sx={{ position: "fixed", width: 80, height: 80, zIndex: 1, mt: 1 }} />
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
                <ul>
                  {secondTweet?.tweets.map((tweet, id) => {
                    const match = /(http[s]?:\/\/)[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/.exec(tweet.tweet)
                    const regexp_url = /(http[s]?:\/\/)[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?/g;
                    const tweet_text = tweet.tweet.replace(regexp_url, '');
                    const url = match?.[0]
                    if (id !== 0 && id % 5 === 0) {
                      secondBookI = secondBookI === secondBooks.length ? 0 : secondBookI
                      const secondBook = secondBooks[secondBookI]
                      secondBookI += 1
                      return (
                        <div key={id}>
                        <Link href={secondBook.url} target="_blank">
                          <ListItemButton key={`book-${id}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                            <ImageListItem sx={{width: 150, mr: 4}}>
                              <img
                                src={secondBook.img}
                                srcSet={`${secondBook.img} 2x`}
                                alt={secondBook.title}
                                loading="lazy"
                              />
                            </ImageListItem>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{display: 'inline', pb: 3 }}
                                  component="span"
                                  variant="body1"
                                  color="secondary.light"
                                >
                                  {secondBook.title}
                                </Typography>
                              }
                              secondary={
                                <Typography
                                  sx={{display: 'inline' }}
                                  component="span"
                                  variant="body2"
                                  color="secondary.light"
                                >
                                  {secondBook.descriptin}
                                </Typography>
                                
                              }
                            />
                          </ListItemButton>
                        </Link>
                        <ListItem>
                        <ListItemText
                              primary={
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body1"
                                  color="secondary.light"
                                >
                                  {tweet.tweetedAt}
                                </Typography>
                              }
                            />
                        </ListItem>
                        <Link href={tweet.url} target="_blank">
                          <ListItemButton key={`item-${id}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                            <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={tweet.profileImg} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography
                                  sx={{ display: 'inline' }}
                                  component="span"
                                  variant="body1"
                                  color="secondary.light"
                                >
                                  {tweet.tweet}
                                </Typography>
                              }
                            />
                          </ListItemButton>
                        </Link>
                        </div>
                      )
                    }
                    return (
                      <div key={id}>
                      <ListItem>
                      <ListItemText
                        primary={
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body1"
                            color="secondary.light"
                          >
                            {tweet.tweetedAt}
                          </Typography>
                        }
                      />
                      </ListItem>
                      <Link href={tweet.url} target="_blank">
                        <ListItemButton key={`item-${id}`} sx={{color: "secondary.light", borderBottom: "1px solid #ccc"}}>
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={tweet.profileImg} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="secondary.light"
                              >
                                {tweet.tweet}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </Link>
                      </div>
                    )
                  }
                  )}
                </ul>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
