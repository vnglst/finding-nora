export const mockDate = (date = 1500000000000) => {
  // default is 14th of July 2017
  const constantDate = new Date(date);

  global.Date = class extends global.Date {
    constructor() {
      super();
      return constantDate;
    }
  };
};
