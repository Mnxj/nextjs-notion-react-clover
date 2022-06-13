import * as React from 'react';
import {domain} from 'lib/config';
import {resolveNotionPage} from 'lib/resolve-notion-page';
import {NotionPage} from 'components';
import {db} from '../lib/db';
import * as types from '../lib/types';
import {getNotionIds} from "../lib/get-created-notions";
import schedule from 'node-schedule'

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain) as types.PageProps;
    await db.set('browse', props.browseTotal);
    schedule.scheduleJob("1 * * * * *", () => getNotionIds())
    return {props, revalidate: 60};
  } catch (err) {
    console.error('page error', domain, err);

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err;
  }
};

export default function NotionDomainPage(props) {
  return <NotionPage  {...props} />
}
