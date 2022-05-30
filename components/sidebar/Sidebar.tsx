import * as React from 'react'
import styles from './Sidebar.module.css'
import { RollList } from '../Header'

export const Sidebar = ({ openNav }: { openNav: boolean }) => {
  return (
    <div id='moNav' className={openNav ? styles.moNav : styles.moNavInvalid}>
      <p className={styles.moNavP}>Clover</p>
      <hr/>
      <RollList status={true}/>
      <p className={styles.mFooter}>© 2021 幸いです</p>
    </div>
  )
}
