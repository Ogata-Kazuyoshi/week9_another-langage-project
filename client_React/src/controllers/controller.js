export const filterMonth = (month, data) => {
  return data.filter(
    (elm) => changeTimeZone(elm.BoughtDate).slice(0, 2) === String(month)
  );
};

export const changeDate = (date) => {
  const zeropadding = (str) => {
    const changeStr = String(str);
    if (changeStr.length === 1) {
      return `0${changeStr}`;
    } else {
      return changeStr;
    }
  };
  const year = date.getFullYear();
  const month = zeropadding(date.getMonth() + 1);
  const day = zeropadding(date.getDate());
  return `${year}-${month}-${day}`;
};

export const changeTimeZone = (str) => {
  const stringData = String(str);
  const dateContent = stringData.slice(0, 10);
  const split = dateContent.split('-');
  return `${split[1]}/${split[2]}`;
};
