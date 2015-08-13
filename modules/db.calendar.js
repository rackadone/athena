var mongoskin = require('mongoskin');
var dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/athena';
var db = mongoskin.db(dbUrl, {safe: true});

module.exports = {
  getMonth: function (callback) {
    // Get current date.
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    var day = today.getDay();

    var calendarCollection = db.collection('calendar');
    calendarCollection.find({year:year}).toArray(function (error, calendar) {
      if (error) {
        // If there is a problem querying from the
        // calendar collection, there must have been
        // a problem with db initialization.
        console.log(error);
        throw error;
      }
      else if (calendar.length) {
        // If current year exists, return
        // the target month object. When a new
        // calendar year is created, all months
        // are initalized by default so the
        // month MUST exist.
        console.log("calendar exists");
        var currentYear = calendar[0];
        callback(currentYear['months'][month]);
      }
      else {
        // if current year does not exist here,
        // create a new empty calendar for the
        // year.
        console.log("calendar doesn't exists");
        var currentYear = {
          'year': year,
          'months': [
            [], // jan
            [], // feb
            [], // mar
            [], // apr
            [], // may
            [], // jun
            [], // jul
            ["beatle juice", "truffle oil"], // aug
            [], // sep
            [], // oct
            [], // nov
            []  // dec
          ]
        };
        calendarCollection.insert(currentYear, function (err, result) {
          if (error)
            throw error;
          if (result) {
            console.log('New calendar for year added.');
            callback(currentYear['months'][month]);
          } 
        });
      }
    });    
  }
};