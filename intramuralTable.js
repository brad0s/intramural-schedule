//TODO sort by entire date and group same sports together
//TODO create var game objects
function Game(gameId, time, day, date, home, away, location, sport, cancelled) {
  this.gameId = gameId;
  this.time = time;
  this.day = day;
  this.date = date;
  this.home = home;
  this.away = away;
  this.location = location;
  this.sport = sport;
  this.cancelled = cancelled;
  this.printGame = function () {
    return this.time + " " + this.day + " " + this.date + " " + this.home + " " + this.away + " " + this.location + " " + this.sport + " " + this.cancelled;
  };
}
var arrayOfGameObjects = [];
var sortedData = [];

function sortDataByDay(data) { //sorts data from csv into arrays by day of the week
  var mons = [];
  var tues = [];
  var weds = [];
  var thurs = [];
  var fris = [];
  var allRows = data.split("\n"); //get each row
  console.log(allRows);
  for (var i = 0; i < allRows.length; i++) {
    var rowCell = allRows[i].split(",", -1); //get each cell of each row
    switch (rowCell[1].toLowerCase()) { //put the games into arrays based on day of the week
      case "monday":
        mons.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7]));
        break;
      case "tuesday":
        tues.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7]));
        break;
      case "wednesday":
        weds.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7]));
        break;
      case "thursday":
        thurs.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7]));
        break;
      case "friday":
        fris.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7]));
        break;
    }
  }
  console.log("mergeTime");
  console.log(mergeSortTime(tues));

  var sportsOnDay = []; //get the different sports that are being played on the specific day
  for(var i=0; i<tues.length; i++) {
    if (i < tues.length-1) {
      if (tues[i].sport != tues[i+1].sport && !sportsOnDay.includes(tues[i].sport)) {
      sportsOnDay.push(tues[i].sport);
      }
    } else {
      if (!sportsOnDay.includes(tues[i].sport)) {
        sportsOnDay.push(tues[i].sport);
      }
    }
  }
  console.log(sportsOnDay);

  sortedData.push(mons);
  sortedData.push(tues);
  sortedData.push(weds);
  sortedData.push(thurs);
  sortedData.push(fris);
  console.log(sortedData);
  createScheduleTable(sortedData)
}

function createScheduleTable(sortedData) { //creates the table
  var table = "<table id='parentGameTable' class='table table-bordered table-dark'>";
  var allRows = sortedData;
  var colHeader = getDateTimeForTable();
  for (var day = 0; day < colHeader.length; day++) { //add table headers to the table
    if (day == 0) {
      table += "<thead>";
      table += "<tr>";
    }
    table += "<th>";
    table += setColHeaderDateFormat(colHeader[day]);
    table += "</th>";
  }
  table += "</tr>";
  table += "</thead>";
  table += "<tbody>";
  table += "<tr>"
  console.log("SortedData len: " + sortedData.length);
  for (var i = 0; i < sortedData.length; i++) {
    //console.log("Array["+i+"]" + sortedData[i]);
    var firstEventDay = true; //boolean to keep track of whether its the first row to go into the new column
    for (var j = 0; j < sortedData[i].length; j++) {
      var whichDay = sortedData[i][j].day.toLowerCase();
      console.log("whichDay: " + whichDay);
      switch (whichDay) {
        case "monday":
          if (firstEventDay) { //check if its the first event to go into the column
            table += createTdTableTag(whichDay);
            firstEventDay = false;
          }
          table += displayGameMeta(sortedData, i, j);
          break;
        case "tuesday":
          if (firstEventDay) {
            table += createTdTableTag(whichDay);
            firstEventDay = false;
          }
          table += displayGameMeta(sortedData, i, j);
          break;
        case "wednesday":
          if (firstEventDay) {
            table += createTdTableTag(whichDay);
            firstEventDay = false;
          }
          table += displayGameMeta(sortedData, i, j);
          break;
        case "thursday":
          if (firstEventDay) {
            table += createTdTableTag(whichDay);
            firstEventDay = false;
          }
          table += displayGameMeta(sortedData, i, j);
          break;
        case "friday":
          if (firstEventDay) {
            table += createTdTableTag(whichDay);
            firstEventDay = false;
          }
          table += displayGameMeta(sortedData, i, j);
          break;
      }
      if (j == sortedData[i].length - 1) { //check if at end of 2nd D array to end table and td tag
        table += "</table></td>";
      }
      // if (i == sortedData.length-1) { //check if at end of 1st D array to end tr tag
      //   table += "</tr>";
      // }
    }
  }
  //table += "</tr>";
  table += "</tbody>";
  table += "</table>";
  console.log(table);
  $("body").append(table);
}

$.ajax({
  url: "IntramuralSched.csv",
  dataType: "text",
}).done(sortDataByDay);

function displayGameMeta(sortedData, i, j) { //creates the html for each game object to be displayed in the table
  var gameMetaTd = "";
  gameMetaTd += "<tr><td>";

  if (sortedData[i][j].cancelled == "yes") {
    console.log("Cancelled: " + sortedData[i][j].cancelled);
    gameMetaTd += "<div class='game'><span class='fas fa-ban'></span>";
  } else {
    gameMetaTd += "<div class='game'>";
  }
  gameMetaTd += "<div class='row game-meta-header'>";
  gameMetaTd += "<div class='col-lg-4 col-md-12 time'>" + sortedData[i][j].time + "</div>";
  gameMetaTd += "<div class='col-lg-8 col-md-12 text-center sport'>" + sortedData[i][j].sport + "</div>";
  gameMetaTd += "</div>";
  if (sortedData[i][j].home != "" && sortedData[i][j].away != "") {
    gameMetaTd += "<div class='row teams'><div class='col-sm-12 home'>" + sortedData[i][j].home + "</div><div class='col-sm-12 vs'> vs. </div><div class='col-sm-12 away'>" + sortedData[i][j].away + "</div></div>";
  }
  gameMetaTd += "<div class='row'><div class='col-lg-5 offset-lg-7 col-md-12 location text-center'>" + sortedData[i][j].location + "</div></div>";
  gameMetaTd += "</div></td></tr>";
  return gameMetaTd;
}

function createTdTableTag(day) { //creates html for the table that hold a group of game objects for the entire day. might have to break up and have tables that hold each game object by sport in the day
  var tdTable = "";
  tdTable = "<td class='day-td'><table class='table table-hover table-striped table-dark " + day + " game-table'>";
  return tdTable;
}

function getDateTimeForTable() { //checks current day and gets the days in the current week
  //TODO how does it know when to run to get first day of the week. When today = 0?
  var currentDate = new Date();
  //console.log(currentDate);
  var today = currentDate.getDay();
  var firstDayOfWeek = 0;
  if (today != 0) {
    firstDayOfWeek = today - today;
  } else {
    firstDayOfWeek = today;
  }
  var firstDayOfWeekDate = new Date();
  firstDayOfWeekDate.setDate(currentDate.getDate() - today);
  var currentDaysOfWeek = []
  for (var i = 1; i < 6; i++) {
    var date = new Date();
    date.setDate(firstDayOfWeekDate.getDate() + i);
    //console.log(date);
    if (date.getDay() != 0 || date.getDay() != 6) {
      currentDaysOfWeek.push(date);
    }
  }
  return currentDaysOfWeek;
}

function setColHeaderDateFormat(colDay) { //creates the html to display the dates from getDateTimeForTable(). Format is (Day of Week, Month, Day of Month, Year)
  var monthNumber = colDay.getMonth();
  var dayOfMonth = colDay.getDate();
  var year = colDay.getFullYear();
  var dayNumber = colDay.getDay();
  var day = getDayOfTheWeek(dayNumber);
  var month = getMonthOfTheYear(monthNumber);
  var colDayArray = [];
  colDayArray.push(day);
  colDayArray.push(month);
  colDayArray.push(dayOfMonth);
  colDayArray.push(year);
  var colDayDate = new Date(year, monthNumber, dayOfMonth);
  var cd = new Date();
  var currentDate = new Date(cd.getFullYear(), cd.getMonth(), cd.getDate())
  if (colDayDate.getTime() === currentDate.getTime()) //add currentDay class to colHeader that is the currentDay to add styling
  {
    var format = "<div id='currentDay'>" + colDayArray[0] + "<br>" + colDayArray[1] + " " + colDayArray[2] + " " + colDayArray[3] + "</div>";
  } else {
    var format = colDayArray[0] + "<br>" + colDayArray[1] + " " + colDayArray[2] + " " + colDayArray[3];
  }
  return format;
}

function getDayOfTheWeek(dayNumber) { //takes in a day number and returns the corresponding day in text
  var days = new Array(7);
  days[0] = "Sunday";
  days[1] = "Monday";
  days[2] = "Tuesday";
  days[3] = "Wednesday";
  days[4] = "Thursday";
  days[5] = "Friday";
  days[6] = "Saturday";
  var day = days[dayNumber];
  return day;
}

function getMonthOfTheYear(monthNumber) { //takes in a month number and returns the corresponding month in text
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var month = months[monthNumber];
  return month;
}

//TODO after data is sorted by day, sort the game objects by sport
function mergeSortTime(array) { //split array into halves and mergeTime them exclusively
  if (array.length === 1) {
    return array; //return once we hit an array with a single item
  }
  const middle = Math.floor(array.length/2); //middle item of array rounded down
  const left = array.slice(0, middle); //left side of array
  const right = array.slice(middle); //right side of array

  return mergeTime(mergeSortTime(left), mergeSortTime(right));
}

function mergeTime(left, right) { //compare the arrays item by item and return the concatenated result
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].time < right[indexRight].time) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }
  return result.concat(left.slice(indexLeft).concat(right.slice(indexRight)));
}

//call merge sort to sort the array based on the sport in the current day
function mergeSortSport(array) { //split array into halves and mergeTime them exclusively
  if (array.length === 1) {
    return array; //return once we hit an array with a single item
  }
  const middle = Math.floor(array.length/2); //middle item of array rounded down
  const left = array.slice(0, middle); //left side of array
  const right = array.slice(middle); //right side of array

  return mergeSport(mergeSortSport(left), mergeSortSport(right));
}

function mergeSport(left, right) { //compare the arrays item by item and return the concatenated result
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft].sport < right[indexRight].sport) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }
  return result.concat(left.slice(indexLeft).concat(right.slice(indexRight)));
}