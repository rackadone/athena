// jQuery plugin for Caloric input.
// 
// What its for:
// - Insert rows calorie input as such:
// item name | cal/g | g | total cal
// - Handles & validates user input
// - Autocompletes certain input
// - Aggregates user input

(function($){

  //Attach this new method to jQuery
  $.fn.extend({ 
    
    //This is where you write your plugin's name
    caloricInputSetup: function() {
      //Iterate over the current set of matched elements
      console.log('caloric input setup');
      debugger;
      return this.each(function() {
        console.log('setup');
        console.log(this);
        
      });
    },
    caloricInputResults: function() {
      return this.each(function () {
        console.log('results');
        console.log(this);
      });
    }
  });
  
//pass jQuery to the function, 
//So that we will able to use any valid Javascript variable name 
//to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )   
})(jQuery);
