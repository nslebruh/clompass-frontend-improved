// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }
  let date = new Date();
  console.log(date.addDays(7));