// components/pixelTransition/Centered.jsx
'use client'
import { motion } from 'framer-motion';
import styles from './PixelTransition.module.scss';

const anim = {
  initial: { opacity: 0 },
  open: i => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.03 * i }
  }),
  closed: i => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.03 * i }
  })
};

export default function PixelTransition({ menuIsActive, dimensions }) {
  const { width, height } = dimensions;

  const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const getBlocks = () => {
    const blockSize = width * 0.05;
    const numBlocks = Math.ceil(height / blockSize);
    const shuffledIndexes = shuffle([...Array(numBlocks)].map((_, i) => i));

    return shuffledIndexes.map((i, index) => (
      <motion.div
        key={index}
        className={styles.block}
        variants={anim}
        initial="initial"
        animate={menuIsActive ? "open" : "closed"}
        custom={i}
      />
    ));
  };

  return (
    <div className={styles.pixelBackground}>
      {[...Array(20)].map((_, i) => (
        <div key={i} className={styles.column}>
          {getBlocks()}
        </div>
      ))}
    </div>
  );
}
