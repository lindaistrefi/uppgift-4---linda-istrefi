// my HTML element variables
const input = document.querySelector("#todoInput");
const list = document.querySelector("ul");
const button = document.querySelector("#addTodo");
const info = document.querySelector("small");
const completedInfo = document.querySelector("p");

// my JS variables 
let completedCount = 0;
const toDoArray = [];
const toDoObject = { name: "", status: false };
const simpleArray = [];

// Function to handle change status on object in array
function changeStatus(toDoText, completed) {


    // find index, look in objects and value on "name"
    let correctIndex = toDoArray.map(t => t.name).indexOf(toDoText);



    // change status on the objekt at correct index
    toDoArray[correctIndex].status = completed;
}

button.addEventListener("click", function () {

    // fetch value from input
    const text = input.value;

    // check that text is not empty

    if (text.length == 0) {
        info.innerText = "Input can not be empty";
        return;
    }
    else {
        info.innerText = "";
    }

    // add todo to toDoArray 
    const toDoObject = { name: text, status: false };
    toDoArray.push(toDoObject);

    // add todo to simpleArray
    simpleArray.push(text);

    // create empty li-element in ul (list)
    const item = document.createElement("li");
    list.appendChild(item);

    // create a span-element in our new li and add test 
    const itemLabel = document.createElement("span");
    itemLabel.innerText = text; // the text from input is added to the list
    item.appendChild(itemLabel);

    // create span-element that has a trashcan
    const trashcan = document.createElement("span");
    trashcan.innerHTML = "&#x1F5D1;";
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan);


    // add a listener to the span & change completed count - Must be in this position (after span). 
    itemLabel.addEventListener("click", function () {

        // toggle completed/uncompleted (turn on and off a class)
        if (item.getAttribute("class") == "completed") {
            item.setAttribute("class", "");

            // change status on object in array to false
            let clickedText = item.firstChild.firstChild.textContent; // i ul, li, p-tag 
            changeStatus(clickedText, false);
            completedCount--

        }
        else {
            item.setAttribute("class", "completed");

            // change status on object in array to true 
            let clickedText = item.firstChild.firstChild.textContent; // i ul, li, p-tag 
            changeStatus(clickedText, true);
            completedCount++



        }
        completedInfo.innerText = `${completedCount} completed`;  // changed the text on my Completed-info(my variable)
    })


    // add a listener for the trashcan
    trashcan.addEventListener("click", function () {

        // set completed count correct 
        if (item.getAttribute("class") == "completed") {
            completedCount--
        }

        completedInfo.innerText = `${completedCount} completed`

        // set toDoArray correct
        let removeText = item.firstChild.firstChild.textContent;
        let indexToRemove = simpleArray.indexOf(removeText);
        simpleArray.splice(indexToRemove, 1);


        // remove li-element 
        item.remove();
    })

    // empty input field
    input.value = "";
})
