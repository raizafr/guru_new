const signup_1 = document.getElementById("signup_1");
const signup_2 = document.getElementById("signup_2");
const signup_3 = document.getElementById("signup_3");

const employer = document.getElementById("signup-choose-box-employer");
const freelancer = document.getElementById("signup-choose-box-freelancer");

function show_signup_1() {
  signup_1.style.display = "block";
  signup_2.style.display = "none";
  signup_3.style.display = "none";
}

function show_signup_2() {
  signup_1.style.display = "none";
  signup_2.style.display = "block";
  signup_3.style.display = "none";
}

function show_signup_3() {
  signup_1.style.display = "none";
  signup_2.style.display = "none";
  signup_3.style.display = "block";
}

function select_employer() {
  employer.classList.add("g-selectBox--active");
  freelancer.classList.remove("g-selectBox--active");
  employer.querySelector(".g-chkradio.g-chkradio--checkbox").checked = true;
  freelancer.querySelector(".g-chkradio.g-chkradio--checkbox").checked = false;
}

function select_freelancer() {
  employer.classList.remove("g-selectBox--active");
  freelancer.classList.add("g-selectBox--active");

  employer.querySelector(".g-chkradio.g-chkradio--checkbox").checked = false;
  freelancer.querySelector(".g-chkradio.g-chkradio--checkbox").checked = true;
}

const signup_form = document.getElementById("aspnetForm");
signup_form.onkeyup = (e) => {
  if (e.keyCode == 13) return false;
};
signup_form.onkeydown = (e) => {
  if (e.keyCode == 13) return false;
};

async function createUser() {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  console.log("create user called", email, fullName);

  const response = await fetch(
    "https://guru-new-iuz1.onrender.com/createUser",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        fullName,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  // Ensure the response is successful
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Extract the response body as text
  const usersid = await response.text();

  location.href = `http://127.0.0.1:5500/overview_dashboard.html?userId=${usersid}`;
  console.log("this is the userId", usersid);
}
