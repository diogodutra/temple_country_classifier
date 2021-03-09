var el = x => document.getElementById(x);

function showPicker() {
  // el("file-input").click();
  el("imageUpload").click();
}
// $("#imageUpload").change(function() {
//     readURL(this);
// });

function showPicked(input) {
  // el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    // el("image-picked").src = e.target.result;
    // el("#imagePreview").src = e.target.result;
    $('#imagePreview').css('background-image', 'url('+e.target.result +')');
    // el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

// showPicked(url('https://www.ar.jal.co.jp/world/en/guidetojapan/howto/culture/how-to-visit-a-temple/img/img_culture5-1.jpg'))
// $('#imagePreview').attr('src', 'url(https://www.ar.jal.co.jp/world/en/guidetojapan/howto/culture/how-to-visit-a-temple/img/img_culture5-1.jpg)');
// el("imageUpload").files[0] = url('https://www.ar.jal.co.jp/world/en/guidetojapan/howto/culture/how-to-visit-a-temple/img/img_culture5-1.jpg');

function analyze() {
  // var uploadFiles = el("file-input").files;
  var uploadFiles = el("imageUpload").files;
  if (uploadFiles.length !== 1){
    alert("Please select a file to analyze!");
  } else {
    el("analyze-button").innerHTML = "Analyzing...";
    el("analyze-button").style.backgroundColor = "lightgray";
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
        el("result-label").innerHTML = `Result = ${response["result"]}`;
      }
      el("analyze-button").innerHTML = "Analyze";
      el("analyze-button").style.backgroundColor = '#7052CB';
    };
  
    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    xhr.send(fileData);
  }
}
