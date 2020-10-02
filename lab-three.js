const readlineSync = require("readline-sync");


const zero = 0;
const one = 1;
const two = 2;
const three = 3;
const four = 4;
const five = 5;
const six = 6;
const seven = 7;
const eight = 8;
const nine = 9;
const ten = 10;
const eleven = 11;
const twelve = 12;
const fourHundred = 400;
const twentyNine = 29;
const thirty = 30;
const thrityOne = 31;

let first2DigitsYear;
let last2DigitsYear;
let userInput;
let howManyTwelves;
let remainderOfTwelver;
let numOfFours;
let dayOfMonth;
let monthCode;
let isLeapYear = false;

var helpingFunctions = {
  starter: function (year) {
    last2DigitsYear = year.toString().substring(two);
    first2DigitsYear = year.toString().substring(zero, two);
    isLeapYear = (function () {
      if (year % four  == zero) {
        if (last2DigitsYear == zero) {
          if (year % fourHundred  == zero) {
            return true;
          }
          return false;
        }
        return true;
      }
      return false;
    })();
  },
  // step 1
  yearByTwelve: function () {
    let twelves = parseInt(last2DigitsYear) / twelve;
    howManyTwelves = Math.floor(twelves);
  },
  // step 2
  moduloByTwelve: function () {
    var mod = parseInt(last2DigitsYear) % twelve;
    remainderOfTwelver = mod;
  },
  // step 3
  foursInRemainder: function () {
    numOfFours = Math.floor(remainderOfTwelver / four);
  },
  // step 4
  numOfDay: function (day) {
    dayOfMonth = parseInt(day);
  },
  // step 5
  monthCodes: function (month) {
    var addMonthCode;
    switch (month) {
      case 4:
      case 7:
        addMonthCode = zero;
        break;
      case 1:
      case 10:
        addMonthCode = one;
        break;
      case 5:
        addMonthCode = two;
        break;
      case 8:
        addMonthCode = three;
        break;
      case 2:
      case 3:
      case 11:
        addMonthCode = four;
        break;
      case 6:
        addMonthCode = five;
        break;
      case 9:
      case 12:
        addMonthCode = six;
        break;
    }
    if ((month == one || month == two) && isLeapYear) {
      addMonthCode -= 1;
    }
    if (first2DigitsYear == "16" || first2DigitsYear == "20") {
      addMonthCode += six;
    }
    if (first2DigitsYear == "17" || first2DigitsYear == "21") {
      addMonthCode += four;
    }
    if (first2DigitsYear == "18") {
      addMonthCode += two;
    }

    monthCode = addMonthCode;
  },
};

function findDayOfWeek(year, month, day) {
  helpingFunctions.starter(year);
  helpingFunctions.yearByTwelve(year);
  helpingFunctions.moduloByTwelve(year);
  helpingFunctions.foursInRemainder();
  helpingFunctions.monthCodes(month);
  helpingFunctions.numOfDay(day);

  var sum =
    howManyTwelves +
    remainderOfTwelver +
    numOfFours +
    monthCode +
    dayOfMonth;

  var dayOfWeekInt = sum % seven;

  return (function () {
    switch (dayOfWeekInt) {
      case 0:
        return "Saturday";
      case 1:
        return "Sunday";
      case 2:
        return "Monday";
      case 3:
        return "Tuesday";
      case 4:
        return "Wednesday";
      case 5:
        return "Thursday";
      case 6:
        return "Friday";
    }
  })();
}

function getDayOfTheWeek(year, month, day) {
  var year = parseInt(year);
  var month = parseInt(month);
  var day = parseInt(day);

  console.log(
    "You have entered " + userInput + ", which is a " +
      findDayOfWeek(year, month, day)
  );
}

function getDayOfTheWeekForUserDate() {
  userInput = readlineSync.question(
    "Please input your date in the format MM-DD-YYYY : "
  );
  var inputArray = userInput.split("-");
  var month = parseInt(inputArray[0]);
  var day = parseInt(inputArray[1]);
  var year = parseInt(inputArray[two]);

  getDayOfTheWeek(year, month, day);
}

function makeCalendar() {
  var months = new Map([
    [1, thrityOne],
    [two, twentyNine],
    [three, thrityOne],
    [four, thirty],
    [five, thrityOne],
    [six, thirty],
    [seven, thrityOne],
    [eight, thrityOne],
    [nine, thirty],
    [ten, thrityOne],
    [eleven, thirty],
    [twelve, thrityOne],
  ]);

  months.forEach(function (value, key) {
    for (let i = 1; i <= value; i++) {
      console.log(
        key + "-" + i + "-" + "2020" + " is a " + findDayOfWeek(2020, key, i)
      );
    }
  });
}

module.exports = { makeCalendar, getDayOfTheWeekForUserDate };

