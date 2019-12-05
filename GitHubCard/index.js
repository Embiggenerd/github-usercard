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

const followersArray = [ // This is notthe final list of followers, more are added later programmtically
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
  address.href = `https://github.com/${data.login}`
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

// A good example of my async/await was created:
axios.get('https://api.github.com/users/embiggenerd') // Get my github data
  .then(r => {
    data.push(r.data) // When network call returns, push it to data
    data.forEach(d => { 
      cards.appendChild(CardCreator(d)) // Loop over data and append cards to dom
    })
    return r.data.followers_url // Pass my followers url to next callback
  })
  .then(url => {
    return axios.get(url) // Make a get request on url, pass response to next callback
  })
  .then(res => {
    res.data.forEach(u => {
      followersArray.push(u.login) // After that network call gets back, push usernames of followers to followersArray
    })
  })
  .then(() => {
    axios.all(followersArray.map(user => { // create array of get requsts for axios.all to invoke
      return axios.get(`https://api.github.com/users/${user}`) // pass reponse array to next callback
    })).then(res => {
      res.forEach(r => cards.appendChild(CardCreator(r.data))) // Loop over array of responses, and use response data as param ot CardCreator
    }).catch(e => console.log(e))
  }).catch(e => console.log(e))


/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// Step 5
