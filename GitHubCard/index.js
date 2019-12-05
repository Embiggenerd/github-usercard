/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/embiggenerd')
  .then(r => console.log(r))
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/
const CardCreator = data => {
  const card = el('div')
  const img = el('img')
  const cardInfo = el('div')
  const h3 = el('h3')
  const userName = el('p')
  const location = el('p')
  const profile = el('p')
  const address = el('a')
  const followers = el('p')
  const following = el('p')
  const bio = el('p')

  h3.classList.add('name')
  card.classList.add('card')
  cardInfo.classList.add('card-info')
  userName.classList.add('username')

  img.src = data.avatar_url
  h3.textContent = data.name || data.login
  userName.textContent = data.login
  location.textContent = data.location
  address.href = `github.com/${data.login}`
  address.textContent = 'github'
  followers.textContent = data.followers
  following.textContent = data.following
  bio.textContent = data.bio

  profile.appendChild(address)
  ac([h3, userName, location, profile, followers, following, bio], cardInfo)
  ac([cardInfo, img], card)

  return card
}

const data = []
const cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/embiggenerd')
  .then(r => {
    data.push(r.data)
    data.forEach(d => {
      cards.appendChild(CardCreator(d))
    })
  }).catch(e => {
    console.log(e)
  })


/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

axios.all(followersArray.map(user => {
  return axios.get(`https://api.github.com/users/${user}`)
})).then(res => {
  res.forEach(r => cards.appendChild(CardCreator(r.data)))
}).catch(e => console.log(e))
