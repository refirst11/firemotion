import { expect, test } from 'vitest'
import { useAnimation } from '../src/use-animation'
import styles from './test_styles.module.css'

test(() => {
  expect(useAnimation(styles.base, [styles.initial]).toBe(styles.initial))
})
