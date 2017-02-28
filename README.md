# JavaScript 2
### Design Pattern

https://yaorangetime16.github.io/Uppgifter/

Module Pattern | Constructor Pattern 
------------ | -------------
Easy to find a target function among many | useful to create an instance of a movie

Tried using two different modules; one for input and the other for output, but soon, I found it was unnecessary to separate those two functions and I shouldn't do so (because some functions are connected to each other by using the same value, etc). Eventually, used one module pattern to this assignment

**Asking for advice**
There is tripple for-loops in the ```getByGenre``` function. Don't know how to fix them with ```filter()``` or ```map()```.

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


```checkedObj=[]``` is saving all checked genres from the user side
```resultArray=[]``` is saving all movies which includes the genres of "checkedObj".

```javascript
movies = [{movieInDataBase1}, {movieInDataBase1}, ....]
checkedObj = ["drama", "fantasy", "sf"]
resultArray = [{movie1.genres["drama"]}, {movie2.genres["drama", "sf"]}]
```

