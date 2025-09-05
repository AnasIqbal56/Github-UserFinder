const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const search = document.querySelector('#Search')


const getuser = async (username) => {
    const response = await fetch(APIURL + username)
    const Data = await response.json()
    console.log(Data);
    const card = `
        <div class="usercard">
            <div>
                <img class="avatar" src="${Data.avatar_url}" alt="">
            </div>

            <div class="userinfo">
                <h2>${Data.name}</h2>
                <p>${Data.bio}</p>

                <ul class="info">
                    <li>${Data.followers}<strong> Followers</strong></li>
                    <li>${Data.following}<strong> Following</strong></li>
                    <li>${Data.public_repos}<strong> Repositories</strong></li>
                </ul>

                

                <div id="repos">
                    </div>
            </div>
        </div>
  `
   main.innerHTML= card    
   gettingRepository(username)  
}


const gettingRepository = async (username) => {
    const repos = document.querySelector('#repos')
    const response = await fetch(APIURL + username + "/repos")
    const Data = await response.json()
    Data.forEach(item => {
        const repo = document.createElement('a')
        repo.classList.add('repo')
        repo.href = item.html_url
        repo.innerText = item.name
        repo.target = "_blank"
        repos.appendChild(repo)

    });
    
}

const FormSubmit = () => {
    if(search.value !=""){
        getuser(search.value)
        search.value=""
    }else{
        alert("Please enter a valid username")
    }}

search.addEventListener('keypress', (e) => {
    if(e.key ==="Enter"){
        e.preventDefault()
        FormSubmit()
    }
});