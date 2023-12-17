var siteName = document.getElementById("siteName");
var siteurl = document.getElementById("siteurl");
var icon = document.getElementById("icon");
var icon1 = document.getElementById("icon1");

var allsites = [];

if (localStorage.getItem("allsites") != null) {
  allsites = JSON.parse(localStorage.getItem("allsites"));
  display(allsites);
}

function submitSite() {
  var urlPattern =/^(http|https):\/\/([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+\.(com|org|net)(\/[^ "]+)?$/; // Regex pattern for URL validation
  var namePattern = siteName.value.length >= 3 ;
  var isValidUrl = urlPattern.test(siteurl.value);

  if (!isValidUrl || !namePattern) {
    var errorModal = document.getElementById("errorModal");
    errorModal.style.display = "block";
    return; 
  }

  var sites = {
    name: siteName.value,
    site: siteurl.value,
  };

  allsites.push(sites);
  localStorage.setItem("allsites", JSON.stringify(allsites));
  siteurl.style.border = "none";
  icon1.style.display="none";
  siteurl.style.boxShadow="none";
  siteName.style.border = "none";
  siteName.style.boxShadow="none";
  icon.style.display="none";
  siteName.style.focus="red";

  display(allsites);
  clear();
  // checkName();
  // checkUrl();
}

function display(arr) {
  var cartona = ``;
  for (var i = 1 ; i < arr.length; i++) {
    cartona +=
      `<tr>
          <td>${i}</td>
          <td>${arr[i].name}</td>
          <td><button class="btn fbtn text-white" onclick="visitSite('${arr[i].site}')">
          <i class="fa-solid fa-eye"></i>
          Visit</button></td>
          <td>
          <button class="btn btn-danger" onclick="deleteRow(${i})">
          <i class="fa-solid fa-trash"></i>
          Delete</button>
          </td>
        </tr>`;
  }
  document.getElementById("tabelBody").innerHTML = cartona;
}

function visitSite(url) {
  window.open(url, '_blank'); 
}

function onClose(){
    errorModal.style.display = "none";
    main.style.background = "#F7ECDE";
}

function clear() {
  siteName.value = '';
  siteurl.value = '';
}

function deleteRow(index) {
  allsites.splice(index, 1);
  localStorage.setItem("allsites", JSON.stringify(allsites));
  display(allsites);
}


function search(term){
  var newarr = [];
  for ( var i = 0 ; i < allsites.length ; i++){
    if(allsites[i].name.toLowerCase().includes(term.toLowerCase()) == true){
      newarr.push(allsites[i]);
    }
  }
  display(newarr);
}
function checkName(idx){
  if (idx.length >= 3){
    siteName.style.border = "3px solid green";
    siteName.style.boxShadow="none";
    icon.style.display="block";
    return;
  }
  else{
    siteName.style.border = "3px solid #d99c39";
    siteName.style.boxShadow="#d99c39";
    icon.style.display="none";
    return;
  }

} 

function checkUrl(idex){
  var urlPattern =/^(http|https):\/\/([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+\.(com|org|net)(\/[^ "]+)?$/; // Regex pattern for URL validation
  var isValidUrl = urlPattern.test(siteurl.value);

  if (isValidUrl) {
    siteurl.style.border = "3px solid green";
    siteurl.style.boxShadow="none";
    icon1.style.display="block";
    return;
  }
  else{
    siteurl.style.border = "3px solid #d99c39";
    icon1.style.display="none";
    siteurl.style.boxShadow="#d99c39";
    return;
  }
} 