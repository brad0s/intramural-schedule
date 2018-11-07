function Game(gameId, time, day, date, home, away, location, sport, cancelled, oneDayTournament, endTime) { //creates an object called game that corresponds to a row in the csv
  this.gameId = gameId;
  this.time = time;
  this.day = day;
  this.date = date;
  this.home = home;
  this.away = away;
  this.location = location;
  this.sport = sport;
  this.cancelled = cancelled;
  this.oneDayTournament = oneDayTournament;
  this.endTime = endTime;
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
        mons.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7], rowCell[8], rowCell[9]));
        break;
      case "tuesday":
        tues.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7], rowCell[8], rowCell[9]));
        break;
      case "wednesday":
        weds.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7], rowCell[8], rowCell[9]));
        break;
      case "thursday":
        thurs.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7], rowCell[8], rowCell[9]));
        break;
      case "friday":
        fris.push(new Game(i, rowCell[0], rowCell[1], rowCell[2], rowCell[3], rowCell[4], rowCell[5], rowCell[6], rowCell[7], rowCell[8], rowCell[9]));
        break;
    }
  }
  //take day split by sport. Then sort by time and put back together by dat
  mons = sortGamesOnDayBySportAndTime(mons);
  tues = sortGamesOnDayBySportAndTime(tues);
  weds = sortGamesOnDayBySportAndTime(weds);
  thurs = sortGamesOnDayBySportAndTime(thurs);
  fris = sortGamesOnDayBySportAndTime(fris);
 
  console.log(tues);
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
          table += displayGameMeta(sortedData, i, j); //add game object from array to the table for its corresponding day
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
    }
  }
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
  if (sortedData[i][j].cancelled != "") { //check if game is cancelled
    console.log("Cancelled: " + sortedData[i][j].cancelled);
    gameMetaTd += "<div id='cancelled'>Cancelled</div><div class='game cancelled'>";
  } else {
    gameMetaTd += "<div class='game'>";
  }
  gameMetaTd += "<div class='row game-meta-header'>";
  gameMetaTd += "<div class='col-lg-4 col-md-12 time'>" + sortedData[i][j].time + "</div>";
  gameMetaTd += "<div class='col-lg-8 col-md-12 text-center sport'>" + sortedData[i][j].sport + "</div>";
  gameMetaTd += "</div>";
  gameMetaTd += "<div class='row'><div class='col-lg-12 col-md-12 location text-center'>" + sortedData[i][j].location + "</div></div>";
  if (sortedData[i][j].oneDayTournament != "") { //check if game is a one day tournament
    console.log(sortedData[i][j].oneDayTournament);
    //TODO format date so display looks better
    gameMetaTd += "<div class='row'><div class='col-lg-6 col-md-12'>"+sortedData[i][j].time+"-"+sortedData[i][j].endTime+"</div><div class='col-lg-6 col-md-12'>"+ formatDateForOneDayTourney(sortedData[i][j].date)+"</div></div>";
  } else {
     gameMetaTd += "<div class='row teams'><div class='col-sm-12 away'>" + sortedData[i][j].away + "</div><div class='col-sm-12 vs'> vs. </div><div class='col-sm-12 home'>" + sortedData[i][j].home + "</div></div>";
  }
  gameMetaTd += "</div></td></tr>";
  return gameMetaTd;
}

function createTdTableTag(day) { //creates html for the table that hold a group of game objects for the entire day. might have to break up and have tables that hold each game object by sport in the day
  var tdTable = "";
  tdTable = "<td class='day-td'><table class='table table-striped table-dark " + day + " game-table'>";
  return tdTable;
}

function getDateTimeForTable() { //checks current day and gets the days in the current week
  //TODO how does it know when to run to get first day of the week. When today = 0?
  //month is zero based
  var currentDate = new Date(2018, 9, 28);
  console.log(currentDate);
  var today = currentDate.getDay();
  console.log("Today: ", today);
  var firstDayOfWeek = 0;
  if (today != 0) {
    firstDayOfWeek = today - today;
  } else {
    firstDayOfWeek = today;
  }
  //TODO broke today. Maybe because of a new month. Gets the currentdate correct but when it incremments by one
  //CurrrentDat = oct 28 and next date was nov 29 incremented day and month?
  var firstDayOfWeekDate = new Date();
  firstDayOfWeekDate.setDate(currentDate.getDay() - today);
  console.log("firstDayOfWeekDate", firstDayOfWeekDate);
  var currentDaysOfWeek = [];
  for (var i = 1; i < 6; i++) {
    var date = new Date();
    date.setDate(firstDayOfWeekDate.getDay() + i);
    console.log(firstDayOfWeekDate.getDay() + " i= "+i + " " + date);
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

function sortBySport(arr) { //sorts sport alphabetically 
	arr.sort(function(a,b) {
  	var sportA = a.sport.toLowerCase();
  	var sportB = b.sport.toLowerCase();
  	if (sportA < sportB) {
  		return -1;
  	}
  	if (sportA > sportB) {
  		return 1;
  	}
  	return 0;
  });
	return arr;
}

function sortGamesOnDayBySportAndTime(arr) { //calls functions to sort data by time and then by sport
	arr = mergeSortTime(arr);
 	arr = sortBySport(arr);
 	return arr;
}

function formatDateForOneDayTourney(date) {
  var dates = date.split("/");
  console.log(dates);
  var monthName = getMonthOfTheYear(dates[0]);
  return monthName +" "+ dates[1];
}