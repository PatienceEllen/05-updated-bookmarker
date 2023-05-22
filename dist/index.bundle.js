/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./src/js/indexStart.js ***!
  \******************************/
/******/(function () {
  // webpackBootstrap
  var __webpack_exports__ = {};
  /*!******************************!*\
    !*** ./src/js/indexStart.js ***!
    \******************************/
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  /*  Overview
      This application simulates an electronic bookmark list.  Users can add and delete
      bookmarks from the list. The list of bookmarks is stored on the user's machine in local storage 
      so that the bookmarks persist over time.
  
      The app is encapsulated in an ES6 style class.  
      
      The class has the following instance variables declared in the constructor:
      - bookmarks - an array of bookmarks.  Each bookmark has a description, image, link and title property.
  
      The class has the following methods
      - fillBookmarks - displays the bookmarks on the page.  It is called in the constructor
                    and whenever a bookmark is changed in any way.  It calls a helper method
                    generateBookmarkHtml to generate the html for an individual bookmark object.
                    It also calls a helper method addEventHandlers to add the event handlers
                    that allow deleting of a bookmark
      - deleteBookmark - removes a bookmark from the list of bookmark.  It is called by 
                    the click event handler for the trash can icon for each bookmark.
      - addBookmark-   allows the user to add a new bookmark to the list.  It is called
                    by the click event handler for the add button on the page.
  */
  /* 
  Setup your development environment
      -   clone the repository with the starting files from github
      -   run npm install to install the node modules you need
      -   run npm build and verify that webpack does the things you would expect it to do
   
  Create the look and feel of your page
      Use html 5 input attributes to make sure that the url and description are provided.
          The url should be a valid url too.
      -   At this point the user enters the url and the description.  After we talk about
          making an ajax call in chapter 3, we'll get the image and the title from an api.
      Add one or more sample bookmarks to the html page.  I've given you one as an example.
      -   Each bookmark is a link that contains: an image, 
          and the text that the user sees.  It also has a description and an icon for deleting.
      Style the list of bookmarks and the page as a whole so it is reasonably attractive
      -   I have provided a screen shot of my page as well as 
          a screen shot of what my page looks like when I'm adding a new bookmark.
  */
  var Bookmarker = /*#__PURE__*/function () {
    function Bookmarker() {
      var _this = this;
      _classCallCheck(this, Bookmarker);
      // Initialize bookmarks with default bookmarks
      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [{
        description: 'Really cool site for open source photos',
        image: '',
        link: 'https://www.pexels.com/',
        title: 'Pexels is fun'
      }, {
        description: 'An excellent resource for learning web development.',
        image: '',
        link: 'https://www.w3schools.com/',
        title: 'w3scools'
      }];

      // Bind methods to this object
      this.addBookmark = this.addBookmark.bind(this);
      this.addEventHandlers = this.addEventHandlers.bind(this);

      // Set up the bookmarks list UI
      this.fillBookmarksList();

      // Set up the form submit handler
      var form = document.querySelector('form');
      form.onsubmit = function (event) {
        event.preventDefault();
        _this.addBookmark(event);
      };
    }
    _createClass(Bookmarker, [{
      key: "addBookmark",
      value: function addBookmark(event) {
        event.preventDefault();
        var urlInput = document.querySelector('#url');
        var descriptionInput = document.querySelector('#description');
        var bookmark = {
          link: urlInput.value,
          description: descriptionInput.value,
          image: "",
          title: urlInput.value
        };
        this.bookmarks.push(bookmark);
        this.fillBookmarksList();
        urlInput.value = '';
        descriptionInput.value = '';
      }
    }, {
      key: "addEventHandlers",
      value: function addEventHandlers() {
        var deleteIcons = document.getElementsByName('deleteBookmark');
        for (var i = 0; i < deleteIcons.length; i++) {
          deleteIcons[i].onclick = this.deleteBookmark.bind(this, i);
        }
      }
    }, {
      key: "fillBookmarksList",
      value: function fillBookmarksList() {
        var _this2 = this;
        localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        var bookmarkHtml = this.bookmarks.reduce(function (html, bookmark, index) {
          return html += _this2.generateBookmarkHtml(bookmark, index);
        }, '');
        var bookmarksList = document.querySelector('.bookmarks-list');
        bookmarksList.innerHTML = bookmarkHtml;
        this.addEventHandlers();
      }
    }, {
      key: "generateBookmarkHtml",
      value: function generateBookmarkHtml(bookmark, index) {
        return "\n        <a href=\"".concat(bookmark.link, "\" target=\"_blank\" class=\"bookmark\">\n            <div class=\"img\" style=\"background-image:url(").concat(bookmark.image, ")\">&nbsp;</div>\n            <div class=\"title\">").concat(bookmark.title, "<br>\n            ").concat(bookmark.description, "\n            </div>\n            <div><i name=\"deleteBookmark\" class=\"bi-trash delete-icon\" data-index=\"").concat(index, "\"></i></div>\n        </a>\n        ");
      }
    }, {
      key: "deleteBookmark",
      value: function deleteBookmark(index, event) {
        event.preventDefault();
        this.bookmarks.splice(index, 1);
        this.fillBookmarksList();
      }
    }]);
    return Bookmarker;
  }();
  /*
  Create a class called Bookmarker
      PART 1 - Show the bookmarks
      -   Add stubs for each method in the class
          - addBookmark, addEventHandlers, fillBookmarks, generateBookmarkHtml, deleteBookmark
      
      -   Add a constructor
          -   Create an instance variable called bookmarks.
          -   Try to load the bookmarks from local storage.  If there's nothing in local storage 
              set it equal to an object literal that contains at least 2 bookmarks
              [
                  {
                      description: "Really cool site for open source photos", 
                      image: "",
                      link: "https://www.pexels.com/", 
                      title: "https://www.pexels.com/"
                  },
              ]
          -   call bind on addBookmark and addEventHandlers
          -   call the method fillBookmarksList
  
      -   Finish the generateBookmarkHtml method
          -   This method returns a template literal containing the html for ONE bookmark in the array.
              It gets called in fillBookMarksList.  It has 2 parameters a bookmark and an index.
          -   CUT the html for ONE bookmark from your html page into the body of your method.
          -   Enclose the html in ``.
          -   Replace the hardcoded description, image, link and title (of the sample bookmark) 
              with template strings that use the properties of the bookmark object
          -   Return the template literal
  
      -   Finish the fillBookmarksList method.  It has no parameters
          -   Save the bookmarks to local storage
          -   Create a variable bookmarkHtml and set it equal to the
              the return value for each of the individual bookmarks combined
              You can do this by calling the reduce method on the array
              It manipulates each element of an array to produce ONE result.  From the ToDoList:
                  let tasksHtml = this.tasks.reduce(
                      (html, task, index) => html += this.generateTaskHtml(task, index), 
                      '');
          -   Set contents of the bookmarks-list element on the page to the bookmarkHtml variable
          -   Call the method addEventHandlers to allow the user to delete each of the bookmarks
          );
      END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE HARDCODED BOOKMARKS YOUR ON PAGE
  
      PART 2 - Delete a bookmark
      -   Finish the deleteBookmark method.  It has 2 parameters, index and event
          -   prevent the default action of the anchor tag using the event parameter
          -   delete the bookmark from the list based on the index
          -   call fillBookmarksList
  
      -   Finish the addEventHandlers method
          -   Create a variable called deleteIcons that refers to all of the 
              delete icons on the page.  Each has the name deleteBookmark.
          -   Create a for loop that iterates through the deleteIcons array
              -   set the click event for the current icon to the method
                  deleteBookmark and bind this and the index of the bookmark in that statement
                  From the todo list:
                  checkBoxes[i].onchange = this.toggleTaskStatus.bind(this, i);  
      END OF PART 2 - TEST AND DEBUG YOUR CODE
  
      PART 3 - Add a bookmark
      -   Add the function addBookmark.  It has event as its parameter.
          -   Because the textboxes for entering bookmark info are in a form, you will
              need to prevent the form from being submitted (which is the default behavior)
              like you prevented the delete link in ToDoList from going to a new page.  
          -   get the url and the description from the form and create a bookmark object. 
              Use the url for both the link and the title.  Leave the image blank.
          -   add the new bookmark to the list
          -   call fillBookmarksList
          -   clear the form on the UI
      -   Add a onsubmit handler to the form in the constructor.  
          It should call addBookmark.  
      END OF PART 3 - TEST AND DEBUG YOUR CODE
  
  */
  /*  THIS IS NECESSARY FOR TESTING ANY OF YOUR CODE
      declare a variable bookmarker
      Add a window on load event handler that instantiates a Bookmarker object.  
      Use and arrow or anonymous function
  */
  var bookmarker;
  window.onload = function () {
    bookmarker = new Bookmarker();
  };
})();
/******/ })()
;
//# sourceMappingURL=index.bundle.js.map