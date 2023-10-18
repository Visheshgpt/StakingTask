import BigNumber from "bignumber.js";

export const truncateAddress = (
  str = "0x0000000000000000000000000000000000000000",
  first = 5
) => {
  if (str) {
    if (str.length <= 10) {
      return str;
    } else {
      const strHalfLength = parseInt(str.length / 2);
      if (first > strHalfLength) {
        return str;
      }
      const firstFive = str?.substring(0, first);
      const lastFive = str?.substring(str.length - first);
      return firstFive + "....." + lastFive;
    }
  }
};

export function convertWeiToNumber(weiValue, decimal = 18) {
  if (weiValue) {
    const suffix = new BigNumber(`1e${decimal}`);
    let value = new BigNumber(weiValue);
    value = value.div(suffix);
    return value;
  }
  return new BigNumber(0);
}

export function convertEtherToWei(etherValue, decimal = 18) {
  if (etherValue) {
    const suffix = new BigNumber(`1e${decimal}`);
    let value = new BigNumber(etherValue);
    value = value.times(suffix);
    return value;
  }
  return new BigNumber(0);
}