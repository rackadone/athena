$(function () {
  $('.athena-save-btn').click(function (event) {
    var data = $('.athena-editor').html();
    console.log(data);

    // make ajax call to endpoint.
    $.ajax({
      url: '/notes/save',
      type: 'POST',
      data: JSON.stringify({html: data}),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
      },
      error: function (jqXHR, textStatus, err) {
        console.log('text status '+textStatus+', err '+err);
      }
    });
  });
});