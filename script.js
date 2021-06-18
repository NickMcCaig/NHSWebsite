
console.log("Hello!");
// api url
const api_url = 
      "https://api.nhs.uk/conditions/";
function getTextBox(){
    return document.getElementById("searchBox").value
}
function checkTextBox(){
  var textValue = getTextBox(); 
  textValue = textValue.replace(/\s+/g, '-').toLowerCase();
  return textValue;
}
function getURL(){
    console.log(getTextBox());
    return api_url + checkTextBox();
}

// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url, {
  method: "GET",
  headers: {"subscription-key": "a34919dd83e942ebb769798a0a59170f"}
});
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data['@type']);
    
    if (response) {
      console.log("DataLoaded")
        hideloader();
        renderCards(data)
    }
}

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}
async function renderCards(data) {
    let segments = data.hasPart;
    let html = '';
    if(data['@type'] == "MedicalWebPage"){
    console.log(segments);
    if(!segments.length == 0){ // Checks if content has been modulerized 
    segments.forEach(segment => {
        let segmentName = segment.name;
        segmentName = segmentName.replace(/_/g, ' ');
        if(!segment.text == ""){ //Sections with infomation
        let htmlSegment = ` <div class="container">
                            <div class="card">
                                <div class="card-body">
                                <h4 class="card-title">${segmentName}</h4>
                                <p>
                                ${segment.description}
                                </p>
                                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#card${segment.name}" id="btn${segments.name}">More Info</button>
                            </div>
                            </div>
                            <div class="modal" id="card${segment.name}">
                            <div class="modal-dialog modal-lg">
                              <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                  <h1 class="modal-title">${segmentName}</h1>
                                  <button type="button" class="close" data-dismiss="modal">×</button>
                                </div>
                                
                                <!-- Modal body -->
                                <div class="modal-body">
                                ${segment.text}
                                </div>
                                
                                <!-- Modal footer -->
                                <div class="modal-footer">
                                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`;
                        html += htmlSegment;
        }else{ // Sections without additional infomation
            let htmlSegment = ` <div class="container">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">${segmentName}</h4>
                    <p>
                    ${segment.description}
                    </p>
                    </div>
            </div>
        </div>`;
        html += htmlSegment; 
        }
    });
  }else{
    html = '<h4>This content has not been modulerized</h4>'
  }
}else{
  html = '<h4>Your search was invalid!</h4>'
}
    let container = document.querySelector('.container');
    let conditiontitle = document.querySelector('.conditionTitle');
    conditiontitle.innerHTML = data.about.name
    container.innerHTML = html;
    $("img").addClass("img-thumbnail") // Adds bootstrap formatting to all images
}

getapi(getURL())
