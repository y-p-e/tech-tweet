import fs from 'fs';
import matter from 'gray-matter';
import type { NextPage } from 'next'
import AppFooter from '../modules/views/AppFooter';
import PostContent from '../modules/views/PostContent';
import AppAppBar from '../modules/views/AppAppBar';

export async function getStaticProps() {
  const file = fs.readFileSync(`privacy/privacy.md`, 'utf-8');
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

const Post: NextPage = ({ frontMatter, content }) => {
  return (
    <>
      <AppAppBar isShowMenuIcon={false}/>
      <PostContent title={frontMatter.title} content={content} />
      <AppFooter />
    </>
  )
}

export default Post
