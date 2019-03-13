//pigDice={ score: 0, tempScore: 0, chain: 0, streak: 0, resets: 0}
//@ts-check
/**
 *
 * @param {object} stats player stats
 * @param {object} pigDice current dice roll result
 */
export const continueRolling = (stats, pigDice = {}) => {
  stats.tempScore = stats.tempScore + pigDice.data;
  stats.hands = [pigDice.hand1, pigDice.hand2];
  stats.accumulated.push(stats.hands);
  stats.chain++;
  stats.info = "Rolling";
  return {
    ...stats,
    hands: [...stats.hands],
    accumulated: [...stats.accumulated]
  };
};

/**
 *
 * @param {object} stats player stats
 * @param {object} pigDice current dice roll result
 */
export const resetRolling = (stats, pigDice) => {
  stats.score = 0;
  stats.tempScore = 0;
  stats.accumulated = [];
  stats.chain = 0;
  stats.resets++;
  stats.missHand++;
  stats.info = "Reset";
  return {
    ...stats,
    hands: [0, 0],
    accumulated: [...stats.accumulated]
  };
};

/**
 *
 * @param {object} stats player stats
 * @param {object} pigDice current dice roll result
 */
export const lostRolling = (stats, pigDice) => {
  stats.tempScore = 0;
  stats.accumulated = [];
  stats.chain = 0;
  stats.missHand++;
  stats.info = "Lost";
  return {
    ...stats,
    hands: [0, 0],
    accumulated: [...stats.accumulated]
  };
};

/**
 *
 * @param {object} stats player stats
 */
export const bankRolling = stats => {
  stats.score = stats.score + stats.tempScore;
  stats.tempScore = 0;
  stats.accumulated = [];
  stats.passes++;
  stats.streak = stats.streak < stats.chain ? stats.chain : stats.streak;
  stats.chain = 0;
  stats.info = "Bank";
  return {
    ...stats,
    hands: [0, 0],
    accumulated: [...stats.accumulated]
  };
};

/**
 *
 * @param {object} stats player stats
 * @param {object} pigDice current dice roll result
 */
export const handleRolling = (stats, pigDice = {}) => {
  if (pigDice.ok) {
    return continueRolling(stats, pigDice);
  } else if (pigDice.reset) {
    return resetRolling(stats, pigDice);
  } else {
    return lostRolling(stats, pigDice);
  }
};
