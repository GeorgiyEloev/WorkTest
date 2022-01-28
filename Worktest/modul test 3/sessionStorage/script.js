let inputFullName = null;
let inputEmail = null;
let inputPassword = null;
let inputDelete = null;

let valueFull = "";
let valueEmail = "";
let valuePassword = "";
let valueDelete = "";

let arrayUsers = JSON.parse(sessionStorage.getItem('users')) || [];

let id = arrayUsers[0] ? (arrayUsers[arrayUsers.length - 1]._id + 1) : 0;

window.onload = async () => {
  inputFullName = document.getElementById("fullname");
  inputEmail = document.getElementById("email");
  inputPassword = document.getElementById("password");
	inputDelete = document.getElementById("delete");

  inputFullName.addEventListener("change", updateFullName);
  inputEmail.addEventListener("change", updateEmail);
  inputPassword.addEventListener("change", updatePassword);
	inputDelete.addEventListener("change", updateDelete);

  addUsersInList();
};

const updateDelete = (event) => {
	valueDelete = event.target.value;
}

const updateFullName = (event) => {
  valueFull = event.target.value;
};

const updateEmail = (event) => {
  valueEmail = event.target.value;
};

const updatePassword = (event) => {
  valuePassword = event.target.value;
};

const addUsersInList = () => {
  const content = document.getElementById("users");

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  arrayUsers.map((item) => {
    const { _id, fullName } = item;
    const user = document.createElement("div");
    const idUser = document.createElement("p");
    const fullNameUser = document.createElement("p");

    idUser.innerText = "Id: " + _id;
    fullNameUser.innerText = "FullName: " + fullName;

    user.className = "addUser";

    user.appendChild(idUser);
    user.appendChild(fullNameUser);
    content.appendChild(user);
  });
};

const addUser = async () => {
  if (valueFull && valueEmail && valuePassword) {
		arrayUsers.push({
			_id: id,
			fullName: valueFull,
			email: valueEmail,
			password: valuePassword
		});

		id++;

		sessionStorage.setItem('users', JSON.stringify(arrayUsers));
		
		valueFull = '';
		valueEmail = '';
		valuePassword = '';
		inputPassword.value = '';
		inputEmail.value = '';
		inputFullName.value = '';

		addUsersInList();
  } else {
    alert("Поле пустое!!!");
  }
};

const delUser = async () => {
	let count = valueDelete - 0;
	arrayUsers.forEach((item, index) => {
		if (item._id === count) {
			arrayUsers.splice(index, 1);
		}
	});

	sessionStorage.setItem('users', JSON.stringify(arrayUsers));

	valueDelete = '';
	inputDelete.value = '';

  addUsersInList();
}

const delAll = () => {
	arrayUsers = [];

	sessionStorage.setItem('users', JSON.stringify(arrayUsers));

	addUsersInList();
}