var $jx = jQuery.noConflict();

$jx(document).ready(function(){

});

function projectcontactSuccess($data) {
	if ($data['redirect_to']) {
		window.location.href = $data['redirect_to'];
	}
}