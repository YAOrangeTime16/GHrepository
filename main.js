//The data(array) of movies is saved as an external file; "data.js"

//Get all emelements here
let btn_allList=document.getElementById('btn_allList');
let ul=document.createElement('ul');
let movieInput=document.getElementById('movieInput');
let yInput=document.getElementById('yInput');
let btn_add=document.getElementById('btn_add');
let txtInput = document.getElementById('titleInput');
let listingDiv = document.getElementById('listingDiv');
let status=document.getElementById('status');
let btn_search=document.getElementById('btn_search');
let yearInput = document.getElementById('yearInput');
let btn_search_y=document.getElementById('btn_search_y');
let btn_top = document.getElementById('btn_top');
let btn_wst = document.getElementById('btn_wst');
let add_r;
let add_g;

// === REVEALING MODULE PATTERN ===
let outputData = (function() {

    //Bridging-variables
    let myMovieObj;
    let add_r;
    
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
        listingDiv.innerHTML="";
        status.innerHTML="";
        let filteredMovie= movies.filter(function(movie){
            if(movie.title == title.toLowerCase()){
                return movie;
            }
        })
        myMovieObj = filteredMovie;
        if(myMovieObj.length>0){
            listingDiv.innerHTML= `<span class="ltxt padding-side bg_op"> ${myMovieObj[0].title} (${myMovieObj[0].year})</span>
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

    }
    
    let addMovie = function(){
        let inspecTitle = movieInput.value.toLowerCase();
        let inspecYear = parseFloat(yInput.value);
        if(inspecTitle !=""){
            let check = movies.map(function(movieArray){ return movieArray.title; });
            if(check.includes(inspecTitle)){
                status.innerHTML = "Your input already exists in the database";
            } else {
                let myMovie = new Create(inspecTitle, inspecYear);
                movies.push(myMovie);
                status.innerHTML = `Your movie has been added`;
                listingDiv.innerHTML=movies[movies.length-1].title.toUpperCase();
            }
        } else { return false;}
        
        
    }

    let addRating=function(){
        let ratingValue=document.form_for_rating.rating.selectedIndex;
            myMovieObj[0].ratings.push(ratingValue);
            status.innerHTML=`Your rating <strong>"${ratingValue}"</strong> has been added to this movie`;
    }
    
    let addGenre = ()=>{
        let genreValue=document.form_for_genre.genre.value;
        if(myMovieObj[0].genres.indexOf(genreValue) <=-1){
            myMovieObj[0].genres.push(genreValue);
            status.innerHTML=`The genre <span class="green">${genreValue}</span> has been added to this movie`;
        } else {
            listingDiv.innerHTML=`<span class="green">${genreValue}</span> genre already exists in this movie`;
        }
    }

    let dltGenre = ()=>{
        let genreValue=document.form_for_genre.genre.value;
        let genreIndex=myMovieObj[0].genres.indexOf(genreValue);
        if(genreIndex >=0){
            myMovieObj[0].genres.splice(genreIndex, 1);
            status.innerHTML=`The genre has been deleted from this movie`;
        }else {
            status.innerHTML=`There is no such genre in this movie`;
        }
    }
    
    let getByYear = (yyyy)=>{
        yyyy=parseFloat(yearInput.value);
        let yr = movies.filter((item)=>{
            if(item.year === yyyy){
                return item;
            }
        });
        if(yr.length>0){
            yr.map(function(item){
                status.innerHTML="";
                listingDiv.innerHTML= `<span class="padding-side bg_op">${item.title.toUpperCase()}</span> was released in ${item.year}`;
            })
        } else {
             listingDiv.innerHTML="";
            status.innerHTML=`There is no movie data released in ${yyyy}`;
        }
    }
    
    let getByGenre=(gr)=>{
        
    };

    let getRatingsAverage = ()=>{
        //Iterate Object Array of Movies movies[i]
        for(let i =0; i<movies.length; i++){
            //Get each ratings array movies[i].ratings
            let eachRatingArray = movies[i].ratings;
            //Iterate ratings array to get each average of ratings
            let sum = 0;
            for(let j=0; j<eachRatingArray.length; j++){
                sum+= eachRatingArray[j];
            }
            //Create a new property "avg" to make it easier to compare value of average
            movies[i].avg=sum/eachRatingArray.length;
        }
        return movies;
    };
    
    let getTopRating = ()=>{
        getRatingsAverage();
        let topRated="";
        listingDiv.innerHTML="";
        status.innerHTML="";
        let allAvg = movies.map(function(item){ return item.avg});
        let indexOfMaxValue=allAvg.indexOf(Math.max.apply(null, allAvg));
        let getMaxValue=movies[indexOfMaxValue].avg;
        return movies.filter(function(item, i){
            if(item.avg === getMaxValue){
                topRated += `<li class="m_list padding-side bg_op mtxt"> ${item.title.toUpperCase()} (${item.year})</li>`;
                listingDiv.innerHTML=`<ul class="ltxt">The top rated movie(s) has Rating: ${item.avg} ${topRated}</ul>`;
            }
        })
    }

    let getWorstRating = ()=>{
        getRatingsAverage();
        let lowRated="";
        let allAvg = movies.map(function(item){ return item.avg});
        let indexOfMinValue=allAvg.indexOf(Math.min.apply(null, allAvg));
        let getMinValue=movies[indexOfMinValue].avg;
        return movies.filter(function(item, i){
            if(item.avg === getMinValue){
                lowRated += `<li class="m_list padding-side bg_op mtxt"> ${item.title.toUpperCase()} (${item.year})</li>`;
                listingDiv.innerHTML=`<ul class="ltxt">The worst rated movie(s) has Rating: ${item.avg}  ${lowRated}</ul>`;
            }
        })
    }

    //PUBLIC methods:
    return {
        iMovie: addMovie,
        iGenre: addGenre,
        iGenreDelete: dltGenre,
        iRating: addRating,
        oAll: getAllMovies,
        oTitle: getYourMovie,
        oYear: getByYear,
        oTop: getTopRating,
        oWorst: getWorstRating
    }
    
}());

// === EVENTLISTENERS ===
btn_allList.addEventListener('click', outputData.oAll);
btn_search.addEventListener('click', outputData.oTitle);
btn_search_y.addEventListener('click', outputData.oYear);
btn_top.addEventListener('click', outputData.oTop);
btn_wst.addEventListener('click', outputData.oWorst);
btn_add.addEventListener('click', outputData.iMovie);


    // === CONSTRUCTOR & PROTOTYPE ===
function Create (title, year){
    this.year = year;
    this.title=title;
    this.ratings=[];
    this.genres=[];
};

Create.prototype.cover = function(imgUrl){
    this.cover=imgUrl;
}