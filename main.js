//The data(array) of movies is saved as an external file; "data.js"

/*====================
   REVEALING MODULE PATTERN
  ==================== */
let database=(function(){
        //=== ALL ELEMENTS FROM THE USER INTERFACE ===
    const btn_allList=document.getElementById('btn_allList');
    const movieInput=document.getElementById('movieInput');
    const yearInput=document.getElementById('yearInput');
    const btn_addMovie=document.getElementById('btn_addMovie');
    const urlInput=document.getElementById('urlInput');
    const seachByTitle = document.getElementById('seachByTitle');
    const listingDiv = document.getElementById('listingDiv');
    const status=document.getElementById('status');
    const btn_search=document.getElementById('btn_search');
    const searchByYear = document.getElementById('searchByYear');
    const btn_searchByYear=document.getElementById('btn_searchByYear');
    const btn_searchBygenre=document.getElementById('btn_searchBygenre');
    const btn_top = document.getElementById('btn_top');
    const btn_worst = document.getElementById('btn_worst');
    
    //Those two elements are holding dynamic elements from the function "getYourMovie"
    let btn_addRating;
    let btn_addGenre;
    
    // === BRIDGING-VARIABLES ===
    let userMovieObj;
    let addingStatus;
    let movieArray=[];
    let movieWithRatings=[];
    let savedValue;

    /*====================
      CONSTRUCTOR & PROTOTYPE
      ==================== */
    function Create (title, year){
        this.year = year;
        this.title=title;
        this.ratings=[];
        this.genres=[];
    };

    //Optional item
    Create.prototype.cover = function(imgUrl){
        this.cover=imgUrl;
    }

    // === FUNCTIONS START HERE ===
    let getAllMovies=()=>{
        //Clearing old data inside the shared-array
        movieArray=[];
        movieArray=movies.map(function(everyMovie){
            return everyMovie;
        });
        return movieArray;
    };

    let getUserMovie=(title)=>{
        title=seachByTitle.value;
        //Checking if there is a movie, in the database, matching to the title input from the user side
        let filteredMovie= movies.filter(function(movie){
            if(movie.title == title.toLowerCase()){
                return movie;
            }
        });
        //Saving the matching movie as an array to a variable "myMovieObj" (= [myMovieObj])
        userMovieObj = filteredMovie;
        return userMovieObj;
    };

    let addMovie=(inspecTitle, inspecYear)=>{
        inspecTitle = movieInput.value.toLowerCase(); //this is "required" to fill in on the user side
        inspecYear = parseFloat(yearInput.value);
        let coverUrl=urlInput.value||'http://design-ec.com/d/e_others_50/l_e_others_501.png';
         //Checking if the title is filled from the user interface, start this code:
        if(inspecTitle !=""){
            //Getting an array which saves only movie titles
            let check = movies.map((checkMovie)=>checkMovie.title);
            if(check.includes(inspecTitle)){
                addingStatus="Your input already exists in the database";
                userMovieObj=inspecTitle;
            } else {
                //Creating a movie instance with title & year
                let myMovie = new Create(inspecTitle, inspecYear);
                myMovie.cover=coverUrl;
                movies.push(myMovie);
                addingStatus="Your movie has been added";
                userMovieObj=movies[movies.length-1].title.toUpperCase();
            }
        } else {return false;}
    };

    let addRating=()=>{
        //checking which value of rating is selected, and pushing it to the movie.[ratings]
        savedValue=document.form_for_rating.rating.selectedIndex;
        userMovieObj[0].ratings.push(savedValue);
    };

    let addGenre =()=>{
        savedValue=document.form_for_genre.genre.value;
        //Check first if the genre to be added does not exist in the "movie.[genres]", and then add it to the movie
        let check=userMovieObj[0].genres.indexOf(savedValue);
        if(check <=-1){
            userMovieObj[0].genres.push(savedValue);
            addingStatus= `The genre ${savedValue} has been added to this movie`;
        } else {
            addingStatus=`${savedValue} genre already exists in this movie`;
        }
        return addingStatus;
    };

    let deleteGenre=()=>{
        let genreValue=document.form_for_genre.genre.value;
        let genreIndex=userMovieObj[0].genres.indexOf(genreValue);
        //check if there is the selected genre in the movie.[genres], and then start deleting code.
        if(genreIndex >=0){
            userMovieObj[0].genres.splice(genreIndex, 1);
            addingStatus= `The genre has been deleted from this movie`;
        }else {
            addingStatus=`There is no such genre in this movie`;
        }
    };
    
    let getByYear=(yyyy)=>{
        //filtering [movies] by the "year" of the search criterion and create a new array [userYear]
        yyyy=parseFloat(searchByYear.value);
        movieArray=[];
        movieArray = movies.filter((item)=>{
            if(item.year === yyyy){
                return item;
            }
        });
        return movieArray;
    };
    
    let getByGenre=()=>{
        //Transforming HTMLCollections to an array [checkArray]
        let checkArray=[];
        let checkCollection=document.getElementsByClassName('check_g');
        for(let i =0; i<checkCollection.length; i++){
            checkArray.push(checkCollection[i]);
        }
        //Taking checked "genres" and save them to another array [checkedObj]
        let checkedObj=checkArray
        .filter((item, i)=>{if(item.checked){return item.value;}})
        .map((elem)=>elem.value);
        
        //Comparing genres in the [checkedObj] and those in the [movies]
        //Getting movie objects that have matching genres of [checkedObj]
        let resultArray=[];
        for(let i=0; i<movies.length; i++){
            for(let j=0; j<movies[i].genres.length; j++){
                for(let k=0; k<checkedObj.length; k++){
                    if(movies[i].genres[j] === checkedObj[k]){
                    resultArray.push(movies[i]);
                    }
                } 
            }
        }
        //Removing duplicated movie objects in the array [resultArray]
        let deleteDuplicatedMovie = resultArray.filter(function(list, item, index) {
            return index.indexOf(list) === item;
        });
        
        moviesArray=[];
        //Saving the eventual value (array) to a bridging-variable
        moviesArray=deleteDuplicatedMovie;
        return moviesArray;
    };

    let getRatingsAverage=()=>{
        //Retriving only movies which have been added ratings (Here, movies without ratings should be eliminated)
        movieWithRatings=movies.filter(function(movieWithRating){
            if(movieWithRating.ratings.length>0){
                return movieWithRatings;
            }
        });
        //Iterating [movies]
        for(let i =0; i<movieWithRatings.length; i++){
            //Getting each ratings array movies[i].ratings
            let eachRatingArray = movieWithRatings[i].ratings;
            //Iterating [ratings] to get each rating average of movies
            let sum = 0;
            for(let j=0; j<eachRatingArray.length; j++){
                sum+= eachRatingArray[j];
            }
            //Creating a new property "avg" to make it easier to compare value of average
            //thie value is to be used in other functions "getTopRating", "getWorstRating"
            movieWithRatings[i].avg=sum/eachRatingArray.length;
        }
        return movieWithRatings;
    };
    
    let getTopRating =()=>{
        //getting average value of every movie
        getRatingsAverage();
        //Creating a new array having ONLY avarage values [allAvg]
        let allAvg = movieWithRatings.map((item)=>item.avg);
        //checking the highest value in the [allAvg], and getting the index of it
        let indexOfMaxValue=allAvg.indexOf(Math.max.apply(null, allAvg));
        //getting the highest value of ratings
        let getMaxValue=movieWithRatings[indexOfMaxValue].avg;
        //Clearing old data in the [movieArray] shared by other functions
        movieArray=[];
        //Matching "indexOfMaxValue" to [movieWithRatings] to get a {movie} siting on this index
        movieWithRatings.filter((topMovieObj)=>{
            if(topMovieObj.avg === getMaxValue){
                //saving a list of movies, which has the highest rating value, to "movieArray"
                return movieArray.push(topMovieObj);
            }
        })
        return movieArray;
    };

    let printTopRating=()=> {
        getTopRating();
        listingDiv.innerHTML="";
        status.innerHTML="";
        let list_topRated="";
        movieArray.map((movieObj)=>{
            list_topRated+=`<li class="m_list padding-side bg_op mtxt"> ${movieObj.title.toUpperCase()} (${movieObj.year})</li>`;
        })
        listingDiv.innerHTML=`<ul class="ltxt">The top rated movie(s) has Rating: ${movieArray[0].avg} ${list_topRated}</ul>`;
    };

    let getWorstRating=()=>{
        //getting average value of every movie
        getRatingsAverage();
        //Creating a new array having ONLY avarage values [allAvg]
        let allAvg = movieWithRatings.map((item)=>item.avg);
        //checking the minimum value in the [allAvg], and getting the index of it
        let indexOfMinValue=allAvg.indexOf(Math.min.apply(null, allAvg));
        //getting the lowest value of ratings
        let getMinValue=movieWithRatings[indexOfMinValue].avg;
        //Clearing old data in the [movieArray] shared by other functions
        movieArray=[];
        //Matching "indexOfMinValue" to [movieWithRatings] to get a {movie} sitting on this index
        movieWithRatings.filter((worstMovieObj)=>{
            if(worstMovieObj.avg === getMinValue){
                return movieArray.push(worstMovieObj);
            }
        })
        return movieArray;
    };
    
    // === FUNCTIONS TO OUTPUT ONTO THE HTML PAGE ===

    let printAllMovies=()=>{
        getAllMovies();
        listingDiv.innerHTML="";
        status.innerHTML="";
        //Saving a list of movies temporarily
        let list_allMovies="";
        movieArray.map((movieObj)=>{
            list_allMovies+=`<figure>
                                <figcaption>
                                <span class="bg_op padding-side">${movieObj.title.toUpperCase()} (${movieObj.year})</span><br>
                                <span class="green stxt padding-side">${movieObj.genres.join(" / ")}</span>
                                </figcaption>
                                <img class="img_sizing" src=${movieObj.cover}>
                            </figure>`;
            return list_allMovies;
        });
        listingDiv.innerHTML= `<p>There are ${movieArray.length} movies in the database</p><ul>${list_allMovies}</ul>`;
    };
    
    let printUserMovie=()=>{
        getUserMovie();
        //Clearing the old output on the interface
        listingDiv.innerHTML="";
        status.innerHTML="";

        //If [userMovieObj] has one or more movie object, print out the movie title
        //And if users wish to add genre and rating to the movie, they can do so from the selectors
        if(userMovieObj.length>0){
            listingDiv.innerHTML= `<span class="ltxt padding-side bg_op"> ${userMovieObj[0].title.toUpperCase()} (${userMovieObj[0].year})</span>
            <span class="stxt green"> ${userMovieObj[0].genres.join(" / ")}</span>
            <div class="container_r">
                <form name="form_for_rating">
                <select name="rating" size=1 id="select">
                    <option value="">Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </form>
                <input type="button" id="btn_addRating" value="add rating">
                </div>
            <div class="container_r">
                <form name="form_for_genre">
                <select name="genre" size=1 id="select">
                    <option value="">Select Genre</option>
                    <option value="adventure">adventure</option>
                    <option value="action">action</option>
                    <option value="animation">animation</option>
                    <option value="comedy">comedy</option>
                    <option value="drama">drama</option>
                    <option value="family">family</option>
                    <option value="fantasy">fantasy</option>
                    <option value="mistery">mistery</option>
                    <option value="romance">romance</option>
                    <option value="sf">sf</option>
                    <option value="war">war</option>
                </select>
                </form>
                <input type="button" id="btn_addGenre" value="add this genre">
                <input type="button" id="btn_deleteGenre" value="delete this genre">
            </div>`;
            btn_addRating=document.getElementById('btn_addRating');
            btn_addRating.addEventListener('click', printAddedRating);
            btn_addGenre=document.getElementById('btn_addGenre');
            btn_addGenre.addEventListener('click', printAddedGenre);
            btn_deleteGenre=document.getElementById('btn_deleteGenre');
            btn_deleteGenre.addEventListener('click', printDeletedGenre);
        } else {
            listingDiv.innerHTML='there is no matching movie';
        }
    };
    
    let printAddedMovie=()=>{
        addMovie();
        listingDiv.innerHTML=`<span class="bg_op"> ${userMovieObj}</span>`;
        status.innerHTML = addingStatus;
    };
    
    let printAddedRating=()=>{
        addRating();
        status.innerHTML=`Your rating <strong>"${savedValue}"</strong> has been added to this movie`;
    };
    
    let printAddedGenre=()=>{
        addGenre();
        status.innerHTML=addingStatus;
    };
    
    let printDeletedGenre=()=>{
        deleteGenre();
        status.innerHTML=addingStatus;
    };
    
    let printMoviesByYear=()=>{
        getByYear();
        listingDiv.innerHTML="";
        status.innerHTML="";
        //in case [movieArray] includes two or more objects inside, it prints out all movie with the same year "list"
        if(movieArray.length>0){
            let list_moviesUserYear="";
            movieArray.map(function(item){
                list_moviesUserYear += `<figure><figcaption><span class="padding-side bg_op">${item.title.toUpperCase()}</span> was released in ${item.year}</figcaption><img class="img_sizing" src=${item.cover}><figure>`
                listingDiv.innerHTML= `${list_moviesUserYear}`;
            })
        } else {
            status.innerHTML=`There is no movie data released in ${searchByYear.value}`;
        }
    };
    
    let printByGenre=()=>{
        getByGenre();
        status.innerHTML="";
        listingDiv.innerHTML="";
        //Printing out all filtered movies through a looping
        if(moviesArray.length>0){
            let list_moviesByGenres="";
            moviesArray.map(function(item){
                list_moviesByGenres+=`<figure>
                                <figcaption>
                                <span class="bg_op padding-side">${item.title.toUpperCase()} (${item.year})</span><br>
                                <span class="green stxt padding-side">${item.genres.join(" / ")}</span>
                                </figcaption>
                                <img class="img_sizing" src=${item.cover}>
                                </figure>`;
                listingDiv.innerHTML=`${list_moviesByGenres}`;
            })
        } else {
            status.innerHTML=`There is no matching movie in the database`;
        }
    };
    
    let printWorstRating=()=>{
        getWorstRating();
        let list_lowRated="";
        movieArray.map(function(movieObj){
            list_lowRated+=`<li class="m_list padding-side bg_op mtxt"> ${movieObj.title.toUpperCase()} (${movieObj.year})</li>`;
            return list_lowRated;
        })
        listingDiv.innerHTML=`<ul class="ltxt">The worst rated movie(s) has rating ${movieArray[0].avg}: ${list_lowRated}</ul>`;
    };
    
    // === EVENTLISTENERS ===
    btn_allList.addEventListener('click', printAllMovies);
    btn_search.addEventListener('click', printUserMovie);
    btn_searchByYear.addEventListener('click', printMoviesByYear);
    btn_top.addEventListener('click', printTopRating);
    btn_worst.addEventListener('click', printWorstRating);
    btn_addMovie.addEventListener('click', printAddedMovie);
    btn_searchBygenre.addEventListener('click', printByGenre);

    // === PUBLIC METHODS ===
    return {
        oAll: getAllMovies,
        oTitle: getUserMovie,
        oYear: getByYear,
        oGenre: getByGenre,
        oTop: getTopRating,
        oWorst: printWorstRating,
        iMovie: addMovie,
        iGenre: addGenre,
        iGenreDelete: deleteGenre,
        iRating: addRating
    };
}());