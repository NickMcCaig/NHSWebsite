/*
This is your site JavaScript code - you can add interactivity and carry out processing
- Initially the JS writes a message to the console, and rotates a button you can add from the README
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello!");
// api url
const api_url = 
      "https://api.nhs.uk/conditions/acne";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url, {
  method: "GET",
  headers: {"subscription-key": "a34919dd83e942ebb769798a0a59170f"}
});
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    
    if (response) {
      console.log("DataLoaded")
        hideloader();
        renderUsers(data)
    }
}
// Calling that async function
getapi(api_url);
  
// Function to hide the loader
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
async function renderUsers(data) {
    let segments = data.hasPart;
    let html = '';
    console.log(segments);
    segments.forEach(segments => {
        let segmentName = segments.name;
        segmentName = segmentName.replace(/_/g, ' ');
        if(segmentName ){
            segments.title = "Overview";
        }
        let htmlSegment = `<div class="card bg-light text-dark">
                            <h2>${segmentName}</h2>
                            <div class="card-body text-center">
                            ${segments.description}
                            
                            </div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

