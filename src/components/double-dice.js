//@ts-check
import dice from "./dice";

const doubleDice = () => {
  const hand1 = dice();
  const hand2 = dice();

  if (hand1 === 1 && hand2 === 1) {
    return { ok: false, data: 0, hand1, hand2, reset: true };
  } else if (hand1 === 1 || hand2 === 1) {
    return { ok: false, data: 0, hand1, hand2, reset: false };
  } else {
    return { ok: true, data: hand1 + hand2, hand1, hand2, reset: false };
  }
};
export default doubleDice;
