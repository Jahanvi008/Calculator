//travel to this folder from terminal and type "nodemon calculator.js to run this."
//Then go on localhost:3000 on browser and it will display the html page.

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

    const { num1, num2, operation } = req.body;
    let result;

    if(operation == "add")
    {
        result=parseFloat(num1) + parseFloat(num2);
    }else if(operation == "subtract")
    {
        result=parseFloat(num1)-parseFloat(num2);
    }else if (operation == "multiply")
    {
        result=parseFloat(num1) * parseFloat(num2);
    }else if(operation == "divide"){
        if (parseFloat(num2) === 0) 
        {
            result = "Cannot divide by zero. Please enter a valid number";
        } else 
        {
            result = parseFloat(num1) / parseFloat(num2);
        }
    }else{
        result="Please select an option or Invalid input" ;
    }

    res.send("The result for the calculation is: " + result);

})

app.get("/bmicalculator", function(req, res){
    res.sendFile(__dirname + "/bmicalculator.html");
})

app.post("/bmicalculator", function(req, res){
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = weight / (height * height);

    //res.send("Your BMI is " + bmi);

    if (bmi <= 18.5)
    {
        res.send("Your BMI is " + bmi + "\n\nAccording to the general BMI chart, you are Underweight");
    }else if(18.5<bmi && bmi<=24.9)
    {
        res.send("Your BMI is " + bmi + "\nAccording to the general BMI chart, you are Normal weight");
    }else if(25<= bmi && bmi<=29.9)
    {
        res.send("Your BMI is " + bmi + "\nAccording to the general BMI chart, you are Overweight");
    }else if(bmi >= 30)
    {
        res.send("Your BMI is " + bmi + "\nAccording to the general BMI chart, you are under Obesity category");
    }
})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})