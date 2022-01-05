const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {   
    // Iteration 2 step to be commented
    /*Recipe.create(data[0])
    .then((dbSuccess) => {
      console.log("The title of the recipe is : ", data[0].title);
    })
    .catch((dbError) => {
      console.log("create recipe failure !");
    });*/
    //Iteration 3 step 
    Recipe.insertMany(data)
    .then((dbSuccess) => {
      data.forEach(recipe => console.log("The title of the recipe is : ", recipe.title))      
    })
    .catch((dbError) => {
      console.log("insert many failure !");
      console.error(dbError);
    });
    //Iteration 4 step: needed to add a setTimout to execute the update after the create
    setTimeout( () =>   {
      Recipe.findOneAndUpdate(
      { duration: 220 },
      { duration: 100 },
      { new: true })
      .then((dbSuccess) =>console.log("The recipe has been successfully updated!"))
      .catch((dbError) => {
        console.log("update failure !");
        console.error(dbError);
      })      
    }, 1000 )  
    //Iteration 5 step: needed to add a setTimout to execute the delete after the update and the insert
    setTimeout( () =>   {
      Recipe.deleteOne(data[2])
      .then((dbSuccess) => console.log("The recipe has been successfully deleted!"))        
      .catch((dbError) => {
        console.log("insert many failure !");
        console.error(dbError);
       })
    }, 1000)
    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  // iteration 6 : needed to add a setTimeout with a greater delay to execute it after all other tasks
  setTimeout( (() =>  mongoose.connection.close(() => console.log('Mongoose default connection disconnected '))),2000);
