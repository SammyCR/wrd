/* File: browser_action.js
 * -----------------------
 * This javascript file listens for a click on the submit
 * button, and responds by saving the current value of the
 * textarea to Chrome's local storage. You shouldn't have to
 * change this file unless you also change the corresponding
 * browser_action.html file.
 */

// Saves settings to chrome.storage.local.
function save_settings() {
	var $textarea = document.getElementById('settings');
	var text = $textarea.value;
	chrome.storage.local.set({
		'settings': text
	}, function() {
		// This code block is executed when the settings are saved.
		var $status = document.getElementById('status');
		$status.textContent = "Settings saved.";
		setTimeout(function() {
		  status.textContent = '';
		}, 1000);
	});
}

// Retrieves settings from chrome.storage.local.
function restore_settings() {
	chrome.storage.local.get('settings', function(response) {
		var text = response.settings || "";
		document.getElementById('settings').value = text;
	});
}

// Clear all settings in chrome.storage.local
function clear_settings() {
	chrome.storage.local.clear(function() {
		var $textarea = document.getElementById('settings');
		$textarea.value = "";
		var $status = document.getElementById('status');
		$status.textContent = "Settings cleared.";
		setTimeout(function() {
		  status.textContent = '';
		}, 1000);
	});
}

// Restore settings when the DOM loads
document.addEventListener('DOMContentLoaded', restore_settings);
// Save settings when the save button is clicked.
document.getElementById('send').addEventListener('click', sendmessage);
// Clear settings when the clear button is clicked.
document.getElementById('send').addEventListener('click', clearbox);
//clears textbox when send button clicked

function sendmessage(){

	var originalString = document.getElementById("settings").value;

	var nameString = document.getElementById("name").value;

	var nameAndMessage = nameString + ": " + originalString;

	var lenthOfString = nameAndMessage.length;

	var extraCharacters = "";

	for (i = 0; i < 140 - lenthOfString; i++) { //Makes a string with 140 - lenthOfString ~ characters
		extraCharacters += "~"
	}

	var newString = nameAndMessage + extraCharacters;


	var content = JSON.stringify({"message": newString}); //The new message to send (has a length of 140 + 14 characters)


	//var content = JSON.stringify({"message": document.getElementById("settings").value}); //ORIGINAL MESSAGE TO SEND

	$.ajax({
  	url: "http://localhost:8000",
  	//url: "http://949d4091.ngrok.io/", //Enter the url of the localhost or the tunnel's url
  	type: "POST",
  	data: content,
  	success: function(d,status,XHR){
 		console.log(d) 
  	}
  })}
  function getmessage(){
  	$.ajax({
  		url: "http://localhost:8000",
  		//url: "http://949d4091.ngrok.io/", //Enter the url of the localhost or the tunnel's url
        type: "GET",
        crossDomain: true,
  		success: function(d,status,XHR){
			console.log(d)
			var arrD = JSON.parse(d)
			var revD = arrD.reverse()
			console.log(revD)
			console.log(revD)
			strD = revD.toString()
  			//var u = strD.slice(1, -1) //Take off the brackets
  			var q = strD.replace(/['"]+/g, '') //takes off the quotation marks
  			var r = q.split(",").join(":") //Break the array at commas
			var f = r.replace(/[~]+/g, '') //gets rid of the ~ character
			console.log(f)
			var nameVar = f.split(":")
			console.log(nameVar)
			let finalList = []
			let pair = []
			for (var i = 0; i < nameVar.length; i=i+2) {
				pair = [nameVar[i], nameVar[i+1]]
				finalList.push(pair)
			  }
			document.getElementById("messageDiv").innerHTML = ''

			for (var i = 0; i < finalList.length; i=i+1) {
				console.log("finalList: " + finalList)
				var newDiv = document.createElement("div")
				newDiv.className = "individualMessageDiv"
				var name = document.createElement("p")
				name.className = "name"
				var message = document.createElement("p")
				message.className = "message"
				var nameNode = document.createTextNode(finalList[i][0])
				var messageNode = document.createTextNode(finalList[i][1])
				console.log("name: " + finalList[i][0])
				console.log("message: " + finalList[i][1])
				name.appendChild(nameNode)
				message.appendChild(messageNode)
				var lineBreak = document.createElement("br")
				newDiv.appendChild(name)
				newDiv.appendChild(message)
				newDiv.appendChild(lineBreak)
				var mainMessageDiv = document.getElementById("messageDiv")
				mainMessageDiv.appendChild(newDiv)

			}
			
			/*
			var newMessage = document.createElement("p")
			var node = document.createTextNode("Test HTML p from JavaScript")
			newMessage.appendChild(node)
			var mainMessageDiv = document.getElementById("messageDiv")
			mainMessageDiv.appendChild(newMessage)
			*/
			//document.getElementById("messages").innerHTML = finalList //originally f
			
			//document.getElementById("names").innerHTML = nameVar
            console.log("success running");
 		}
  	
  	})
  }

	getmessage();
  	setInterval(function() {getmessage()}, 2000);

function clearbox() //supposed to clear textbox after user hits send
{
	document.getElementById("settings").value = " ";
}