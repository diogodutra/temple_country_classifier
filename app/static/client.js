var el = x => document.getElementById(x);

function showPicked(input) {
  var reader = new FileReader();
  reader.onload = function(e) {
    $('#imagePreview').hide();
    $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
    $('#imagePreview').fadeIn(650);
  };
  reader.readAsDataURL(input.files[0]);
  analyze();
}

function analyze() {
  var uploadFiles = el("imageUpload").files;
  if (uploadFiles.length !== 1){
    alert("Please select a file to analyze!");
  } else {
    $('#result-label').hide();
    el("result-label").innerHTML = `Analyzing... please wait`;
    $('#result-label').fadeIn(3000);
    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
      true);
    xhr.onerror = function() {
      alert(xhr.responseText);
    };
    xhr.onload = function(e) {
      if (this.readyState === 4) {
        var response = JSON.parse(e.target.responseText);
        $('#result-label').hide();
        el("result-label").innerHTML = `Country: ${response["result"]}`;
        $('#result-label').fadeIn(650);
      }
    };
  
    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    xhr.send(fileData);
  }
}
