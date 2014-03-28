(function() {

	var doc = this.document;

	doc.getElementById('show_impressum').onclick = function() {
		doc.getElementById('impressum').style.display = 'block';
	};

	doc.getElementById('submit_contact_form').onclick = function() {
		if (validateForm(doc)) {

			var name = doc.getElementById('name').value;
			var email = doc.getElementById('email').value;
			var message = doc.getElementById('textarea').value;

			var post_url = "http://emzweb.de/message";

			var post_data = {
				'name' : name,
				'email' : email,
				'message' : message
			};

			if (ajaxFunction(post_url, post_data)) {
				var form_node = doc.getElementById('form');
				form_node.parentNode.removeChild(form_node);
				var success_node = doc.getElementsByClassName('success');
				removeClass(success_node[0], 'hide');
			}

		}
	};
	function ajaxFunction(url, data) {

		var string = JSON.stringify(data);

		var ajaxRequest;
		// The variable that makes Ajax possible!

		try {
			// Opera 8.0+, Firefox, Safari
			ajaxRequest = new XMLHttpRequest();
		} catch (e) {
			// Internet Explorer Browsers
			try {
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1) {
				try {
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {
					// Something went wrong
					return false;
				}
			}
		}

		ajaxRequest.open("POST", url, true);

		ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		// Create a function that will receive data sent from the server
		ajaxRequest.onreadystatechange = function() {
			if (ajaxRequest.readyState == 4) {
				return true;
			}
		};
		/*
		 * To receive the data in PHP
		 * $data= $_POST['data];
		 * $obj = json_decode($data);
		 * $name = $obj->{'name'};
		 * etc.
		 */
		ajaxRequest.send('data=' + string);
	}

	function getHttpRequest() {

		var xmlhttp = null;
		// Mozilla
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		// IE
		else if (window.ActiveXObject) {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.open("GET", 'httprequest.php', true);
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState != 4) {
				$('ergebnis').innerHTML = 'Seite wird geladen ...';
			}
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				$('ergebnis').innerHTML = xmlhttp.responseText;
			}
		};
		xmlhttp.send(null);
	}
	function hasClass(ele, cls) {
		return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}

	function addClass(ele, cls) {
		if (!hasClass(ele, cls))
			ele.className += " " + cls;
	}

	function removeClass(ele, cls) {
		if (hasClass(ele, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			ele.className = ele.className.replace(reg, ' ');
		}
	}
	function validateForm(doc) {

		var isFormValid = true;
		doc.onkeydown = function(event) {
			console.log('event.target : ',event.target);
			if (hasClass(event.target, 'required') || hasClass(event.target, 'email')) {
				removeClass(event.target, 'error');
			}
		};
		var required_items = doc.getElementsByClassName('required');

		for (var i = 0; i < required_items.length; i++) {

			var requite_item = required_items[i];
			if (requite_item.value === '') {
				addClass(requite_item, 'error');
				isFormValid = false;
			}
		}

		var email_items = doc.getElementsByClassName('email');

		for (var j = 0; j < email_items.length; j++) {

			var a = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

			var email_item = email_items[j];
			if (!a.test(email_item.value)) {
				addClass(email_item, 'error');
				isFormValid = false;
			}
		}

		return isFormValid;

	}

})();
