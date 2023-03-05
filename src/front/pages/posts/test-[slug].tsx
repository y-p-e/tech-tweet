import fs from 'fs';
import matter from 'gray-matter';
import type { NextPage } from 'next'
import AppFooter from '../modules/views/AppFooter';
import PostContent from '../modules/views/PostContent';
import AppAppBar from '../modules/views/AppAppBar';

export async function getStaticProps({ params }) {
  const file = fs.readFileSync(`posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
}

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
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
