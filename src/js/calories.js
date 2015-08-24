/*jshint multistr: true */

$(function () {
  $('.athena-calories-calendar li').click(function(event) {
    event.preventDefault();

    // Fill in fields
    // That are from database into List.

    // Enter Logic that fills in HTML of modal #athena-calories-form-modal here!
    // Depending on items, number of rows may be different.


    $('#athena-calories-form-modal').modal({
      keyboard: true,
      show: true,
      backdrop: true
    });
  });

  $('#calories-add-item-rows-btn').click(function(event) {
    $(createRow()).insertBefore($(this).closest('.athena-calories-modal-btn-row'));
  });


  // Focus on first Input box after opened.
  $('#athena-calories-form-modal').on('shown.bs.modal', function() {
    $('.form-control')[0].focus();
  });

  // * * * * * * * * * * * * * * *
  // Event handlers for input blur
  // * * * * * * * * * * * * * * *
  $('#athena-calories-form-modal').on('blur', '.athena-calories-item', function() {
    console.log('item blured');
    var $parentRow = $(this).closest('.athena-calories-entry-row');

  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-ratio', function() {
    console.log('ratio blured');
    var $parentRow = $(this).closest('.athena-calories-entry-row');
    var ratioInput =  $(this).val();

    if (ratioInput.length) {
      try {
        $(this).val(parseRatioInput(ratioInput));  
      }
      catch(err) {
        console.log("There was an error in the input");
      }
      
    }

  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-mass', function() {
    console.log('mass blured');
    var $parentRow = $(this).closest('.athena-calories-entry-row');

  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-energy', function() {
    console.log('energy blured');
    var $parentRow = $(this).closest('.athena-calories-entry-row');

  });

  var modalDisplayFeedback = function (feedback) {
    
  };

  var modalClearFeedback = function () {

  };

});

// Parses input
// Condition: input is not undefied or null
// Returns float value
var parseRatioInput = function (item) {
  // check if input is in form '=xx/xx'
  var parsedRatioArr = item.split("/");

  if (parsedRatioArr.length == 2) {
    var dividend = parseFloat(parsedRatioArr[0]),
        divisor = parseFloat(parsedRatioArr[1]);
    if (isNaN(dividend) || isNaN(divisor)) {
      throw "Invalid input";
    }
    else {
      return dividend/divisor;
    }
  }
  else if (parsedRatioArr.length = 1) {
    var result = parseFloat(parsedRatioArr[0]);
    if (isNaN(result)) {
      throw "Invalid input";
    }
    else {
      return result;
    }
  }
  else {
    throw "Invalid input";
  }
}

var validateItem = function (item) {
  // TODO: Add code that validates item field
  return true;
}

var createRow = function () {
  return '<div class="row athena-calories-entry-row">' +
           '<div class="col-md-4 col-md-offset-1">' +
             '<div class="input-group"></div>' +
             '<input type="text" placeholder="" class="form-control athena-calories-item">' +
            '</div>' +
            '<div class="col-md-2">' + 
              '<div class="input-group"></div>' + 
              '<input type="text" placeholder="" class="form-control athena-calories-ratio">' +
            '</div>' + 
            '<div class="col-md-2">' +
              '<div class="input-group"></div>' + 
              '<input type="text" placeholder="" class="form-control athena-calories-mass">' + 
            '</div>' + 
            '<div class="col-md-2">' + 
              '<div class="input-group"></div>' + 
              '<input type="text" placeholder="" class="form-control athena-calories-energy">' + 
            '</div>' + 
          '</div>';
};


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
