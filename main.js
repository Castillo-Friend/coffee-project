"use strict"

function renderCoffee(coffee) {
    var html = '<section class="coffee col-6 justify-content-center align-items-start p-3">';
    html += '<div class=" d-none">' + coffee.id + '</div>';
    html += '<div class="  col-12 fs-2 coffeeNames">' + coffee.name + '<small class="fs-6 text-warning fw-bolder">' + " " + coffee.roast + '</small>' + '</div>';
    html += '</section>';

    return html;
}

function renderCoffees(coffees) {
    var html = '';
    for(var i = 0 ; i < coffees.length; i++) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value;
    var filteredCoffees = [];
    coffees.forEach(function(coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
        if (roastSelection.value === "all"){
            filteredCoffees = coffees;
        }
    });
    section.innerHTML = renderCoffees(filteredCoffees);
}

const searchInput = document.getElementById("searchInput");
const coffeeNames = document.getElementsByClassName("coffeeNames")
searchInput.addEventListener("keyup", (event) => {
    const {value} = event.target;
    const searchQuery = value.toLowerCase();
    for (const nameElement of coffeeNames) {
        let name = nameElement.textContent.toLowerCase();
        if (name.includes(searchQuery)) {
            nameElement.parentNode.style.display = "block";
        } else {
            nameElement.parentNode.style.display = "none";
        }
    }
});

const addCoffeeRoast = document.getElementById("add-coffee-select");
const addCoffeeName = document.getElementById("add-coffee-search");
const addNewCoffee = document.getElementById("add-coffee-submit");

addNewCoffee.addEventListener("click", (event) => {
    event.preventDefault();

    let newCoffee = {
        id: coffees.length + 1,
        name: addCoffeeName.value,
        roast: addCoffeeRoast.value
    };
    coffees.push(newCoffee);
    localStorage.setItem('coffees', JSON.stringify(coffees));
    updateCoffees(event);
})

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

let storedCoffees = localStorage.getItem('coffees');
if(storedCoffees === null){
    localStorage.setItem('coffees', JSON.stringify(coffees));
    storedCoffees = localStorage.getItem('coffees');
}
coffees = JSON.parse(storedCoffees);

function removeCoffee() {
    localStorage.removeItem('coffees');
}
var section = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

section.innerHTML = renderCoffees(coffees);

submitButton.addEventListener('click', updateCoffees);
