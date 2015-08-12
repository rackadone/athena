/*jshint multistr: true */

var populateCalendar = function ($calendar) {
  var NUM_ROWS_IN_CALENDAR = 6;
  var createRow = function () {
    var NUM_CELLS_IN_ROW = 7;
    var cellHtml = '\
      <div class="col-sm-1 athena-calories-calendar-cell">\
        <div class="row">D#</div>\
        <div class="row">Content</div>\
      </div>\
    ';
    var rowHtml = '<div class="row"></div>';
    var newRow = $(rowHtml);
    for (var i = 0; i < NUM_CELLS_IN_ROW; i++) {
      newRow.append($(cellHtml));
    }
    return newRow;
  };

  // Append week rows to calendar
  for (var i = 0; i < NUM_ROWS_IN_CALENDAR; i++) {
    $calendar.append(createRow());
  }
};

var calendarAddHeader = function ($calendar) {
  var NUM_DAYS_IN_WEEK = 7;
  // Add days of week to calendar
  var daysInWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'sunday',
    'saturday',
  ];
  var calendarHeaderHtml = '<div class="row"></div>';

  var $calendarHeader = $(calendarHeaderHtml);
  for (var i = 0; i < NUM_DAYS_IN_WEEK; i++) {
    $calendarHeader.append('<div class="col-sm-1 athena-calories-calendar-day">' + daysInWeek[i] + '</div>');
  }

  $calendar.prepend($calendarHeader);
}

// var $calendar = $('.athena-calories-calendar');
// calendarAddHeader($calendar);
// populateCalendar($calendar);
