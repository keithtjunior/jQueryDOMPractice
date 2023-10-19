$(document).ready(function(){
    const userMovies = new MovieList();

    $('form').on('submit', function(e){
        e.preventDefault();
        let title = $('#title').val();
        let rating = $('#rating').val();

        //confirm valid input values
        if(!title || title.length < 2){
            alert('Please use a title with at least 2 characters.');
            return;
        }
        if(!rating || rating < 0 || rating > 10){
            alert('Movie rating must be between 0 and 10.');
            return;
        }

        //add movie title and rating to userMovie list
        userMovies.addMovie(title,rating);

        //clear input values
        $('#title').val('');
        $('#rating').val('');

        updateList();
    });

    //sort movie list by rating 
    $('#sort-rating').on('click', function(){
        if(userMovies && userMovies.moviesMap.size >= 1){
            userMovies.sortMoviesByRating();
            updateList();
        }  
    });

    //sort movie list by title 
    $('#sort-title').on('click', function(){
        if(userMovies && userMovies.moviesMap.size >= 1){
            userMovies.sortMoviesByTitle();
            updateList();
        }   
    });

    //remove movie element from movie list on button click
    //remove movie obj from userMovie based on movie id/key
    $('#movie-list').on('click', '.delete', function(){
        let id = Number($(this).parent().attr('id').substr(-1));
        userMovies.removeMovie(id)
        $(this).parent().remove();
    });

    //append movies to movie list div from userMovie
    function updateList(){
        $('#movie-list').empty();
        $('#movie-list').append(function(){
            return buildFullMovieEl(userMovies.moviesMap);
        });
    }
});

//build movie element div for html
const buildMovieEl = (id, title, rating) => `<div class="movie" id="movie-${id}"><span class="title">${title}</span><span class="rating">${buildStarRating(rating)}</span><button class="delete">Delete</button></div>`;

//build stars from rating value
const buildStarRating = (rating) => [...Array(10)].map((val,idx)=>{ if(idx >= rating) return '&star;'; return '&starf;'}).join('');

//build full movie element by iterating through movie map values 
const buildFullMovieEl = (map) => {
    let movieEl= '';
    for( let [key,movie] of map.entries()){
        movieEl += buildMovieEl(key, movie.title, movie.rating);
    }
    return movieEl;
}


