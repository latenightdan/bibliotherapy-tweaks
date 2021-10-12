var btn = document.getElementById("btn");
var appendSectionOne = document.querySelector(".something");
var problemTitle = document.querySelector(".problem-title");
var problemSubTitle = document.querySelector(".problem-subtitle");
var userInputEl = document.querySelector("#user-form");
var problem = document.querySelector("#book-search");
var quoteAuthor = document.querySelector(".quote-author")
var btn = document.querySelector("#btn");
// var test = document.querySelector(".test");
var array = [];

// $(".health-btn").click(handler)
$(".health-btn").on("click", handler)
//if you have to dynamically update, use onclick: on("click", handler)
function handler() {
    var bookData = $(this).data("vegetable");
    var dictionaryData = $(this).data("fruit");

    getBookData(bookData);
    quotes(dictionaryData);
    // getDictionaryData(dictionaryData);
}
$(".myBooks").on("click", loadItem)


function inputHandler(event) {
    event.preventDefault();

    var problemData = problem.value.trim();
    console.log(problemData);
    if (problemData) {
        console.log(problemData);
        problem.value = "";
        getBookData(problemData);
allBooks(problemData);
quotes(problemData);
problemTitle.textContent = problemData;
        // console.log(cityData)
        // console.log(city.value);

    }
    else {
        alert("wrong");
    }

}

userInputEl.addEventListener("submit", inputHandler);
// console.log(testArray.Problem)
//api

var allBooks = function (search) {
    var bookApi = "https://www.googleapis.com/books/v1/volumes?q=" + search
    fetch(bookApi).then(function (response) {
        response.json().then(function (data) {

           
           
            searchBooks(data);
            
        })
        .catch(err => {
            console.log('error', err);
        });
        
    });
}

allBooks();








function searchBooks(search){
    $("#something").empty();
    for (var i = 0; i < search.items.length; i++){
       

        var img = new Image();
        img.classList = "right-align"
        img.src = search.items[i].volumeInfo.imageLinks.thumbnail;






var bookEl = document.createElement("div");

//style this bookEl class

// var image = volume.items[i].volumeInfo.imageLinks.thumbnail;

var authors = search.items[i].volumeInfo.authors;
var bookName = document.createElement("span");
bookName.textContent = " Author: " + authors;
bookName.classList = "center-align book-div";

var bookTitles = search.items[i].volumeInfo.title;

var bookTitlesSpan = document.createElement("span");
bookTitlesSpan.textContent = bookTitles;
bookTitlesSpan.classList = "center-align book-div";
bookEl.classList = " center-align description";
var description = search.items[i].volumeInfo.description;
var bookDescriptionSpan = document.createElement("span");
bookDescriptionSpan.textContent = description;
bookDescriptionSpan.classlist = "description";
linebreak = document.createElement("br");
linebreak2 = document.createElement("br");
linebreak3 = document.createElement("br");
linebreak4 = document.createElement("br");
var saveButton = document.createElement("button");
saveButton.textContent = "save";
saveButton.classList = "save"


bookEl.appendChild(img);
bookEl.appendChild(linebreak);

bookEl.appendChild(bookTitlesSpan);
bookEl.appendChild(linebreak2);
bookEl.appendChild(bookName);
bookEl.appendChild(linebreak3);
bookEl.appendChild(bookDescriptionSpan);
bookEl.appendChild(linebreak4);
bookEl.appendChild(saveButton);


appendSectionOne.appendChild(bookEl);

$(".save").on("click", function (event){



            
    event.stopImmediatePropagation();
    console.log(this.textContent);
    
   var btn = this;
   btn.disabled = true;
    var text = $(this).closest("div");
    saveTasks(text);
    console.log(text[0])
    // var res = string(text[0]);

    
   array.push(text[0].innerHTML);
   console.log(array)
  
    
  

    localStorage.setItem("books", array);


});

    }
    


}













var getBookData = function (bookData) {
    //finds list we make on google books
    var bookApi = "https://www.googleapis.com/books/v1/users/106161699745885220854/bookshelves"
    fetch(bookApi).then(function (response) {
        response.json().then(function (data) {



            //since the first search doesn't give you the actual books, this cycles through them
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].title === bookData) {
                    //send out title and description
                    var refinedData = data.items[i];
                    displayTitle(refinedData);


                    var steve = data.items[i].id;

                    var bookVolume = "https://www.googleapis.com/books/v1/users/106161699745885220854/bookshelves/" + steve + "/volumes"
                    fetch(bookVolume).then(function (response) {
                        response.json().then(function (volume) {
                            console.log(volume)
                            //sends data display books for loop
                            displayBooks(volume);
                            // saveTasks(volume);
                        });
                    });
                }
            };
        });
    });
};
function quotes(quote){
    $.ajax({ 
        type : "GET", 
        url : "https://api.paperquotes.com/apiv1/quotes/?tags=" + quote  , 
        beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Token 8e4f20e7331a660b5c8db679d6be07b0797ef440');},
        success : function(result) { 
            console.log(result.results); 
            problemTitle.textContent = quote;
            quotePrinter(result);
            
            
console.log(result);
        }, 
        error : function(result) { 
          //handle the error
        } 
      }); 
     
};



var quotePrinter = function(result){
    
    console.log(result);
    
    var random = result.results[Math.floor(Math.random() * result.results.length)];
    console.log(random.quote)
    console.log(random.author)
    
    problemSubTitle.textContent = '"' +random.quote + '"';
    problemSubTitle.classList = "center-align";
    quoteAuthor.classList = "center-align book-subtitle";
    quoteAuthor.textContent = "- " +random.author;
   

}

quotes("Happy");

var displayTitle = function (refinedData) {
    // console.log(results)
    console.log(refinedData);
    problemTitle.textContent = refinedData.textContent;
    problemTitle.classList = "center-align book-title";
   

}

//this needs major stylin
var displayBooks = function (volume) {
    $("#something").empty();
    for (var i = 0; i < volume.items.length; i++) {
        // console.log(volume.items[i])

        // var titles = volume.items[i].volumeInfo.title;
        var img = new Image();
        img.classList = "right-align"
        img.src = volume.items[i].volumeInfo.imageLinks.thumbnail;

        var bookEl = document.createElement("div");

        //style this bookEl class

        // var image = volume.items[i].volumeInfo.imageLinks.thumbnail;

        var authors = volume.items[i].volumeInfo.authors;
        var bookName = document.createElement("span");
        bookName.textContent = " Author: " + authors;
        bookName.classList = "center-align book-div";

        var bookTitles = volume.items[i].volumeInfo.title;
        
        var bookTitlesSpan = document.createElement("span");
        bookTitlesSpan.textContent = bookTitles;
        bookTitlesSpan.classList = "center-align book-div";
        bookEl.classList = " center-align description";
        var description = volume.items[i].volumeInfo.description;
        var bookDescriptionSpan = document.createElement("span");
        bookDescriptionSpan.textContent = description;
        bookDescriptionSpan.classlist = "description";
        linebreak = document.createElement("br");
        linebreak2 = document.createElement("br");
        linebreak3 = document.createElement("br");
        linebreak4 = document.createElement("br");
        var saveButton = document.createElement("button");
        saveButton.textContent = "save";
        saveButton.classList = "save"


        bookEl.appendChild(img);
        bookEl.appendChild(linebreak);

        bookEl.appendChild(bookTitlesSpan);
        bookEl.appendChild(linebreak2);
        bookEl.appendChild(bookName);
        bookEl.appendChild(linebreak3);
        bookEl.appendChild(bookDescriptionSpan);
        bookEl.appendChild(linebreak4);
        bookEl.appendChild(saveButton);


        appendSectionOne.appendChild(bookEl);
        //bookEl needs big upgrade


       
        $(".save").on("click", function (event){



            
            event.stopImmediatePropagation();
            console.log(this.textContent);
            
           var btn = this;
           btn.disabled = true;
            var text = $(this).closest("div");
            saveTasks(text);
            console.log(text[0])
            // var res = string(text[0]);

            
           array.push(text[0].innerHTML);
           console.log(array)
          
            
          

            localStorage.setItem("books", array);

        
        });

    }


};


function loadItem(){
    $("#something").empty();

problemTitle.textContent = "Your Books"
problemSubTitle.textContent = "Hope these help!"
quoteAuthor.textContent = "- Your friends at Media Therapy"


    var stuff = localStorage.getItem("books");
   
  
   var stuffDiv = document.createElement("div");
   stuffDiv.classList = " center-align description";
   stuffDiv.innerHTML = stuff;

   var remove = document.createElement("button");
   remove.textContent = "Clear";
   remove.classList = "remove";

   console.log(stuff)
   console.log(stuffDiv);
//    stuffDiv.appendChild(stuff);
stuffDiv.appendChild(remove);
   appendSectionOne.appendChild(stuffDiv);
   
//want to make an individual delete, but ran out of time lol
$(".remove").on("click", function(){
localStorage.clear();
$(stuffDiv).remove();
});


 $(".save").remove();
}







getBookData("Anxiety");




var saveTasks = function(junk) {
localStorage.setItem("trash", JSON.stringify(junk))

};




