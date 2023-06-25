const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4e53bcd1ffa95d6acf88f625ba193073';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=4e53bcd1ffa95d6acf88f625ba193073&query=";



const section = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK)
function returnMovies(url) {
  fetch(url).then(res => res.json())
    .then(function (data) {
      console.log(data.results);
      data.results.forEach(element => {

        const row = document.createElement('div');
        row.setAttribute('class', 'card-row');

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        
        const center = document.createElement('center');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('p');
        title.setAttribute('class', 'title');

        const anch = document.createElement("a");
        const yt_lk = document.createElement("a")
        yt_lk.setAttribute('class', 'ytlink')
        const brk = document.createElement("br")
        // const div_column = document.createElement('div');
        // div_column.setAttribute('class', 'column');


        anch.innerHTML = `${element.title}`;
        anch.href = "https://www.imdb.com/find/?q=" + `${element.title}` + "&ref_=nv_sr_sm";
        anch.target = "_blank"

        yt_lk.innerHTML = "Watch it on YouTube"
        yt_lk.href = "https://www.youtube.com/results?search_query=" + `${element.title}`
        yt_lk.target = "_blank"

        image.src = IMG_PATH + element.poster_path;

        section.appendChild(row);
        row.appendChild(card);
        card.appendChild(center);
        card.appendChild(title);
        title.appendChild(anch)
        title.appendChild(brk)
        title.appendChild(yt_lk)
        center.appendChild(image);
        // div_column.appendChild(card);

      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  section.innerHTML = '';

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});