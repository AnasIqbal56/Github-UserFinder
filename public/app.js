const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const search = document.querySelector("#Search");
const form = document.querySelector("#userForm");

// Fetch user data
const getUser = async (username) => {
  try {
    const response = await fetch(APIURL + username);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const data = await response.json();
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    main.innerHTML = `<p class="text-center text-red-500 font-semibold">${error.message}</p>`;
  }
};

// Create user card
const createUserCard = (data) => {
  const card = `
    <div class="bg-white rounded-xl shadow-lg p-6 flex gap-6">
      <img src="${data.avatar_url}" alt="${data.name}" class="w-24 h-24 rounded-full border">
      <div class="flex-1">
        <h2 class="text-2xl font-bold">${data.name || "No Name"}</h2>
        <p class="text-gray-600 mb-3">${data.bio || "No bio available"}</p>
        <ul class="flex gap-6 text-gray-800 mb-4">
          <li><strong>${data.followers}</strong> Followers</li>
          <li><strong>${data.following}</strong> Following</li>
          <li><strong>${data.public_repos}</strong> Repos</li>
        </ul>
        <div id="repos" class="flex flex-wrap gap-2"></div>
      </div>
    </div>
  `;
  main.innerHTML = card;
};

// Fetch repositories
const getRepos = async (username) => {
  try {
    const reposEl = document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos?sort=created");
    const data = await response.json();

    data.slice(0, 10).forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.className =
        "bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md text-sm font-medium";
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;
      reposEl.appendChild(repoEl);
    });
  } catch (error) {
    console.error(error);
  }
};

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value.trim();
  if (user) {
    getUser(user);
    search.value = "";
  }
});
