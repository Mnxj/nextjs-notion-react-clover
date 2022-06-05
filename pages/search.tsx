import Layout from '../components/Layout';
import {NotionSearch} from '../components/NotionSearch';

const Search = () => {
  return (
    <Layout isNotionFooter={true}>
      <div className='search-form search-form--modal is-mobile'>
        <NotionSearch/>
      </div>
      <hr/>
    </Layout>
  );
};
export default Search;
