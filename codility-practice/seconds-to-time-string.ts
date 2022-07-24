function timeString(X: number): string {
  if (X === 0) {
    return "0s";
  } else if (X < 60) {
    return `${X}s`;
  } else if (X === 60) {
    return "1m";
  } else if (X === 3600) {
    return "1h";
  } else if (X === 86400) {
    return "1d";
  } else if (X === 604800) {
    return "1w";
  }

  let returnStr = "";
//   let remainder;
  let countOfUnits = 0;
  let numOfWeeks = Math.floor(X / 604800);
  let wksRemainder = X % 604800;
  if (numOfWeeks > 0) {
    countOfUnits += 1;
    returnStr += `${numOfWeeks}w`;
    if (wksRemainder === 0) {
      return returnStr;
    }
  }
  let numOfDays = Math.floor(wksRemainder / 86400);
  let daysRemainder = wksRemainder % 86400;
  if (numOfDays > 0) {
    countOfUnits += 1;
    if (countOfUnits == 2 && daysRemainder > 0) {
      numOfDays = Math.ceil(wksRemainder / 86400);
      returnStr += `${numOfDays}d`;
      return returnStr;
    }
    returnStr += `${numOfDays}d`;
    if (daysRemainder === 0) {
      return returnStr;
    }
  }
  let numOfHrs = Math.floor(daysRemainder / 3600);
  let hrsRemainder = daysRemainder % 3600;
  if (numOfHrs > 0) {
    countOfUnits += 1;
    if (countOfUnits == 2 && hrsRemainder > 0) {
      numOfHrs = Math.ceil(daysRemainder / 3600);
      returnStr += `${numOfHrs}h`;
      return returnStr;
    }
    returnStr += `${numOfHrs}h`;
    if (hrsRemainder === 0) {
      return returnStr;
    }
  }
  let numOfMins = Math.floor(hrsRemainder / 60);
  let minsRemainder = hrsRemainder % 60;
  if (numOfMins > 0) {
    countOfUnits += 1;
    if (countOfUnits == 2 && minsRemainder > 0) {
        // console.log(Math.floor(hrsRemainder / 60))
      numOfMins = Math.ceil(hrsRemainder / 60);
      returnStr += `${numOfMins}m`;
      return returnStr;
    }
    returnStr += `${numOfMins}m`;
    if (minsRemainder === 0) {
      return returnStr;
    }
  }
  let numOfSecs = minsRemainder;
  if (numOfSecs > 0) {
    returnStr += `${numOfSecs}s`;
  }
//   console.log(numOfWeeks, numOfDays, numOfHrs, numOfMins, numOfSecs);
  return returnStr;
}

console.log(timeString(100));
console.log(timeString(604800));
console.log(timeString(3700));
