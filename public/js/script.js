$(function() {
  $('#start-date').fdatepicker({
    initialDate: '01-01-2000',
    format: 'mm-dd-yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
    closeIcon: 'X',
    closeButton: true,
  });

  $('#end-date').fdatepicker({
    initialDate: '01-01-2017',
    format: 'mm-dd-yyyy',
    disableDblClickSelection: true,
    leftArrow: '<<',
    rightArrow: '>>',
    closeIcon: 'X',
    closeButton: true,
  });

  $('#analyze').on('click', function() {});
});
