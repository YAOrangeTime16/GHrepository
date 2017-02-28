# JavaScript 2
### Design Pattern

https://yaorangetime16.github.io/Uppgifter/

Module Pattern | Constructor Pattern 
------------ | -------------
..makes it easy to find a target function among many others | ..is useful to create an instance of a movie

I tried using two different modules in the beginning; one for input and the other for output, but soon, I found it was unnecessary to separate those two functions and I shouldn't do so (because some functions are connected to each other by using the same value, etc). Eventually, used one module pattern to this assignment

**Advise me, please**

I just counldn't come up with other ideas than this, but I used tripple for-loops in the ```getByGenre``` function. Are there any other better / smarter ways to fix it, e.g. by using ```filter()``` or ```map()```?

```javascript
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
```


* ```checkedObj=[]``` is saving all checked genres from the user side
* ```resultArray=[]``` is saving all movies which includes the genres of "checkedObj".

```javascript
movies = [{movie1}, {movie2}, ....]  //Original data
checkedObj = ["drama", "fantasy", "sf"]
resultArray = [{movie1.genres["drama"]}, {movie2.genres["drama", "sf"]}, {movie2.genres["fantasy", "sf"]}]
```