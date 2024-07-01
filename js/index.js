let posts;
const loadPosts = async (value) => {
  const res = await fetch(value ? `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}` : "https://openapi.programming-hero.com/api/retro-forum/posts");
  const data = await res.json();
  posts = data.posts;
  const postsContainer = document.getElementById('post-container');

  posts.forEach((post) => {
    const postCard = document.createElement('div');
    postCard.classList = `card p-4 mb-4 bg-gray-200 shadow-xl`;
    postCard.innerHTML = `
          <div class="bg-gray-100 rounded-lg p-6">
              <div class="flex gap-2">
                  <img class="w-10 h-12 rounded-lg bg-cover relative" src="${post.image}" alt="" style="background-color:${post.isActive === true ? "green" : "red"}" />
                  ${post.isActive === true ? '<span class="marker active"></span>' : '<span class="marker inactive"></span>'}
                  <div class="space-x-3">
                      <div class="flex gap-8">
                          <p>#<span>${post.category}</span></p>
                          <p>Author: <span>${post.author.name}</span></p>
                      </div>
                      <h3 class="text-xl font-bold">${post.title}</h3>
                      <p class="border-b-2 border-dashed pb-4">${post.description}</p>
                  </div>
              </div>
              <div class="flex px-4 ml-8 justify-between my-5">
                  <div class="flex gap-6">
                      <p><i class="fa-regular fa-comment-dots"></i> <span>${post.comment_count}</span></p>
                      <p><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></p>
                      <p><i class="fa-regular fa-clock"></i> <span>${post.posted_time} min </span></p>
                  </div>
                  <div class="bg-[#10b981] flex justify-end rounded-full p-0.5">
                      <p class="w-6 text-center h-6"" onclick="cardNums(${posts.indexOf(post)})">
                          <i class="fa-regular fa-envelope-open  text-white"></i>
                      </p>
                  </div>
              </div>
          </div>`;
    postsContainer.appendChild(postCard);
  });
}

let count = 0;
function cardNums(id) {
  const cardNum = document.getElementById('totalRead');
  count++;
  cardNum.innerText = parseInt(count);
  const clickedPost = posts[id];
  const li = document.createElement("li");
  li.classList.add(
    "flex",
    "justify-between",
    "gap-3",
    "bg-white",
    "rounded-lg",
    "p-2"
  );
  const titleElement = document.createElement("h2");
  titleElement.classList.add("text-xl", "font-normal");
  titleElement.innerText = clickedPost.title;

  const viewCountElement = document.createElement("span");
  viewCountElement.innerHTML = `
    <i class="fa-regular fa-eye"></i>
    <span>${clickedPost.view_count}</span>
  `;
  li.appendChild(titleElement);
  li.appendChild(viewCountElement);

  const listMenu = document.getElementById("listMenu");
  listMenu.appendChild(li);
}

const loadLatest = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  const latestPosts = data;
  const latestContainer = document.getElementById('latest-container');
  latestPosts.forEach((latestPost) => {
    const latestCard = document.createElement('div');
    latestCard.classList = `card p-4 mb-4 shadow-xl`;
    latestCard.innerHTML = `
        <div class="card  bg-gray-200 h-full shadow-xl">
        <figure class="px-10 pt-10">
          <img
            src="${latestPost.cover_image}"
            alt="Shoes"
            class="rounded-xl"
          />
        </figure>
        <div class="card-body ">
          <p><i class="fa-solid fa-calendar-days"></i> <span>${latestPost.author.posted_date
        ? latestPost.author.posted_date
        : " No publish date"
      }</span></p>
          <h2 class="card-title">${latestPost.title}!</h2>
          <p>${latestPost.description}</p>
          <div class="flex gap-4">
            <img src="${latestPost.profile_image
      }" alt="" class="w-10 h-10 rounded-full">
            <div>
              <h2>${latestPost.author.name}</h2>
              <p>${latestPost.author.designation
        ? latestPost.author.designation
        : "unknown"
      }</p>

            </div>
          </div>
          
        </div>
       </div>    
        `;
    latestContainer.appendChild(latestCard);
  });
}

function handleSearch() {
  const postsContainer = document.getElementById('post-container');
  postsContainer.innerHTML="";
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  const spinner = document.getElementById('spinner');
  spinner.classList.remove("hidden");

  setTimeout(() => {
      spinner.classList.add("hidden");
  }, 2000);
  
  loadPosts(searchText);
}

loadPosts();
loadLatest();
