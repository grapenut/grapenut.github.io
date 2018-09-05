
// collapsable panels via panel-heading
$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('.panel-button').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('.panel-button').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
	}
});

// collapse navbar-toggle when selecting a nav link
$(document).on('click', '.navbar-collapse ul li a', function(e){
  var btn = $(document).find('.navbar-toggle');
  if (btn.css('display') !== 'none')
  {
    btn.click();
  }
});

// collapse navbar-toggle when selecting the navbar-header (only if it's out!)
$(document).on('click', 'a.navbar-brand', function(e){
  var btn = $(document).find('.navbar-toggle');
  if ($(document).find('.navbar-collapse').hasClass('in') && btn.css('display') !== 'none')
  {
    btn.click();
  }
});
