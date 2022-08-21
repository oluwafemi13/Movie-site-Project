const API_URl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5461e2170c497477bbd7f56bd52d33b2&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=5461e2170c497477bbd7f56bd52d33b2&query="';
const main = document.getElementById('main');

const search = document.getElementById('search')
const form = document.getElementById('form')
getMovies(API_URl)

async function getMovies(url){
    const response = await fetch(url)
    const data = await response.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.InnerHTML =''

    movies.forEach((movie) => {
        const{title, poster_path, vote_average, overview } = movie

        const movieElement =document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML=`
        
            <img src="${IMG_PATH +poster_path}"
            alt="${title}"
            >
            <div class="movie-info">
                <h3>${title}</h3>
                   <span class="${checkMovieRate(vote_average)}">${vote_average}</span> 
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        
        `
        main.appendChild(movieElement)
    });
}

function checkMovieRate(movieRate){
    if(movieRate>=8){
        return 'green'
    }else if(movieRate >=5 || movieRate<=7.9){
        return 'yellow'
    }else  if(movieRate <=4.9){
        return 'red'
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !==''){
        getMovies(SEARCH_API + searchTerm);

        search.value=''
    }else{
        window.location.reload()
    }
})
