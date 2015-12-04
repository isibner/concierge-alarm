console.log(times);


$(document).ready(function () {
  $('#start-time').val(times['start-time'].format(FORMAT_STR));
  $('#end-time').val(times['end-time'].format(FORMAT_STR));
});
