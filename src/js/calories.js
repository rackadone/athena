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
  // Event handlers for item input
  // * * * * * * * * * * * * * * *
  $('#athena-calories-form-modal').on('input', '.athena-calories-item', function() {
    var itemInput =  $(this).val();
    var $parentRow = $(this).closest('.athena-calories-entry-row');
    if (itemInput.length) {
      $parentRow.find('input:not(.athena-calories-item)').prop("disabled", false);
    }
    else {
      $parentRow.find('input:not(.athena-calories-item)').prop("disabled", true);
    }
  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-item', function() {
    modalClearFeedback();
    var $parentRow = $(this).closest('.athena-calories-entry-row');
  });

  $('#athena-calories-form-modal').on('focus', '.athena-calories-item', function() {

  });

  // * * * * * * * * * * * * * * *
  // Event handlers for ratio input
  // * * * * * * * * * * * * * * *
  $('#athena-calories-form-modal').on('input', '.athena-calories-ratio', function() {
    modalClearFeedback();
    $(this).removeClass('athena-input-error');
    var $parentRow = $(this).closest('.athena-calories-entry-row');
    var ratioInput =  $(this).val();

    if (ratioInput.length) {
      try {
        var ratio = parseRatioInput(ratioInput);
        $(this).removeClass('athena-input-error');

        // Fill the total cal input
        // if user has already entered mass.
        var massInput = $parentRow.find('.athena-calories-mass').val();
        if (massInput.length) {
          var mass = parseFloat(massInput);
          $parentRow.find('.athena-calories-energy').val(mass * ratio);
        }
      }
      catch(err) {
        $(this).addClass('athena-input-error');
        modalDisplayFeedback("Enter a number (ex 34.00) or ratio (ex 14/100)");
      } 
    }
    else {
      $(this).removeClass('athena-input-error');
      $parentRow.find('.athena-calories-energy').val('');
    }
  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-ratio', function() {
    modalClearFeedback();
  });

  $('#athena-calories-form-modal').on('focus', '.athena-calories-ratio', function() {
    modalClearFeedback();
    var ratioInput =  $(this).val();

    if (ratioInput.length) {
      try {
        var ratio = parseRatioInput(ratioInput);
      }
      catch(err) {
        modalDisplayFeedback("Enter a number (ex 34.00) or ratio (ex 14/100)");
      } 
    }
  });

  // * * * * * * * * * * * * * * *
  // Event handlers for mass input
  // * * * * * * * * * * * * * * *
  $('#athena-calories-form-modal').on('input', '.athena-calories-mass', function() {
    modalClearFeedback();
    $(this).removeClass('athena-input-error');
    var $parentRow = $(this).closest('.athena-calories-entry-row');
    var massInput = $(this).val();

    if (massInput.length) {
      try {
        var mass = parseNumberInput(massInput);

        // Fill the total cal input
        // if user has already entered ratio.
        var ratioInput = $parentRow.find('.athena-calories-ratio').val();
        if (ratioInput.length) {
          var ratio = parseRatioInput(ratioInput);
          $parentRow.find('.athena-calories-energy').val(mass * ratio);
        }
      }
      catch (err) {
        $(this).addClass('athena-input-error');
        modalDisplayFeedback("Enter a valid number (ex 34, 34.3)");
      } 
    }
    else { // meaning 0 mass
      $(this).removeClass('athena-input-error');

      // Remove value in energy
      $parentRow.find('.athena-calories-energy').val('');
    }
  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-mass', function() {
    modalClearFeedback();
  });

  $('#athena-calories-form-modal').on('focus', '.athena-calories-mass', function() {
    var massInput = $(this).val();
    if (massInput.length) {
      try {
        var mass = parseNumberInput(massInput);
      }
      catch (err) {
        modalDisplayFeedback("Enter a valid number (ex 34, 34.3)");
      }
    }
  });

  // * * * * * * * * * * * * * * *
  // Event handlers for energy input
  // * * * * * * * * * * * * * * *
  $('#athena-calories-form-modal').on('input', '.athena-calories-energy', function() {
    modalClearFeedback();
    $(this).removeClass('athena-input-error');
    var $parentRow = $(this).closest('.athena-calories-entry-row');
    var energyInput = $(this).val();

    if (energyInput.length) {
      try {
        var mass = parseNumberInput(energyInput);
        $(this).addClass('athena-input-manual');
        $parentRow.find('input:not(.athena-calories-energy, .athena-calories-item)').prop('disabled', true);
        modalDisplayFeedback("Total calories manually entered.", "manual");
      }
      catch (err) {
        $(this).removeClass('athena-input-manual');
        $(this).addClass('athena-input-error');
        $parentRow.find('input:not(.athena-calories-energy, .athena-calories-item)').prop('disabled', false);
        modalDisplayFeedback("Enter a valid number (ex 34, 34.3)");
      } 
    }
    else { // meaning 0 calories
      $(this).removeClass('athena-input-error');

      // Remove 'manually entered' indicator
      $(this).removeClass('athena-input-manual');

      $parentRow.find('input:not(.athena-calories-energy, .athena-calories-item)').prop('disabled', false);
    }
  });

  $('#athena-calories-form-modal').on('blur', '.athena-calories-energy', function() {
    modalClearFeedback();
    var $parentRow = $(this).closest('.athena-calories-entry-row');

    // If left empty and the values of ratio and mass
    // were already entered, auto calculate and populate.

    var ratioInput = $parentRow.find('.athena-calories-ratio').val();
    var massInput = $parentRow.find('.athena-calories-mass').val();
    var mass = parseNumberInput(massInput);
    var ratio = parseRatioInput(ratioInput);

    $(this).val(mass * ratio);
  });

  $('#athena-calories-form-modal').on('focus', '.athena-calories-energy', function() {
    if ($(this).hasClass('athena-input-manual')) {
      modalDisplayFeedback("Total calories manually entered.", "manual");
    }
    else if ($(this).hasClass('athena-input-error')) {
      modalDisplayFeedback("Enter a valid number (ex 34, 34.3)");
    }
  });

  // * * * * * * * * * * * * * * *
  // Functions for feedback display
  // * * * * * * * * * * * * * * *
  var modalDisplayFeedback = function (feedback, type) {
    if (type === 'manual') {
      $('.athena-calories-modal-feedback').html('<span style="color:#0058FF">'+ feedback +'</span>');  
    }
    else {
      $('.athena-calories-modal-feedback').html('<span>'+ feedback +'</span>');
    }
    
  };

  var modalClearFeedback = function () {
    $('.athena-calories-modal-feedback').html('');
  };


  $('.modal-body').caloricInputSetup();

});

// * * * * * * * * * * * * * * *
// Functions for input validation & parsing
// * * * * * * * * * * * * * * *

// Parses input
// Condition: input is not undefied or null
// Returns float value
var parseRatioInput = function (ratio) {
  // check if input is in form '=xx/xx'
  var parsedRatioArr = ratio.split("/");

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

var parseNumberInput = function (mass) {
  var result = parseInt(mass);
  if (isNaN(result)) {
    throw "Invalid input";
  }
  else {
    return result;
  }
}


var validateItem = function (item) {
  // TODO: Add code that validates item field
  return true;
}

// * * * * * * * * * * * * * * *
// Functions directly related to calendar ui
// * * * * * * * * * * * * * * *
var createRow = function () {
  return '<div class="row athena-calories-entry-row">' +
           '<div class="col-md-4 col-md-offset-1">' +
             '<div class="input-group"></div>' +
             '<input type="text" placeholder="" class="form-control athena-calories-item">' +
            '</div>' +
            '<div class="col-md-2">' + 
              '<div class="input-group"></div>' + 
              '<input type="text" placeholder="" class="form-control athena-calories-ratio" disabled>' +
            '</div>' + 
            '<div class="col-md-2">' +
              '<div class="input-group"></div>' + 
              '<input type="text" placeholder="" class="form-control athena-calories-mass" disabled>' +
            '</div>' + 
            '<div class="col-md-2">' + 
              '<div class="input-group"></div>' + 
              '<input type="text" placeholder="" class="form-control athena-calories-energy" disabled>' + 
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


