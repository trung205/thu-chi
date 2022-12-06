export const getYear = () => {
  let result = [];
  for (let i = 2000; i <= 2050; i++) {
    result.push(i);
  }
  return result;
};

export const getYears = () => {
  let result = [];
  for (let i = 1950; i <= 2100; i++) {
    result.push(i);
  }
  return result;
};

export const getMonths = () => {
  let result = [];
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      result.push('0' + i);
    } else {
      result.push(i);
    }
  }
  return result;
};

export const getMonth = () => {
  let result = [];
  for (let i = 1; i <= 12; i++) {
    if (i < 10) {
      result.push(+i);
    } else {
      result.push(i);
    }
  }
  return result;
};
