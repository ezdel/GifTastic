var gifs = ['', 'steak', 'pizza', 'soup', 'eggs', 'hamburger', 'hot dog', 'candy', 'popcorn', 'soda', 'cheese', 'toast', 'sushi' ];
function showGifs(){
	var gifName = $(this).data('name');
	var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + gifName + '&api_key=dc6zaTOxFJmzC&limit=10&offset=0';

	$.ajax({url: queryURL, method: 'GET'})
	.done(function(response){
		$('#gifArea').empty();
		// $('.gifBlock').empty();
		for (var i = 0; i < 10; i++){
			// var gifBlock = $('<div>');
			// gifBlock.addClass('gifBlock');
			// $('#gifArea').append(gifBlock);
			var imageURL = response.data[i].images.fixed_height_still.url;
			var animateURL = response.data[i].images.fixed_height.url;
			var stillURL = response.data[i].images.fixed_height_still.url;
			var gifBlock = $('<div>');
			gifBlock.addClass('col-md-4')
			gifBlock.append('<h4>Rating: ' + response.data[i].rating + '<h4>');
			
			// var rating = $('<h4>Rating: ' + response.data[i].rating + '<h4>');
			//rating.addClass('col-md-4');
			//$('#gifArea').append(rating);
			var gifImage = $('<img>');
			gifImage.addClass('col-md-4');
			gifImage.attr('src', imageURL);
			gifImage.attr('data-animate', animateURL);
			gifImage.attr('data-still', stillURL);
			gifImage.attr('data-state', 'still');
			gifBlock.append(gifImage);
			$('#gifArea').append(gifBlock);
			
				
		};
		
	});
	

};
function renderButtons(){
	$('#buttonArea').empty();
	for (var i = 1; i < gifs.length; i++){
		var btn = $('<button>');
		btn.addClass('gifbtn');
		btn.attr('data-name', gifs[i]);
		btn.text(gifs[i]);
		$('#buttonArea').append(btn);
	};
};

$('#addButton').on('click', function(){
	var gif = $('#gif-input').val().trim();
	$('#gif-input').val('');
	if (gifs.indexOf(gif) < 0) {	
		gifs.push(gif);
		renderButtons();
	}
	return false;
});

function animate(){
	var state = $(this).attr('data-state');
	if (state === 'still'){
		var dataAnimate = $(this).attr('data-animate');
        $(this).attr('src', dataAnimate);
        $(this).attr('data-state', 'animate');
	}
	else {
		var dataStill = $(this).attr('data-still');
         $(this).attr('src', dataStill);
         $(this).attr('data-still');
         $(this).attr('data-state', 'still');
	}
};

$(document).on('click', '.gifbtn', showGifs);
$(document).on('click', '.col-md-4', animate);

renderButtons();

	
