//The data(array) of movies is saved as an external file; "data.js"

//====================
// REVEALING MODULE PATTERN
//====================
let outputData = (function() {
    //=== ALL ELEMENTS FROM THE USER INTERFACE ===
    const btn_allList=document.getElementById('btn_allList');
    const ul=document.createElement('ul');
    const movieInput=document.getElementById('movieInput');
    const yInput=document.getElementById('yInput');
    const btn_add=document.getElementById('btn_add');
    const txtInput = document.getElementById('titleInput');
    const listingDiv = document.getElementById('listingDiv');
    const status=document.getElementById('status');
    const btn_search=document.getElementById('btn_search');
    const yearInput = document.getElementById('yearInput');
    const btn_search_y=document.getElementById('btn_search_y');
    const btn_search_g=document.getElementById('btn_search_g');
    const btn_top = document.getElementById('btn_top');
    const btn_wst = document.getElementById('btn_wst');
    //Those two elements are holding dynamic elements from the function "getYourMovie"
    let add_r;
    let add_g;
    
    // === BRIDGING-VARIABLES ===
    let myMovieObj;
    //the value of this variable is to be created by the function "getYourMovie", and
    //it is used in other functions "addGenre", "dltGenre" and "addRating"

    //====================
    // CONSTRUCTOR & PROTOTYPE
    //====================
    function Create (title, year){
        this.year = year;
        this.title=title;
        this.ratings=[];
        this.genres=[];
    };

    //"cover" is an optional item so far, and
    //it isn't necessary when an instance is created.
    //That is why I set "cover" as a prototype of "Create"-based objects
    Create.prototype.cover = function(imgUrl){
        this.cover=imgUrl;
    }

    // === FUNCTIONS START HERE ===
    let getAllMovies = ()=>{
        let mlist="";
        listingDiv.innerHTML="";
        listingDiv.appendChild(ul);
        movies.map(function(item,i){
            mlist += `<li class="m_list mtxt padding-side bg_op"> ${item.title.toUpperCase()} (${item.year})</li><li class="stxt padding-side green">${item.genres.join(" / ")}</li>`;
        });
        ul.innerHTML= mlist;
    };

    let getYourMovie = (title) =>{
        title=txtInput.value;
        //This is only for clearing the spaces on the interface
        listingDiv.innerHTML="";
        status.innerHTML="";
        //Checking if there is a movie, in the database, matching to the title input from the user side
        let filteredMovie= movies.filter(function(movie){
            if(movie.title == title.toLowerCase()){
                return movie;
            }
        })
        //Saving the matching movie as an array to a variable "myMovieObj" (= [myMovieObj])
        myMovieObj = filteredMovie;
        //If [myMovieObj] has a movie object, print out the movie title
        //And if users wish to add genre and rating to the movie, they can do so from the selectors
        if(myMovieObj.length>0){
            listingDiv.innerHTML= `<span class="ltxt padding-side bg_op"> ${myMovieObj[0].title.toUpperCase()} (${myMovieObj[0].year})</span>
            <span class="stxt green"> ${myMovieObj[0].genres.join(" / ")}</span>
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
                <input type="button" id="add_r" value="add rating">
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
                <input type="button" id="add_g" value="add this genre">
                <input type="button" id="dlt_g" value="delete this genre">
            </div>`;
            add_r=document.getElementById('add_r');
            add_r.addEventListener('click', addRating);
            add_g=document.getElementById('add_g');
            add_g.addEventListener('click', addGenre);
            dlt_g=document.getElementById('dlt_g');
            dlt_g.addEventListener('click', dltGenre);
        } else {
            listingDiv.innerHTML='there is no matching movie';
        }

    };
    
    let addMovie = ()=>{
        let inspecTitle = movieInput.value.toLowerCase(); //this is "required" to fill in on the user side
        let inspecYear = parseFloat(yInput.value);
        //Checking if the title is filled from the user interface, start this code:
        if(inspecTitle !=""){
            let check = movies.map((movieArray)=>movieArray.title);
            if(check.includes(inspecTitle)){
                status.innerHTML = "Your input already exists in the database";
            } else {
                //Creating a movie instance with title & year
                let myMovie = new Create(inspecTitle, inspecYear);
                movies.push(myMovie);
                status.innerHTML = `Your movie has been added`;
                listingDiv.innerHTML=`<span class="bg_op"> ${movies[movies.length-1].title.toUpperCase()}</span>`;
            }
        } else {return false;}
    };

    let addRating=()=>{
        //checking which value of rating is selected, and push it to the movie.[ratings]
        let ratingValue=document.form_for_rating.rating.selectedIndex;
            myMovieObj[0].ratings.push(ratingValue);
            status.innerHTML=`Your rating <strong>"${ratingValue}"</strong> has been added to this movie`;
    };
    
    let addGenre = ()=>{
        let genreValue=document.form_for_genre.genre.value;
        //Check first if the genre to be added does not exist in the "movie.[genres]", and then add it to the movie
        if(myMovieObj[0].genres.indexOf(genreValue) <=-1){
            myMovieObj[0].genres.push(genreValue);
            status.innerHTML=`The genre <span class="green">${genreValue}</span> has been added to this movie`;
        } else {
            status.innerHTML=`<span class="green">${genreValue}</span> genre already exists in this movie`;
        }
    };

    let dltGenre = ()=>{
        let genreValue=document.form_for_genre.genre.value;
        let genreIndex=myMovieObj[0].genres.indexOf(genreValue);
        //check if there is the selected genre in the movie.[genres], and then start deleting code.
        if(genreIndex >=0){
            myMovieObj[0].genres.splice(genreIndex, 1);
            status.innerHTML=`The genre has been deleted from this movie`;
        }else {
            status.innerHTML=`There is no such genre in this movie`;
        }
    };
    
    let getByYear = (yyyy)=>{
        //filtering [movies] by the "year" of the search criterion and create a new array [yr]
        yyyy=parseFloat(yearInput.value);
        let yr = movies.filter((item)=>{
            if(item.year === yyyy){
                return item;
            }
        });
        //in case [yr] includes two or more objects inside, it prints out all movie with the same year "list"
        if(yr.length>0){
            let list="";
            yr.map(function(item){
                list += `<li><span class="padding-side bg_op">${item.title.toUpperCase()}</span> was released in ${item.year}</li>`
                status.innerHTML="";
                listingDiv.innerHTML= `<ul>${list}</ul>`;
            })
        } else {
            listingDiv.innerHTML="";
            status.innerHTML=`There is no movie data released in ${yyyy}`;
        }
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
        let dltDup = resultArray.filter(function(list, item, i) {
            return i.indexOf(list) === item;
        });
        //Printing out all filtered movies through a looping
        if(dltDup.length>0){
            let printOut="";
            dltDup.map(function(item){
                printOut+=`<li class="bg_op padding-side">${item.title.toUpperCase()} (${item.year})</li><li class="green padding-side">${item.genres.join(" / ")}</li>`;
                listingDiv.innerHTML=`<ul>${printOut}</ul>`;
            })
        } else {
            listingDiv.innerHTML="";
            status.innerHTML=`There is no matching movie in the database`;
        }
    };

    let getRatingsAverage = ()=>{
        //Iterating [movies]
        for(let i =0; i<movies.length; i++){
            //Getting each ratings array movies[i].ratings
            let eachRatingArray = movies[i].ratings;
            //Iterating [ratings] to get each rating average of movies
            let sum = 0;
            for(let j=0; j<eachRatingArray.length; j++){
                sum+= eachRatingArray[j];
            }
            //Creating a new property "avg" to make it easier to compare value of average
            //thie value is to be used in other functions "getTopRating", "getWorstRating"
            movies[i].avg=sum/eachRatingArray.length;
        }
        return movies;
    };
    
    let getTopRating = ()=>{
        //getting average value of every movie
        getRatingsAverage();
        //creating a variable to save a list of Top Rated Moives
        let topRated="";
        listingDiv.innerHTML="";
        status.innerHTML="";
        //Creating a new array having ONLY avarage values [allAvg]
        let allAvg = movies.map((item)=>item.avg);
        //checking the highest value in the [allAvg], and getting the index of it
        let indexOfMaxValue=allAvg.indexOf(Math.max.apply(null, allAvg));
        //getting the highest value of ratings
        let getMaxValue=movies[indexOfMaxValue].avg;
        //Matching "indexOfMaxValue" to [movies] to get a {movie} siting on this index
        return movies.filter((item, i)=>{
            if(item.avg === getMaxValue){
                //saving a list of movies, which has the highest rating value, to "topRated"
                topRated += `<li class="m_list padding-side bg_op mtxt"> ${item.title.toUpperCase()} (${item.year})</li>`;
                listingDiv.innerHTML=`<ul class="ltxt">The top rated movie(s) has Rating: ${item.avg} ${topRated}</ul>`;
            }
        })
    };

    let getWorstRating = ()=>{
        //getting average value of every movie
        getRatingsAverage();
        //creating a variable to save a list of Worst Rated Moives
        let lowRated="";
        //Creating a new array having ONLY avarage values [allAvg]
        let allAvg = movies.map((item)=>item.avg);
        //checking the minimum value in the [allAvg], and getting the index of it
        let indexOfMinValue=allAvg.indexOf(Math.min.apply(null, allAvg));
        //getting the lowest value of ratings
        let getMinValue=movies[indexOfMinValue].avg;
        //Matching "indexOfMinValue" to [movies] to get a {movie} siting on this index
        return movies.filter((item, i)=>{
            if(item.avg === getMinValue){
                lowRated += `<li class="m_list padding-side bg_op mtxt"> ${item.title.toUpperCase()} (${item.year})</li>`;
                listingDiv.innerHTML=`<ul class="ltxt">The worst rated movie(s) has Rating: ${item.avg}  ${lowRated}</ul>`;
            }
        })
    };
    
    // === EVENTLISTENERS ===
    btn_allList.addEventListener('click', getAllMovies);
    btn_search.addEventListener('click', getYourMovie);
    btn_search_y.addEventListener('click', getByYear);
    btn_top.addEventListener('click', getTopRating);
    btn_wst.addEventListener('click', getWorstRating);
    btn_add.addEventListener('click', addMovie);
    btn_search_g.addEventListener('click', getByGenre);

    // === PUBLIC METHODS ===
    return {
        oAll: getAllMovies,
        oTitle: getYourMovie,
        oYear: getByYear,
        oGenre: getByGenre,
        oTop: getTopRating,
        oWorst: getWorstRating,
        iMovie: addMovie,
        iGenre: addGenre,
        iGenreDelete: dltGenre,
        iRating: addRating
    }
    
}());