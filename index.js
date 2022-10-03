/*************************
 * File Name: index.js
 * Purpose: Create server and handle switch cases
 * Created Date: 29 Sept 2022
 * Last Edited: 04 Oct 2022
 * Author: Makenzie Roberts
 * GitHub: https://github.com/MakenzieRoberts/Semester-3_Full-Stack_QAP2
 *************************/

// 		Require the built-in http module, which allows us to create a server.
const http = require("http");
// 		Require our routes.js file which contains all our functions to handle the different routes.
const routes = require("./routes.js");
// 		We use the http module's .createServer() method to create a server. We pass that method
//  	a callback function which gets executed every time a request is sent to the server.

http
	.createServer(function (request, response) {
		//      The request object contains info about the request made to the server, while the response
		//      object contains methods we can use to respond to the request.

		// console.log(response);

		console.log("\nRequest was made: " + request.url);
		// 		Our path is referring to our /views/ folder containing the html pages.
		let path = "./views/";

		// 		This is the switch statement we'll use to handle different routes. We use request.url to
		// 		check which route the request is for, and then we use response.statusCode to
		// 		set the status code of the response. We use path to set the path to the HTML
		// 		file we want to serve, and then we use the routes functions to handle the
		// 		response.
		switch (request.url) {
			case "/":
				console.log("Switch case '/ (home/index)' executed");
				path += "index.html";
				response.statusCode = 200;
				routes.indexPage(path, request.url, response);
				break;
			case "/about":
				// 		If the url contains '/about' (this info is contained in
				// 		request.url), change the path to './views/about.html'
				path += "about.html";
				// 		Manually set the statusCode for example/demo purposes. !LEARN more
				// 		use cases/why someone would do this IRL.
				response.statusCode = 200;
				// 		Pass that path to our aboutPage() function which passes it to
				// 		displayFile(), which uses it to fetch our about.html file so it
				// 		can be served.
				routes.aboutPage(path, request.url, response);
				// !LEARN why switch statement use break. Are they technically a loop?
				break;
			case "/contact":
				console.log("Switch case '/contact' executed");
				path += "contact.html";
				response.statusCode = 200;
				routes.contactPage(path, request.url, response);
				break;
			case "/blog":
				console.log("Switch case '/blog' executed");
				path += "blog.html";
				response.statusCode = 200;
				routes.blogPage(path, request.url, response);
				break;
			case "/portfolio":
				console.log("Switch case '/portfolio' executed");
				path += "portfolio.html";
				response.statusCode = 200;
				routes.portfolioPage(path, request.url, response);
				break;

			case "/contact-me":
				console.log("Switch case '/contact-me (redirect)' executed");
				// 		Redirect for depreciated contact page route
				response.statusCode = 301;
				response.setHeader("Location", "/contact");
				response.end();
				break;
			case "/about-me":
				console.log("Switch case '/about-me (redirect)' executed");
				// 		Redirect for depreciated contact page route
				response.statusCode = 301;
				response.setHeader("Location", "/about");
				response.end();
				break;
			case "/subscribe":
				console.log("Switch case '/subscribe' executed");
				path += "subscribe.html";
				response.statusCode = 200;
				// Set example cookie for demonstration purposes
				response.setHeader(
					"Set-Cookie",
					"subscribeCookie_exampleName=exampleValue1"
				);
				routes.subscribePage(path, request.url, response);
				break;
			case "/shop":
				console.log("Switch case '/shop' executed");
				path += "shop.html";
				response.statusCode = 200;
				// Set example cookie for demonstration purposes
				response.setHeader(
					"Set-cookie",
					"shopCookie_exampleName=exampleValue2"
				);
				routes.shopPage(path, request.url, response);
				break;
			default:
				console.log("Switch case '404 (default)' executed");
				path += "404.html";
				response.statusCode = 404;
				routes.fourOfourPage(path, request.url, response);
				break;
		}
	})
	// 		We use the .listen() method to make our server listen on port 3000.
	.listen(3000);
console.log("Listening on http://localhost:3000");
