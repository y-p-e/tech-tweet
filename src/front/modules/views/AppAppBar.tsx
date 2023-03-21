import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import Typography from '../components/Typography';
import NextLink from 'next/link';
import { Category  as CategoryDataType} from '../../types/data';
import Avatar from '@mui/material/Avatar';
import {registDefaultCateogry} from '../../services/category/regist-default';
import { fetcher } from '../../utils';
import { logout } from '../../services/auth/logout';
import getCookie from '../../services/user/get-cookie';

export interface SelectedListItemProps {
  category_datas: CategoryDataType[];
  selectedIndex: number;
  setSelectedIndex: (indexNumber: number) => void;
}

function SelectedListItem(props: SelectedListItemProps) {
  const {category_datas, selectedIndex, setSelectedIndex} = props
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <List component="nav" aria-label="main mailbox folders" sx={{"Mui-selected": {color: "blue"}}}>
      {category_datas.map((category_data) => (
        <ListItemButton
          key={category_data.id}
          selected={selectedIndex === category_data.id}
          onClick={(event) => handleListItemClick(event, category_data.id)}
          // sx={{'&.Mui-selected': {bgcolor: 'secondary.dark'}}}
        >
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src={category_data.img_url} />
          </ListItemIcon>
          <ListItemText primary={category_data.name} />
        </ListItemButton>
      ))}
      </List>
    </Box>
  );
}

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  category_datas: CategoryDataType[];
  firstTweetNumber: number
  secondTweetNumber: number
  handleFirstTweetNumber: (tweetNumber: number) => void;
  handleSecondTweetNumber: (tweetNumber: number) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { category_datas, firstTweetNumber, secondTweetNumber, handleFirstTweetNumber, handleSecondTweetNumber, onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  const [selectedLeftIndex, setSelectedLeftIndex] = React.useState(firstTweetNumber);
  const [selectedRightIndex, setSelectedRightIndex] = React.useState(secondTweetNumber);

  React.useEffect(() => {
    (async() => {
      const user = await getCookie()
      setSelectedLeftIndex(user.firstDefault)
      setSelectedRightIndex(user.secondDefault)
    })()
  }, [selectedLeftIndex, selectedRightIndex]);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    setSelectedLeftIndex(firstTweetNumber)
    setSelectedRightIndex(secondTweetNumber)
    onClose();
  };

  const handleOk = () => {
    handleFirstTweetNumber(selectedLeftIndex)
    handleSecondTweetNumber(selectedRightIndex)
    registDefaultCateogry({
      firstDefaultNumber: selectedLeftIndex,
      secondDefaultNumber: selectedRightIndex,
    })
    onClose(value);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: { xs: '95%', md: '80%' }, maxHeight: 600 }}}
      maxWidth="md"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Tech Tweet Select</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} sx={{ borderRight: { md: 1}}}>
            <Typography variant="h6" sx={{ display: { xs: 'none', md: 'block' }}}>
              Left
            </Typography>
            <Typography variant="h6" sx={{ display: { xs: 'block', md: 'none' }, textAlign:"center"}}>
              Default
            </Typography>
            <SelectedListItem
              category_datas={category_datas}
              selectedIndex={selectedLeftIndex}
              setSelectedIndex={setSelectedLeftIndex}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: { xs: 'none', md: 'block' }}}>
            <Typography variant="h6">
              Right
            </Typography>
            <SelectedListItem 
              category_datas={category_datas}
              selectedIndex={selectedRightIndex}
              setSelectedIndex={setSelectedRightIndex}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};


type AppAppBarProps = {
  isShowMenuIcon: boolean,
  category_datas: CategoryDataType[],
  firstTweetNumber: number,
  secondTweetNumber: number,
  handleFirstTweetNumber: (tweetNumber: number) => void,
  handleSecondTweetNumber: (tweetNumber: number) => void,
}

function AppAppBar(props: AppAppBarProps) {
  const {isShowMenuIcon, category_datas, firstTweetNumber, secondTweetNumber, handleFirstTweetNumber, handleSecondTweetNumber} = props
  const [isSignIn, setIsSignIn] = React.useState(false);
  const [name, setName] = React.useState('');
  React.useEffect(() => {
    (async() => {
      const user = await getCookie()
      setName(user.name)
      console.log(name)
      if (!name || name === '' ) {
        setIsSignIn(false)
      } else {
        setIsSignIn(true)
      }
    })()
  }, [name]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('Dione');

  const handleClickLogout = () => {
    logout()
    setIsSignIn(false)
  }
  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{minHeight:  {xs: '70px' }}}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight:  {xs: '70px' }}}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            {isShowMenuIcon &&
              <>
                <IconButton size="large" color="inherit" onClick={handleClickListItem}>
                  <MenuIcon/>
                </IconButton>
                <ConfirmationDialogRaw
                  id="ringtone-menu"
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  category_datas={category_datas}
                  firstTweetNumber={firstTweetNumber}
                  secondTweetNumber={secondTweetNumber}
                  handleFirstTweetNumber={handleFirstTweetNumber}
                  handleSecondTweetNumber={handleSecondTweetNumber}
                  value={value}
                />
              </>
            }
          </Box>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              sx={{ fontSize: 24 }}
              href="/"
              component={NextLink}
            >
              {'Tech Tweet'}
            </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {isSignIn &&
              <>
                <Typography variant="h6" sx={{color: "secondary.light"}}>
                  {name}
                </Typography>
              </>
            }
          {!isSignIn &&
              <>
                <Link
                  variant="h6"
                  underline="none"
                  sx={{ ...rightLink, color: 'secondary.main' }}
                  href="/sign-in"
                  component={NextLink}
                >
                  {'SignIn'}
                </Link>
              </>
            }
          {isSignIn &&
              <>
                <Link
                  variant="h6"
                  underline="none"
                  sx={{ ...rightLink, color: 'secondary.main' }}
                  onClick={handleClickLogout}
                  href=""
                  component={NextLink}
                >
                  {'Logout'}
                </Link>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default AppAppBar;
