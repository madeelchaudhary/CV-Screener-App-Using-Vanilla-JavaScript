// Function to show a Message to new user as a tooltip Start
function newUser() {
  let userKey = sessionStorage.getItem("userKey");
  if (userKey) {
  } else {
    document.querySelector(".user").classList.add("newUser");
    sessionStorage.setItem("userKey", false);
  }
}
newUser();
// Function to show a Message to new user as a tooltip End

// Function to Fetch data of users from  Start
function getUserDataPromise() {
  return new Promise((resolve, reject) => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          reject(response.statusText);
        }
      })
      .then((data) => {
        resolve(data);
      });
  });
}

// Calling Promise function to get users data
getUserDataPromise()
  .then((data) => {
    setValues(data);
  })
  .catch((err) => alert(err));
// Function to Fetch data of users from API End

// Function to Iterate user date array one by one received from API
function userIterator(array) {
  let index = 0;

  return {
    next: function () {
      if (index < array.length) {
        return {
          value: array[index++],
          done: true,
        };
      } else {
        return { done: false };
      }
    },
  };
}

// Adding event to view next user btn
const user_refreshBtn = document.querySelector(".btn-neon");
user_refreshBtn.addEventListener("click", userUpdate);

// assign data to variable received from web api
let users;
const setValues = (data) => {
  users = userIterator(data.results);
  userUpdate();
  addingEventstoBtn();
};

// Create a class of user data and user data update functions instead of creating many variables and functions
class userData {
  constructor(age, mail, Name, phone, Location) {
    this.age = age;
    this.mail = mail;
    this.name = Name;
    this.phone = phone;
    this.Location = Location;
  }
  updateCurrentData = () => {
    let userInfoHead = document.querySelector(".userInfo h4");
    if (userInfoHead.textContent.includes("Age")) {
      this.userAgeUpdate();
    } else if (userInfoHead.textContent.includes("Email")) {
      this.userMailUpdate();
    } else if (userInfoHead.textContent.includes("Name")) {
      this.userNameUpdate();
    } else if (userInfoHead.textContent.includes("Phone")) {
      this.userPhoneUpdate();
    } else if (userInfoHead.textContent.includes("lives")) {
      this.userLocationUpdate();
    }
  };
  userAgeUpdate = () => {
    let userInfoPara = document.getElementById("userInfoPara");
    let userInfoHead = document.querySelector(".userInfo h4");

    userInfoHead.textContent = "My Age is:";
    userInfoPara.innerHTML = newUserClass.age;

    userInfoHead.style.display = "block";
    userInfoPara.style.display = "block";
  };

  userMailUpdate = () => {
    let userInfoPara = document.getElementById("userInfoPara");
    let userInfoHead = document.querySelector(".userInfo h4");

    userInfoHead.textContent = "My Email is:";
    userInfoPara.textContent = newUserClass.mail;
    if (userInfoPara.style.display == "none") {
      userInfoHead.style.display = "block";
      userInfoPara.style.display = "block";
    }
  };

  userNameUpdate = () => {
    let userInfoPara = document.getElementById("userInfoPara");
    let userInfoHead = document.querySelector(".userInfo h4");

    userInfoHead.textContent = "My Name is:";
    userInfoPara.textContent = newUserClass.name;
    if (userInfoPara.style.display == "none") {
      userInfoHead.style.display = "block";
      userInfoPara.style.display = "block";
    }
  };

  userPhoneUpdate = () => {
    let userInfoPara = document.getElementById("userInfoPara");
    let userInfoHead = document.querySelector(".userInfo h4");

    userInfoHead.textContent = "My Phone Number is:";
    userInfoPara.textContent = newUserClass.phone;

    if (userInfoPara.style.display == "none") {
      userInfoHead.style.display = "block";
      userInfoPara.style.display = "block";
    }
  };

  userLocationUpdate = () => {
    let userInfoPara = document.getElementById("userInfoPara");
    let userInfoHead = document.querySelector(".userInfo h4");

    userInfoHead.textContent = "I lives in:";
    userInfoPara.textContent = newUserClass.Location;

    userInfoHead.style.display = "block";
    userInfoPara.style.display = "block";
  };
}

// function to view data of next user every time clicked on view next btn
let newUserClass;
function userUpdate() {
  let user = users.next();

  if (user.value != undefined) {
    let userImage = document.querySelector(".userPic img");
    userImage.src = user.value.picture.large;
    let age = user.value.dob.age;
    let mail = user.value.email;
    let Name = `${user.value.name.title} ${user.value.name.first} ${user.value.name.last}`;
    let phone = user.value.phone;
    let Location = `${user.value.location.city}, ${user.value.location.state} ${user.value.location.country}`;
    newUserClass = new userData(age, mail, Name, phone, Location);
    newUserClass.updateCurrentData();
  } else {
    alert("You have viewed all the users");
    window.location.reload();
  }
}

// Adding Events to Different Icons to view diffrent user data
function addingEventstoBtn() {
  let userAgeBtn, userMailBtn, userNameBtn, userPhoneBtn, userLocationBtn;
  userAgeBtn = document.getElementById("userAge");
  userMailBtn = document.getElementById("userMail");
  userNameBtn = document.getElementById("userName");
  userPhoneBtn = document.getElementById("userPhone");
  userLocationBtn = document.getElementById("userLocation");

  userAgeBtn.addEventListener("click", newUserClass.userAgeUpdate);
  userNameBtn.addEventListener("click", newUserClass.userNameUpdate);
  userPhoneBtn.addEventListener("click", newUserClass.userPhoneUpdate);
  userMailBtn.addEventListener("click", newUserClass.userMailUpdate);
  userLocationBtn.addEventListener("click", newUserClass.userLocationUpdate);
}
