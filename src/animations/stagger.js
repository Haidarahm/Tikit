/**
 * Container variants for staggered children animations.
 *
 *   <motion.div
 *     variants={staggerContainer()}
 *     initial="hidden"
 *     whileInView="visible"
 *     viewport={VIEWPORT}
 *   >
 *     {items.map(i => <motion.div key={i} variants={fadeUp.default} />)}
 *   </motion.div>
 *
 * Children that declare `variants` and have NO `initial`/`animate` of their
 * own will automatically inherit `hidden`/`visible` from the parent and run
 * in sequence with the configured stagger.
 */

/**
 * @param {Object} [opts]
 * @param {number} [opts.stagger=0.08] - Delay between children (s)
 * @param {number} [opts.delayChildren=0.05] - Initial delay before first child (s)
 */
export const staggerContainer = ({ stagger = 0.08, delayChildren = 0.05 } = {}) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});
