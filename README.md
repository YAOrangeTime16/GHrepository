# JavaScript 2: Yoko Andrae
### Design Pattern

https://yaorangetime16.github.io/uppgifter/

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