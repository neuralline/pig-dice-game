//@ts-check

/**
 *
 * @param {number} sides number of sides in one dice
 */
const dice = (sides = 6) => {
  return Math.floor(Math.random() * sides) + 1;
};
export default dice;
