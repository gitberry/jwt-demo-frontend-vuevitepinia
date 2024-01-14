# jwt demo: frontend using vue/vite/pinia and real API #

This is the frontend of two apps - an HTML5 frontend paired with a .NET 4.7 backend demonstrating JSON Web Token authentication, generation, and basic use cases.

## Frontend ##

I'm exploring Vue3, Vite and Pinia and Jason Watmore's was by far the best frontend example I could find (as of January 2024). So the frontend code was cloned from Jason's lovely example (https://jasonwatmore.com/post/2022/05/26/vue-3-pinia-jwt-authentication-tutorial-example) in May of 2022 (github here: https://github.com/cornflourblue/vue-3-pinia-jwt-authentication-example)

I wanted to learn the backend as well - so I commented out Jason's faked backend code (which worked wonderfully by the way - I just wanted to test the backend I was writing) and added some funny song names in order to demonstrate how well his code handled authentication via a backend API. If you're so inclined - set the minutes to live on your API to 1 minute and watch what happens 1 minute later - it gracefully logs out the user and gives the user gentle suggestions about logging in - and if they click on anything - it takes the user directly to the login dialog.

Something I wanted to test was what happens if someone starts messing with the URLs and tries to log in WHILE LOGGED IN - and initially it let them get a new token. I wasn't sure that this was a great thing (and it's debatable - so I won't get all rigid on you if you disagree), so I modified my backend to NOT grant a token while logged in and throw a 417 (Expectation Failed) and then modified Jason's example to handle it by giving the user gentle suggestions about logging in while being logged in... (I also learned some weirdness which I can only attribute to various servers idiosyncrasies around status codes and messages.)

## Backend ##

I have a hosted IIS server plan - and although they recently started hosting the newer .net CORE frameworks - I decided to for my first attempt, write the API in a stack I had more experience - and since my coding and deployment skills evolved along wwith .NET into the current 4.* framework over the past 2 decades - I chose that to keep my learning curve somewhat manageable. I was inspired by Bilal Shahzad's posting https://www.c-sharpcorner.com/article/asp-net-web-api-2-creating-and-validating-jwt-json-web-token/, and used that as my inspiration. When I had questions I cross referenced it with a posting I found by "Sean" https://decatechlabs.com/secure-webapi-using-jwt who had an actual repository I could peruse and test https://github.com/seanonline/Webapi_JWT_Authentication.

Once the authentication tested out - I threw a list of funny songs into a data structure and used it in a new API path for testing the frontend behavior when tokens expired or are tampered with.

## Working Together ##

I stubbed out an edit piece in the frontend to make the demo feel complete. As you see it today, the app demonstrates authentication, jwttoken generation, presentation of the token by the frontend within the header, validation of the token in the header by the API when requesting data, and some edge case situations handling. I made the frontend show an Editing component - but stubbed it out so it doesn't actually save any data. (I did not want my demo to actually talk to a database - that'd be beyond the scope of this demo.)

The goal was to make the two apps work on the same domain in order to avoid Cross Origin Resource Scripting (CORS). But as it was - I had to code for that possibility because the IDE running the .net 4.7 backend could not (or rather SHOULD not) run on the same port as the IDE running the Vue3 dev environment. So if you look in the backend code - dev's can specifically enable web calls from external sites via config settings.

So today - we have a two little apps coexisting on the same location (a neat trick in it's own right - look in the web.config of the HTML app), that show a user how to log in, and view data which requries a valid token, an about page available to both unauthenticated and authenticated users, and demonstrates to interested developers how editing might look on a simple app like this if they chose to further developer their Frontend and Backend API.

### If you care to look at my code: ###

Here's the backend code: https://github.com/gitberry/jwtnet47demo - and if you want to play around with a working version of it - I've deployed it here: https://jwtdem
northberry.ca/json Of course you will have to look through the frontend code to see how to call it from your own frontend - or if you're lucky and I have swagger enabled 
you can experiment with swagger: https://jwtdemo.northberry.ca/json/swagger.

Here's the frontend code: https://github.com/gitberry/jwtvuevitepinademo - and if you want to play around with it - I've deployed it here: https://jwtdemo.northberry.ca/ 

### Testing tools: ###

https://jwt.io - helps inspect the tokens - and particularly nice because you don't need to decode them - leave them base64 encoded as they are generated and paste them t in to be reviewed.
https://www.epochconverter.com - helps the exp(iry) value - a unix time value...
I would have had to use something like Postman or Fiddler if I hadn't had my own demo frontend where I could use native browser dev tools to inspect values etc... 
