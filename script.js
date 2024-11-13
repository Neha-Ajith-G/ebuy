function update(){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function(){
        document.getElementById("about").innerHTML=this.responseText;
    }
    xhttp.open('GET',"about.txt","true");
    xhttp.send();
}




// Function to filter and display artwork based on user input (budget)
// Function to fetch data from data.json and filter based on the user's budget using AJAX
function fetchAndFilterData() {
    const userBudget = parseInt(document.getElementById('filterin').value);

    // Validate input (check if it's a number and greater than 0)
    if (isNaN(userBudget) || userBudget <= 0) {
        alert("Please enter a valid budget.");
        return;
    }

    // Create a new XMLHttpRequest object for AJAX
    const xhttp = new XMLHttpRequest();

    // Set up the onload function that gets executed when the data is successfully fetched
    xhttp.onload = function () {
        // Check if the request was successful (HTTP status 200)
        if (this.status === 200) {
            try {
                // Parse the response as JSON
                const data = JSON.parse(this.responseText);

                // Filter the artworks based on price and inStock status
                const filteredData = data.filter(item => item.price <= userBudget && item.inStock);

                // Get the data list element where the filtered results will be displayed
                const dataList = document.getElementById('dataList');

                // Clear previous filtered results
                dataList.innerHTML = '';

                // If there are no filtered items, display a message
                if (filteredData.length === 0) {
                    dataList.innerHTML = '<li>No artworks available within your budget.</li>';
                    return;
                }

                // Otherwise, loop through filtered data and create list items
                filteredData.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${item.name} by ${item.artist} - $${item.price}`;
                    dataList.appendChild(listItem);
                });
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('There was an error processing the artwork data.');
            }
        } else {
            alert('Failed to load data. Please try again later.');
        }
    };

    // Set up the onerror function to handle network errors
    xhttp.onerror = function () {
        console.error('Network error occurred');
        alert('There was a network error while fetching the data.');
    };

    // Send the AJAX request to get data.json
    xhttp.open('GET', 'data.json', true);
    xhttp.send();
}


// Function to handle the "Buy" button click for artwork purchase
function buy(event) {
    // Get the price and artwork details
    const artworkElement = event.target.closest('tr');
    const artworkTitle = artworkElement.querySelector('h3').textContent;
    const artworkPrice = parseFloat(artworkElement.querySelector('.price').getAttribute('data-price'));

    // You may want to confirm the purchase before proceeding
    const confirmPurchase = confirm(`Are you sure you want to buy "${artworkTitle}" for $${artworkPrice}?`);

    if (confirmPurchase) {
        // Create a new XMLHttpRequest to send the purchase request to the server
                // Display a message based on the response
                    alert(`Successfully purchased "${artworkTitle}" for $${artworkPrice}!`);}
    else {
                    alert(`There was an issue with your purchase. Please try again.`);
                }
};


// Add event listeners for all buy buttons dynamically
function setupBuyButtons() {
    const buyButtons = document.querySelectorAll('.buy');

    buyButtons.forEach(function(button) {
        button.addEventListener('click', buy);
    });
}

// Call this function to initialize event listeners when the page loads
window.onload = function() {
    setupBuyButtons();
};

let r_user= document.getElementById("rname");
let r_pass= document.getElementById("rpass");
let user_msg= document.getElementById("user_msg");
let pass_msg= document.getElementById("pass_msg");
let rfrm=document.getElementById("rfrm");

r_user.addEventListener('blur',function(){
  if(r_user.value.length<3){
    user_msg.textContent="Minimum 3 characters!";
  }
  else{
    user_msg.textContent="";
  }
},false);

r_pass.addEventListener('blur',function(){
  if(r_pass.value.length<5){
    pass_msg.textContent="Minimum 5 characters!";
  }
  else if(!(/[!@#$%~^&*()]/.test(r_pass.value))){
    pass_msg.textContent="Special characters required!";
  }
  else if(!(/[A-Z]/.test(r_pass.value))){
    pass_msg.textContent="Uppercase characters required!";
  }
  else{
    pass_msg.textContent="";
  }
},false);

rfrm.addEventListener('submit',(e)=>{
  e.preventDefault();

  if(user_msg.textContent==="" && pass_msg.textContent==="" && r_user.value!==""&& r_pass.value!==""){
  let username=r_user.value;
  let password=r_pass.value;
  localStorage.setItem(username,password);
  console.log("Validation Successfull");
  window.location.href='login.html';
  }
},false);









