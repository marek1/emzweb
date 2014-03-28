/*
 * CSS Slider with lazy image loading
 * Author : Marek
 */
( function(slider, undefined) {

		slider.init = function(options) {

			var targetElement = document.getElementsByClassName('slider')[0], 
				inputs = targetElement.getElementsByTagName('input'), 
				articles = targetElement.getElementsByTagName('article'), 
				controlLabels = targetElement.getElementsByClassName('control-labels'), 
				counted = 0;
			function iterateOverInputs() {
				for (var i = 0; i < inputs.length; i++) {
					if (inputs[i].checked === true) {
						var slideValue = inputs[i].value - 1, src = articles[slideValue].getElementsByTagName('img')[0].getAttribute('src');
						if (src === null || src.indexOf('loader.gif') > 0) {
							articles[slideValue].getElementsByTagName('img')[0].setAttribute('src', options.images[i]);
						}
						counted++;
					}
				}
			}

			iterateOverInputs();
			function callIterateOverInputs() {
				if (counted < inputs.length) {
					setTimeout(function() {
						iterateOverInputs();
					}, 1000);
				}
			}

			/*
			 * previous / next buttons
			 */
			controlLabels[0].onclick = function() {
				callIterateOverInputs();
			};
			/*
			 * active label
			 */
			controlLabels[1].onclick = function() {
				callIterateOverInputs();
			};
		};

}(window.slider = window.slider || {}));
