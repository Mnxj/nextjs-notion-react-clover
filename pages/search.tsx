import Layout from '../components/Layout';
import {NotionSearch} from '../components/NotionSearch';
import {getBrowseTotal} from '../lib/hander-redis';
import {useRouter} from 'next/router';
import {Loading} from '../components/Loading';
import React from 'react';

export const getStaticProps = async () => {

  try {
    const browseTotal = await getBrowseTotal();
    return {
      props: {browseTotal},
      revalidate: 60
    };
  } catch (err) {
    console.warn(`redis error get `, err.message);
    throw err
  }
};

const Search = (props) => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <Layout isNotNotionFooter={true} browseTotal={props.browseTotal} title='Search'>
      <div className='search-form search-form--modal is-mobile'>
        <NotionSearch/>
      </div>
      <hr/>
    </Layout>
  );
};
export default Search;
