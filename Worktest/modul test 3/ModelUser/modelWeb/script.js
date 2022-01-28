let inputFullName = null;
let inputEmail = null;
let inputPassword = null;
let inputDelete = null;

let valueFull = "";
let valueEmail = "";
let valuePassword = "";
let valueDelete = "";

let arrayUsers = [];

window.onload = async () => {
  inputFullName = document.getElementById("fullname");
  inputEmail = document.getElementById("email");
  inputPassword = document.getElementById("password");
	inputDelete = document.getElementById("delete");

  inputFullName.addEventListener("change", updateFullName);
  inputEmail.addEventListener("change", updateEmail);
  inputPassword.addEventListener("change", updatePassword);
	inputDelete.addEventListener("change", updateDelete);

  const connection = await fetch("http://localhost:8000/allUsers", {
    method: "GET",
  });
  const result = await connection.json();
  arrayUsers = result.data;

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
		const connection = await fetch("http://localhost:8000/addUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
			},
			body: JSON.stringify({
				fullName: valueFull,
				email: valueEmail,
				password: valuePassword
			}),
  	});

		const result = await connection.json();
		arrayUsers = result.data;
		
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
  const connection = await fetch(`http://localhost:8000/deleteUser?_id=${valueDelete}`, {
    method: "DELETE",
  });

	valueDelete = '';
	inputDelete.value = '';

	const result = await connection.json();
	arrayUsers = result.data;

  addUsersInList();
}