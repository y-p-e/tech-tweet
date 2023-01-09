import fs from 'fs';
import matter from 'gray-matter';
import type { NextPage } from 'next'
import AppFooter from '../modules/views/AppFooter';
import PostValues from '../modules/views/PostValues';
import AppAppBar from '../modules/views/AppAppBar';

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

const Posts: NextPage = ({ posts }) => {
  return (
    <>
      <AppAppBar isShowMenuIcon={false}/>
      <PostValues posts={posts}/>
      <AppFooter />
    </>
  )
}

export default Posts
