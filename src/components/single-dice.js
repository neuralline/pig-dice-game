//@ts-check
import dice from "./dice";

const singleDice = () => {
  const hand1 = dice();
  const hand2 = 0;
  return hand1 === 1
    ? { ok: false, data: 0, hand1, hand2, reset: false }
    : { ok: true, data: hand1, hand1, hand2, reset: false };
};
export default singleDice;
