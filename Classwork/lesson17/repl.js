//linsting 17.4
//require mongoose in REPL
const mongoose = require("mongoose"),
//assign the subscriber model to a variable, using the model name and local project file
  Subscriber = require("./models/subscriber"),  
  Course = require("./models/course");  //require the course model

var testCourse, testSubscriber; //set up two variables outside the promise chain
//set up a database connection, using recipe_db
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;  //tell mongoose to use native promises   //listing 17.4


Subscriber.remove({}) //remove all subscribers and courses
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Course.remove({});
  })
  .then(items => console.log(`Removed ${items.n} records!`))
  .then(() => {   //create a new subscriber
    return Subscriber.create({
      name: "Jon",
      email: "jon@jonwexler.com",
      zipCode: "12345"
    });
  })
  .then(subscriber => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Jon"
    });
  })
  .then(subscriber => {
    testSubscriber = subscriber;
    console.log(`Found one subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {   //create a new course
    return Course.create({
      title: "Tomato Land",
      description: "Locally farmed tomatoes only",
      zipCode: 12345,
      items: ["cherry", "heirloom"]
    });
  })
  .then(course => {
    testCourse = course;  //create a new course instance
    console.log(`Created course: ${course.title}`);
  })
  .then(() => {   //associate the course with subscriber
    testSubscriber.courses.push(testCourse);
    testSubscriber.save();
  })
  .then(() => { //populate course document in subscriber
    return Subscriber.populate(testSubscriber, "courses");  
  })
  .then(subscriber => console.log(subscriber))
  .then(() => { //query subscribers where objectId is same as course
    return Subscriber.find({
      courses: mongoose.Types.ObjectId(testCourse._id)
    });
  })
  .then(subscriber => console.log(subscriber));
