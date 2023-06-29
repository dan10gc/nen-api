# A controller

- manages the incoming work HTTP requests
- decides which worker what service should do the work
- splits up the work into sizable units
- passes that work the necessary data from the HTTP requests off to the service(s)
- if the work requires multiple people services working on multiple things, orchestrates the work those service calls
- but does not do the work himself/herself (again, using a basic stereotype here!) (not a stereotype here, the controller shouldn't be doing the work)
