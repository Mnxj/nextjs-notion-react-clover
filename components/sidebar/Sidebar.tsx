import * as React from 'react'
import styles from './Sidebar.module.css'
import { RollList } from '../Header'

export const Sidebar = ({ openNav }: { openNav: boolean }) => {
  return (
    <div id='moNav' className={openNav ? styles.moNav : styles.moNavInvalid}>
      <p className={styles.moNavP}>Clover</p>
      <input
        className={styles.searchInput}
        type='search'
        name='keyword'
        placeholder='搜索...'
      />
      <RollList />
      <p className={styles.mFooter}>© 2021 幸いです</p>
    </div>
  )
}
