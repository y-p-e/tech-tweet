import type { NextPage } from 'next'
import AppFooter from './modules/views/AppFooter';
import ProductValues from './modules/views/ProductValues';
import AppAppBar from './modules/views/AppAppBar';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './modules/theme';

const Home: NextPage = () => {
  return (
    <>
      <AppAppBar isShowMenuIcon={true}/>
      <ProductValues />
      <AppFooter />
    </>
  )
}

export default Home
