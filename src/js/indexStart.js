class Bookmarker {
    constructor() {
      this.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [
        {
          description: 'Really cool site for open source photos',
          image: '',
          link: 'https://www.pexels.com/',
          title: 'Pexels is fun',
        },
        {
          description: 'An excellent resource for learning web development.',
          image: '',
          link: 'https://www.w3schools.com/',
          title: 'w3schools',
        },
      ];
  
      this.addBookmark = this.addBookmark.bind(this);
      this.addEventHandlers = this.addEventHandlers.bind(this);
  
      this.fillBookmarksList();
      const form = document.querySelector('form');
      form.addEventListener('submit', this.addBookmark);
  
      this.apiUrl = 'https://opengraph.io/api/1.1/site';
      this.appId = 'e5bdbc80-6c19-4bc1-b128-fe0d7d5fa2ac';
    }
  
    addBookmark(event) {
        event.preventDefault();
        const urlForHref = document.querySelector('#url').value;
        const url = encodeURIComponent(urlForHref);
        const descriptionInput = document.querySelector('#description');
        fetch(`${this.apiUrl}/${url}?app_id=${this.appId}`)
          .then(response => response.json())
          .then(data => {
            const bookmark = {
              title: data.hybridGraph.title,
              image: data.hybridGraph.image,
              link: urlForHref,
              description: descriptionInput.value,
            };
            this.bookmarks.push(bookmark);
            this.fillBookmarksList();
            document.querySelector('.bookmark-form').reset();
          })
          .catch(error => {
            console.log('There was a problem getting info!');
          });
      }
  
    addEventHandlers() {
      const deleteIcons = document.getElementsByName('deleteBookmark');
      deleteIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => this.deleteBookmark(index));
      });
    }
  
    fillBookmarksList() {
      localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
      const bookmarkHtml = this.bookmarks.reduce(
        (html, bookmark, index) => html += this.generateBookmarkHtml(bookmark, index),
        ''
      );
  
      const bookmarksList = document.querySelector('.bookmarks-list');
      bookmarksList.innerHTML = bookmarkHtml;
      this.addEventHandlers();
    }
  
    generateBookmarkHtml(bookmark, index) {
      return `
        <a href="${bookmark.link}" target="_blank" class="bookmark">
            <div class="img" style="background-image:url(${bookmark.image})">&nbsp;</div>
            <div class="title">${bookmark.title}<br>${bookmark.description}</div>
            <div><i name="deleteBookmark" class="bi-trash delete-icon" data-index="${index}"></i></div>
        </a>
      `;
    }
  
    deleteBookmark(index) {
      this.bookmarks.splice(index, 1);
      this.fillBookmarksList();
    }
  }
  
  let bookmarker;
  
  window.onload = () => {
    bookmarker = new Bookmarker();
  };
  