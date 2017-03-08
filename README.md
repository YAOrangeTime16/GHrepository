# JavaScript 2: Yoko Andrae
### Design Pattern

https://yaorangetime16.github.io/uppgifter/

Those are the petterns I used to this assignment:

Module Pattern (Revealing) | Constructor Pattern 
------------ | -------------
..makes it easy to find a target function among many others.    ..is a good way to protect variables (in combination with "let" and "const") from being unexpectedly changed from nowhere | ..is useful to create an instance of a movie anywhere with its simple coding

I tried using two different modules in the beginning; one for data input and the other for output, but then I found that it was unnecessary to separate in two modules, and that it probably would make the codging more complicated (because some functions are connected to each other by using the same value, etc). Therefore, I used eventually one module to this assignment.

**Advise me, please**

I just counldn't come up with other ideas than this, but I used tripple for-loops in the ```getByGenre``` function. Are there any other ways to make it better and to reduce code-lines, e.g. by using ```filter()``` or ```map()```?


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
checkedObj = ["drama", "fantasy", "sf"]  //genres from checkboxes

//↓↓↓
//Matching data between "movies" and "checkedObj" (with the value of "genres")
//↓↓↓

resultArray = [{movie1.genres["drama"]}, {movie2.genres["drama", "sf"]}, {movie2.genres["fantasy", "sf"]}]
```
