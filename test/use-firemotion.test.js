import { expect, test } from 'vitest'
import useFiremotion from '../src/use-firemotion'
import styles from './test_styles.module.css'

test(() => {
  expect(useFiremotion(styles.base, [styles.entry]).toBe(styles.entry))
})
