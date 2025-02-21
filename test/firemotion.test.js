import { expect, test } from 'vitest'
import { useMotion } from '../src/use-motion/index.ts'
import styles from './test_styles.module.css'

test(() => {
  expect(useMotion(styles.base, { entry: styles.entry }).toBe(styles.entry))
})
