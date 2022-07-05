// Given a time in -hour AM/PM format, convert it to military (24-hour) time.

// Note: - 12:00:00AM on a 12-hour clock is 00:00:00 on a 24-hour clock.
// - 12:00:00PM on a 12-hour clock is 12:00:00 on a 24-hour clock.

// Example
// s = '12:01:00PM' returns '12:01:00'
// s = '12:01:00AM' returns  '00:01:00'

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s: string): string {
  // Write your code here
  const AMPM = s.slice(8, 10);
  let hourValue = +s.slice(0, 2);
  const minAndSec = s.slice(3, 8);

  if (AMPM === "AM") {
    if (hourValue !== 12) {
      return s.slice(0, 8);
    } else {
      return "00:" + minAndSec;
    }
  } else {
    if (hourValue === 12) {
      return s.slice(0, 8);
    } else {
      const moduloHour = hourValue + 12;
      return moduloHour.toString() + ":" + minAndSec;
    }
  }
}

console.log(timeConversion("12:01:00PM")); // 12:01:00
console.log(timeConversion("12:01:00AM")); // 00:01:00
console.log(timeConversion("07:05:45PM")); // 19:05:45
