# Yoko Andrae / Javascript2 / FEND16

## Design Pattern

https://yaorangetime16.github.io/uppgifter/movie

Those are the petterns I used to this assignment:

Module Pattern (Revealing) | Constructor Pattern 
------------ | -------------
..makes it easy to find a target function among many others.  ..is a good way to protect variables (in combination with "let" and "const") from being unexpectedly changed from nowhere | ..is useful to create an instance of a movie anywhere with its simple coding

I tried using two different modules in the beginning; one for data input and the other for output, but then I found that it was unnecessary to separate in two modules, and that it probably would be causing complexity of coding (because some functions are connected to each other by using the same value, etc). Therefore, I used eventually one module to this assignment.

```javascript

module(function(){

    //Lists of variables;
    
    //Construcotor Definition;
    
    //Functions Difinitions: Model(+Controller);
    //Functions Difinitions: View;
    
    //A list of eventLisners;
    
    return {
        ...
    };
})();

```

#### Within the module:
* MODEL: to manupulate data and return values
* VIEW: to print out to html

### Note
This is not a responsive website as it is focued on "design pattern"

## AJAX API

### About the application
This is a card game application which includes three simple card games. It is made with the help of the "deck of card" API returning responses by json-file.
This application calls the API using jQuery's `$.ajax()` tecknology, and the API requires different URLs to be accessed for its json data, depending on e.g. how many cards the player wants to draw.

### APIs in this application
* Deck of Cards (AJAX / Main)
https://deckofcardsapi.com/

* Pokersolver (npm / Supportive)
https://github.com/goldfire/pokersolver
This is a supplimental API for this application.
I used it to get results of the third game (Five Card Draw), otherwise the coding should be way difficult.

### Tools and Tecknologies
|Working Area | Tool|
|-----|-----|
|Coding|Brackets|
|CSS|Sass|
|Javascript|jQuery|
|extra API|npm browserify, uniq|
|Version Control|GitHub|


Google Fonts

Images
pixabay



###Loading GIF
http://www.loadinfo.net/

###API
https://deckofcardsapi.com/

###sorting array (JS code)
http://webdrawer.net/javascript/jssort.html (Japanese site)