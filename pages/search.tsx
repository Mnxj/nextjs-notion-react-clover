import Layout from '../components/Layout';
import {NotionSearch} from '../components/NotionSearch';
import {getBrowseTotal} from '../lib/hander-redis';

export const getStaticProps = async () => {

  try {
    const browseTotal = await getBrowseTotal();
    return {
      props: {browseTotal},
      revalidate: 60
    };
  } catch (err) {
    // ignore redis errors
    console.warn(`redis error get `, err.message);
  }
};

const Search = (props) => {
  return (
    <Layout isNotNotionFooter={true} browseTotal={props.browseTotal}>
      <div className='search-form search-form--modal is-mobile'>
        <NotionSearch/>
      </div>
      <hr/>
    </Layout>
  );
};
export default Search;
