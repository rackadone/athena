$(function () {
  $('.athena-save-btn').click(function (event) {
    var html = $('.athena-editor').html();

    // check if note is new
    var $fileName = $('.athena-file-name');
    if ($fileName.hasClass('athena-new-file')) {
      // create new file at server
      $.ajax({
        url: '/notes/save',
        type: 'POST',
        data: JSON.stringify({html: html}),
        contentType: 'application/json',
        success: function (data) {
          console.log(data);

          // on success, make changes
          $fileName.removeClass('athena-new-file');
          $fileName.text('File Saved');
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