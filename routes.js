/*************************
 * File Name: routes.js
 * Purpose: Serve html pages and emit events to the logger
 * Created Date: 29 Sept 2022
 * Last Edited: 04 Oct 2022
 * Author: Makenzie Roberts
 * GitHub: https://github.com/MakenzieRoberts/Semester-3_Full-Stack_QAP2
 *************************/

/* ********************************** Setup ********************************* */

const http = require("http");
// 		Import the fole system module, we'll be using this to read and serve our html pages.
const fs = require("fs");

// 		Requiring the logging functions in log.js so they can be used in index.js
const log = require("./log.js");

// 		Importing events module and assigning the class to a variable
const EventEmitter = require("events");

// 		Extending the EventEmitter class to make our own emitter.
//	    !LEARN: Never seen this syntax before - make sure to get familiar with it.
// 		!NOTE: The slightly different names, notice the capitalization.
class MyEmitter extends EventEmitter {}

// 		!LEARN more about constructors.
const myEmitter = new MyEmitter();

/* ***************************** Event Listeners **************************** */

// 		Let's create a listener, to catch our event (!NOTE: We'll be getting our path and
// 		response arguments when this function is called inside of index.js after importing
// 		this file.) This listener is purely to fire the console log, it's not used to
// 		trigger serving the html, a function is called inside our switch statement inside
// 		index.js. The information collected by these logs can be very useful, as they can
// 		be data-mined to analyze user behavior.
myEmitter.addListener("route", (event, level, msg) => {
	const date = new Date();

	console.log(
		date.toLocaleString() + " * " + level.toUpperCase() + " * " + msg
	);

	// Calling our function defined in log.js, which appends the data to a log file.
	log.logEvents(event, level, msg);
});

/* ************************** Display File Function ************************* */

// 		Before we fire the event, we need to make that displayFile function that uses the fs
// 		module to serve our about.html page.

// 		The code will display the file located at 'path' (the path/route initially passed from index.js)
function displayFile(path, response) {
	// 		Read the file and send it to the browser.
	fs.readFile(path, function (err, data) {
		// 		Check for errors...
		if (err) {
			// 		...if there are any, then it will print them out on screen.
			console.log(err);
			response.end();
			// 		If there are no errors and therefore successful...
		} else {
			console.log("HTML File was served - " + path);
			// 		Send the response with a status code of 200 and the Content-Type text/html.
			response.writeHead(response.statusCode, { "Content-Type": "text/html" });
			// 		It will write the data from the file in an html document.
			response.write(data);
			response.end();
		}
	});
}

/* ******************** Event Emitters / Firing the Event ******************* */

// 		These functions are called inside our switch statement in index.js when a switch case
// 		is executed.

// 		Event fires when the user navigates to the home page.
function indexPage(path, event, response) {
	// 		This is the function that will serve the html page
	displayFile(path, response);
	// 		myEmitter.emit("route", "information", "The index page was visited.");
	myEmitter.emit("route", event, "information", "The home page was visited.");
}

// 		Event fires when the user navigates to the about page.
function aboutPage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit("route", event, "information", "The about page was visited.");
}

// 		Event fires when the user navigates to the contact page.
function contactPage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit(
		"route",
		event,
		"information",
		"The contact page was visited."
	);
}

// 		Event fires when the user navigates to the contact page.
function blogPage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit("route", event, "information", "The blog page was visited.");
}

// 		Event fires when the user navigates to the portfolio page.
function portfolioPage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit(
		"route",
		event,
		"information",
		"The portfolio page was visited."
	);
}

// 		Event fires when the user navigates to the subscribe page.
function subscribePage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit(
		"route",
		event,
		"information",
		"The subscribe page was visited."
	);
}

// 		Event fires when the user navigates to the shop page.
function shopPage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit("route", event, "information", "The shop page was visited.");
}

// 		If no route is found, then the 404 page is served.
function fourOfourPage(path, event, response) {
	displayFile(path, response);
	myEmitter.emit(
		"route",
		event,
		"error",
		"a routing error occured for the " + event + " route."
	);
}

/* ***************************** Module Exports ***************************** */

//		!IMPORTANT: Exporting the functions so that they can be used in index.js
module.exports = {
	indexPage,
	aboutPage,
	contactPage,
	blogPage,
	portfolioPage,
	subscribePage,
	shopPage,
	fourOfourPage,
};
