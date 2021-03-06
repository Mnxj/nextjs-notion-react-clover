import * as React from 'react'
import { PageHead } from './PageHead'

import styles from './styles.module.css'
import Layout from './Layout';

export const ErrorPage: React.FC<{ statusCode: number }> = ({ statusCode }) => {
  const title = 'Error'

  return (
    <Layout isNotNotionFooter={true}>
      <PageHead title={title} />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Error Loading Page</h1>

          {statusCode && <p>Error code: {statusCode}</p>}

          <img src='/images/error.png' alt='Error' className={styles.errorImage} />
        </main>
      </div>
    </Layout>
  )
}
