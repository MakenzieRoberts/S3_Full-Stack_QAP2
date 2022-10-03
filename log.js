/*************************
 * File Name: logEvents.js
 * Purpose: To provide a logging feature
 * Created Date: 29 Sept 2022
 * Last Edited: 04 Oct 2022
 * Author: Makenzie Roberts
 * GitHub: https://github.com/MakenzieRoberts/Semester-3_Full-Stack_QAP2
 *************************/

/* ****************************** BONUS PART 1 ****************************** */
// !NOTE: I tried my best to complete part 2, but I just couldn't figure out how to pass
// the data from the npm package function to a function that would serve that data. I'm
// pretty sure I could figure out how to do it straight from an api, but I couldn't find
// any npm packages where I could figure how to use the retrieved data outside it's
// function.

// Require file system module
const fs = require("fs");

// To create a new log file every day we need to check the current date and create a new
// folder / file if there is none present for that date.

// Logic:
//              1. Get the current date
//              2. Format date appropriately for log item, folders, filename
//              3. Check if a log folders exists for the current date (check year, then month)
//                 3.a. if they don't, create them
//              4. Append log item to current day's file (if it doesn't exist, .appendFile will create it)

// NPM installed Modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// Node.js common core global modules
// const fs = require('fs');
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (event, level, message) => {
	// Format date+time for log item
	const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
	const logItem = `${dateTime}\t${level}\t${event}\t${message}\t${uuid()}`;

	// Retrieve year
	let year = dateTime.slice(0, 4);

	// Retrieve month (long)
	let month = `${format(new Date(), "MMMM")}`;

	try {
		// Check if /log/ directory exists
		if (!fs.existsSync(path.join(__dirname, "logs"))) {
			// If it doesn't, create it
			await fsPromises.mkdir(path.join(__dirname, "logs"));
		}
		// Check if /log/year directory exists
		if (!fs.existsSync(path.join(__dirname, "logs", year))) {
			// If it doesn't, create it
			await fsPromises.mkdir(path.join(__dirname, "logs", year));
		}
		// Check if /log/year directory exists
		if (!fs.existsSync(path.join(__dirname, "logs", year, month))) {
			// If it doesn't, create it
			await fsPromises.mkdir(path.join(__dirname, "logs", year, month));
		}
		// Format today's date for filename
		const fileName = `${format(new Date(), "yyyyMMdd")}` + "_httpevents.log";
		// Append log item to current day's file (if it doesn't exist, .appendFile will create it)
		await fsPromises.appendFile(
			path.join(__dirname, "logs", year, month, fileName),
			logItem + "\n"
		);
		// Error handling
	} catch (err) {
		console.log(err);
	}
};

// Exporting so it can be used inside routes.js
module.exports = {
	logEvents,
};
