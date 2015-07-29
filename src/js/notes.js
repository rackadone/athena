$(function () {
  $('.athena-save-btn').click(function (event) {
    // check if note is new
    var $fileDescr = $('.athena-file-descr input');
    if ($fileDescr.hasClass('athena-new-file')) {
      // create new file at server
      var title = $('.athena-file-descr input').val();
      var html = $('.athena-editor').html();

      $.ajax({
        url: '/notes/save',
        type: 'POST',
        data: JSON.stringify({
          title: title,
          html: html
        }),
        contentType: 'application/json',
        success: function (data) {
          console.log(data);

          // on success, make changes
          $fileDescr.removeClass('athena-new-file');
          //$fileDescr.text('File Saved');
        },
        error: function (jqXHR, textStatus, err) {
          console.log('text status '+textStatus+', err '+err);
        }
      });  
    }
    else {
      // make update to file
    }

  });
});