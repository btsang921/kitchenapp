

// our global variables to store things, just using arrays but feel free to change it to maps if want to
// map item in shopping list to cost or how many or store (if we are doing that)
let shoppingList = new Array();
//map item in inventory to how much or date bought (if we are doing that)
let inventory = new Array();
//allergen info for recipes.
let allergenInformation = new Array();
// level of recipes
let level = new String();

let pinned = new Array();



let recipesJson =' [{"name":"Cereal","info":[" easy ","| nut-free ","| gluten-free ","| vegetarian ","| vegan |"],"ingredients":[{"quantity":"1 cup","name":"Cereal"},{"quantity":"2 cups ","name":"Milk"}],"steps":["Put cereal of choosing into bowl","Pour milk in and enjoy"],"imageURL":"recipeImages/cereal.jpeg"},{"name":"Banana Bread","info":["easy"," | vegetarian | ","vegan"],"ingredients":[{"quantity":"2","name":"Bananas"},{"quantity":"1/3 cup","name":"butter"},{"quantity":"1/2 teaspoon","name":"Baking Soda"},{"quantity":"3/4 cup","name":"Sugar"},{"quantity":"1 pinch","name":"Salt"},{"quantity":"1","name":"Egg"},{"quantity":"1 teaspoon","name":"Vanilla Extract"},{"quantity":"1 1/2 cups","name":"All purpose flour"}],"steps":["Preheat oven to 350 degrees","Butter a loaf pan","In a mixing bowl, mash bananas with a fork until smooth","Stir butter into mashed bananas","Mix dry ingredients together and then stir in wet ingredients","Pour batter into pan and bake for 50 minutes. Let cool before serving"],"imageURL":"recipeImages/bananabread.webp"}]';

//for the json data to be read in 
var data;
 let recipes;
// fetch("./recipe.json").then(
//         function(u){ return u.json();}
//       ).then(
//         function(json){
//           recipes = json;
//         }
//       )

function main(){

    // for the menu button to open and close
//    var menuButton = document.querySelector(".menuButton");
//    menuButton.addEventListener("click", function(){ document.querySelector("body").classList.toggle("active");});

    // for the recipe form
    document.getElementById("processRecipeButton").onclick = processRecipeData;


}

function processRecipeData(){

    var preference = document.getElementById("preference");
    //preference.style.display="block"
    var options = preference.options;
    var restrictions = Array.from(options);
    restrictions.forEach(r => {
                        if(r.selected){
                            allergenInformation.push(r.value)
                        }});
    // check to see if none was selected, in which case the allergenInformation array should be empty
    if(allergenInformation.includes('None')){
        allergenInformation = new Array();
    }
    var levelSelected = document.getElementById("levelSelection");
    level = levelSelected.options[levelSelected.selectedIndex].text
    document.getElementById("levelSelection").style.display = "none";
     document.getElementById("allergyForm").style.display = "none";
     document.getElementById("levelQuestion").style.display = "none";
     document.getElementById("processRecipeButton").style.display = "none";
     document.getElementById("mealQuestion").style.display = "none";
     document.getElementById("foodForm").style.display = "none";
     document.getElementById("types").style.display = "none";
     document.getElementById("cuisineSelection").style.display = "none";
     document.getElementById("cuisineQuestion").style.display = "none";
     document.getElementById("mealSelection").style.display = "none";
     document.getElementById("skip").style.display = "none";
     document.getElementById("surpriseButton").style.display = "none";
     document.getElementById("search").style.display = "none";
     document.getElementById("findButton").style.display = "none";
     document.getElementById("br1").style.display = "none";
     document.getElementById("br2").style.display = "none";
     document.getElementById("br").style.display = "none";
     document.getElementById("search").style.display = "none";
      document.getElementById("searchBar").style.display = "none";
      document.getElementById("suggested").style.display = "none";
//      document.getElementById("br2").style.display = "none";
//      document.getElementById("br").style.display = "none";



   // document.getElementById("allergenForm").style.display = "none";
    showRecipe(0);

}

//showRecipe.apply(this, recipes);
//function to display the recipe taken based on options/levels from json
function showRecipe(num){

    //alert(num);
    data = JSON.parse(recipesJson);
    //console.log(recipes);
    recipe = data[num];


    //display found recipe
    var divName =  document.getElementById("recipeName");
    heading = document.createElement("h1");
    heading.innerHTML = recipe.name;
    divName.appendChild(heading);

    var saveButton = document.createElement("button");
    saveButton.innerHTML = '<h5>Save to Pinned</h5>';
    saveButton.addEventListener("click",  function() {addToPinned(recipe.name)});
    divName.appendChild(saveButton);

    var divInfo = document.getElementById("recipeInfo");
    heading = document.createElement("h6");
    var info = recipe.info;
    for (var i = 0; i < info.length; i++) {
        heading.innerHTML += info[i];
    }
    divInfo.appendChild(heading);
    
    var divImg = document.getElementById("recipeImage");
    img = document.createElement("img");
    img.src = recipe.imageURL;
    img.width = "500";
    divImg.appendChild(img);

    let list = document.getElementById("ingredientsList");
    heading = document.createElement("h3");
    heading.innerHTML = "Ingredients";
    heading.style.textAlign = "center";
    list.appendChild(heading)
    var ing = recipe.ingredients;
    ing.forEach((item)=>{
        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        var span = document.createElement("span");
        span.classList.add('checkboxtext');
        span.classList.add('strikethrough');


        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        list.appendChild(newCheckbox);
        span.innerHTML  += " " + item.quantity + " ";
        span.innerHTML += item.name;
        list.appendChild(span);
      })
      var button = document.createElement("button");
      button.innerHTML = '<h5>Add to Shopping List</h5>';
      button.addEventListener("click",  function() {addToShoppingList(ing)});
      button.style.position = "absolute";
      button.style.left = "50%";
      button.style.transform = "translateX(-50%)";
      list.appendChild(button);
      list.appendChild(document.createElement("br"));



    var divInstructions = document.getElementById("instructionsList");
    heading = document.createElement("h3");
    heading.innerHTML = "Instructions";
    heading.style.textAlign = "center";
    divInstructions.appendChild(heading);
    var instructs = recipe.steps;
    instructs.forEach((item)=>{

        var newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        var span = document.createElement("span");
        var para = document.createElement("p");
        span.classList.add('checkboxtext');
        para.innerHTML += item;
        span.appendChild(para);
        span.classList.add('strikethrough');
        divInstructions.appendChild(newCheckbox);
        divInstructions.appendChild(span);

      })

    divInstructions.appendChild(document.createElement("br"));
}

function displayKeyboard(){
    var keys = document.getElementById("keyboard");
    keys.style.display = "block";
}

function removeKeyboard(){
   var keys = document.getElementById("keyboard");
   keys.style.display = "none";

}


//function to add the item to shoppingList
function addToShoppingList(item){
    shoppingList.push(item);
    //alert("Added to Shopping List!");
    document.getElementById("savedAlert").style.display = "block";
    //console.log(shoppingList);
}

function addToPinned(item){
    pinned.push(item);
    //alert("Added to Pinned Recipes!");
    document.getElementById("pinnedAlert").style.display = "block";
}

//function to add item to inventory
function addToInventory(item){
    inventory.push(item);
    alert("Added to Inventory!");
}

function addToList(item) {
    
   /* if (document.getElementById("itemName").value == "Item Name"
        || document.getElementById("itemAmount".value.isNaN()))
        alert("Invalid Input Try Again");
    else*/
        var item = document.getElementById("itemName").value;
        var amount = document.getElementById("itemAmount").value;
        var divTraderJoesList = document.getElementById("TraderJoesList");
        var divWholeFoodsList = document.getElementById("WholeFoodsList");
        var store = document.getElementById("storeSelection");
        var storeval = store.options[store.selectedIndex].value;
        if(storeval == "Trader Joe's"){
            var newCheckbox = document.createElement("input");
            newCheckbox.type = "checkbox";
            var span = document.createElement("span");
            var para = document.createElement("p");
            span.classList.add('checkboxtext');
            para.innerHTML += " " + amount + " ";
            para.innerHTML += item;
            span.appendChild(para);
            span.classList.add('strikethrough');
            divTraderJoesList.appendChild(newCheckbox);
            divTraderJoesList.appendChild(span);
        }
        else if(storeval == "Whole Foods"){
            var newCheckbox = document.createElement("input");
            newCheckbox.type = "checkbox";
            var span = document.createElement("span");
            var para = document.createElement("p");
            span.classList.add('checkboxtext');
            para.innerHTML += " " + amount + " ";
            para.innerHTML += item;
            span.appendChild(para);
            span.classList.add('strikethrough');
            divWholeFoodsList.appendChild(newCheckbox);
            divWholeFoodsList.appendChild(span);
        }
        
        //divTraderJoesList.appendChild(document.createElement("br"));
}
function storeAdding(){
    var store = document.getElementById("storeSelection");
    var storeval = store.options[store.selectedIndex].value;
    if(storeval == "+ Add Store"){
        window.location.replace("comingsoon.html");
    }
}

function listAlert(){

    document.getElementById("storeAlert").style.display = "block";

}