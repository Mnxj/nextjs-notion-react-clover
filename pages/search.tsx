import Layout from '../components/Layout';
import {NotionSearch} from '../components/NotionSearch';
import {useRouter} from 'next/router';
import {Loading} from '../components/Loading';
import React from 'react';


const Search = () => {
  const router = useRouter()
  if (router.isFallback) {
    return <Loading />
  }
  return (
    <Layout isNotNotionFooter={true} title='Search'>
      <div className='search-form search-form--modal is-mobile'>
        <NotionSearch/>
      </div>
      <hr/>
    </Layout>
  );
};
export default Search;
