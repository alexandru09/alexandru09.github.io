
const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');

function getCars() {
  fetch('http://localhost:3000/cars')
      .then(function (response) {
          response.json().then(function (cars) {
              appendCarsToDOM(cars);
          });
      });
};

function postCars() {

  const postObject = {
      name: formName.value,
      img: formUrl.value
  }
 
  fetch('http://localhost:3000/cars', {
      method: 'post',
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(postObject)
  }).then(function () {
      getCars();
      resetForm();
  });
}

function deleteCar(id) {
  fetch(`http://localhost:3000/cars/${id}`, {
      method: 'DELETE',
  }).then(function () {
      getCars();
  });
}

function updateCars(id) {
  const putObject = {
      name: formName.value,
      img: formUrl.value
  }
  fetch(`http://localhost:3000/cars/${id}`, {
      method: 'PUT',
      headers: {
          "Content-type": "application/json"
      },
      body: JSON.stringify(putObject)
  }).then(function () {
      getCars();

      addButton.disabled = false;

      clearUpdateButtonEvents();

      resetForm();
  });
}


function editCar(car) {
  formName.value = car.name;
  formUrl.value = car.img;
  
  addButton.disabled = true;

  clearUpdateButtonEvents();

  updateButton.disabled = false;
  updateButton.addEventListener('click', function () {
      updateCar(car.id)
  });

}

function appendCarsToDOM(cars) {
  while (list.firstChild) {
      list.removeChild(list.firstChild);
  }
  for (let i = 0; i < cars.length; i++) {
      let img = document.createElement('img');
      img.src = cars[i].img;
      let name = document.createElement('p');
      name.innerText = cars[i].name;
    
      var h = document.createElement('h1');

      let editButton = document.createElement('button')
      editButton.addEventListener('click', function () {
          editCar(cars[i])
      });
      editButton.innerText = 'Edit';
      let deleteButton = document.createElement('button')
      deleteButton.addEventListener('click', function () {
          deleteCar(cars[i].id)
      });
      deleteButton.innerText = 'Delete';
      let container = document.createElement('div');
      name.appendChild(editButton);
      name.appendChild(deleteButton);
      h.appendChild(name);
      container.appendChild(h);
      container.appendChild(img);
      list.appendChild(container);
  }
}

function resetForm() {
  formName.value = '';
  formUrl.value = '';
}

function clearUpdateButtonEvents() {
  let newUpdateButton = updateButton.cloneNode(true);
  updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
  updateButton = document.getElementById('updateButton');
}

addButton.addEventListener('click', postCars);

getCars();