var modal = document.getElementsByClassName("modal")[0];

var button = document.getElementsByClassName("button_1")[0];

function showModal() {
    modal.style.display = "block";
    document.getElementsByClassName("subscribe_button")[0].addEventListener('click', loadText);   

    function loadText(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'message.txt', true);
        xhr.onload = function(){
          if(this.status == 200){
            var user = document.getElementById('user').value;
            document.getElementsByClassName("content")[0].innerHTML = '<h1>' + this.responseText + ' ' + user + '!' + '</h1>';
            setTimeout(function(){modal.style.display = "none"},5000);
          } else if(this.status = 404){
            document.getElementsByClassName('content')[0].innerHTML = 'Not Found';
          }
        }

        xhr.send();
      }
}

button.addEventListener('click', showModal);

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}