const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

let newMovies1;
let similarity1;

fetch('movies_list.json')
  .then(response => response.json())
  .then(data => {
    // Process the JSON data
    newMovies1 = data;
    console.log(newMovies1);
  })
  .catch(error => {
    console.error('Error:', error);
  });

fetch('similarity.json')
  .then(response => response.json())
  .then(data => {
    // Process the JSON data
    similarity1 = data;
    console.log(similarity1);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  // Function to recommend movies based on cosine similarity
  function recommend(movie) {
    var sortedMovies = [];
    var index = newMovies1.findIndex(row => row.title === movie);
    if (index==-1){
      return alert("Oops! The desired movie was not found on our database")
    }
    var distances = similarity1[index].map((value, i) => [i, value])
        .sort((a, b) => b[1] - a[1]);
    for (var i = 1; i < 5; i++) {
        sortedMovies.push(newMovies1[distances[i][0]].title);
    }
    console.log(sortedMovies)
    return sortedMovies;
}


  document.getElementById('recommend-button').addEventListener('click', function() {
    var inputMovie = document.getElementById('movie-input').value;
  
    var suggestedMovies = recommend(inputMovie);
    console.log(suggestedMovies);
    var suggestResultsDiv = document.getElementById('suggest-results');
    suggestResultsDiv.innerHTML = '';
  
    suggestedMovies.forEach(movieTitle => {
      // Make an API call to fetch movie data based on the recommended movie titles
      // Create the appropriate HTML elements and append them to the 'suggest-results' div
      // Example code:
      fetch('https://api.themoviedb.org/3/search/movie?&api_key=4e53bcd1ffa95d6acf88f625ba193073&query=' + movieTitle)
        .then(response => response.json())
        .then(function (data) {
          console.log(data.results);
          data.results.forEach(element => {
          var movieElement = document.createElement('div');
          movieElement.classList.add('movie');
  
          var titleElement = document.createElement('p');
          
          var anch = document.createElement('a');

          var yt_lk = document.createElement("a")
          yt_lk.setAttribute('class', 'ytlink')
          const brk = document.createElement("br")

          anch.innerHTML = element.title;
          anch.href = "https://www.imdb.com/find/?q=" + `${element.title}` + "&ref_=nv_sr_sm";
          anch.target = "_blank"

          yt_lk.innerHTML = "Watch it on YouTube"
          yt_lk.href = "https://www.youtube.com/results?search_query=" + `${element.title}`
          yt_lk.target = "_blank"
  
          var posterElement = document.createElement('img');
          posterElement.src = IMG_PATH + element.poster_path;
          
          titleElement.appendChild(anch)
          titleElement.appendChild(brk)
          titleElement.append(yt_lk)
          movieElement.appendChild(titleElement);
          movieElement.appendChild(posterElement);
  
          suggestResultsDiv.appendChild(movieElement);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  });
  })