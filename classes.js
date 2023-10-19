class Movie {
    constructor(title,rating){
        this.title = title;
        this.rating = rating;
        this.movieObj = {title, rating};
    }
}

class MovieList {
    constructor(){
        this.moviesMap = new Map();
        this.movieId = 1;
        this.ratingSortAsc = true;
        this.titleSortAsc = true;
    }
    addMovie(title,rating){
        let {moviesMap} = this;
        let {movieId} = this;
        const m = new Movie(title, rating);
        moviesMap.set(movieId, m.movieObj);
        this.movieId++;
    }
    removeMovie(key){
        let {moviesMap} = this;
        moviesMap.delete(key);
    }
    sortMoviesByRating(){
        let {moviesMap, ratingSortAsc} = this;
        const sortedArray = Array.from(moviesMap).sort((a,b) => {
            if(ratingSortAsc) return a[1].rating - b[1].rating;
            else return b[1].rating - a[1].rating;
        });
        this.moviesMap = new Map(sortedArray);
        this.ratingSortAsc = !ratingSortAsc;
    }
    sortMoviesByTitle(){
        let {moviesMap, titleSortAsc} = this;
        const sortedArray = Array.from(moviesMap).sort((a,b) => {
            if(titleSortAsc){
                if(a[1].title < b[1].title) return -1;
                if(a[1].title > b[1].title) return 1;
            }else{
                if(a[1].title < b[1].title) return 1;
                if(a[1].title > b[1].title) return -1;
            }
            return 0;
        });
        this.moviesMap = new Map(sortedArray);
        this.titleSortAsc = !titleSortAsc;
    }
}