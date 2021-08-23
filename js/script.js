/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// This variable is declaring the page size so it can be changed with ease in the future.
const pageSize = 9;

/*
Exceeded cirteria:
   Here I have created the Input element that allows a user to search.
*/
function createSearch() {
   const headerSection = document.querySelector('.header');

   const searchLabel = document.createElement('label');
   searchLabel.className = 'student-search';
   searchLabel.setAttribute('for', 'search');
   headerSection.appendChild(searchLabel);

   const searchText = document.createElement('span');
   searchText.textContent = 'Search by name';
   searchLabel.appendChild(searchText);

   const searchInput = document.createElement('input');
   searchInput.type = 'input';
   searchInput.id = 'search';
   searchInput.placeholder = 'Search by Name...';
   searchLabel.appendChild(searchInput);

   const searchButton = document.createElement('button');
   searchButton.type = 'button';
   searchLabel.appendChild(searchButton);

   const searchBtnImg = document.createElement('img');
   searchBtnImg.src = 'img/icn-search.svg';
   searchBtnImg.alt = 'Search Icon'
   searchButton.appendChild(searchBtnImg);

   // These event listeners are being passed the function handleSearch() so there is less repeated code.
   headerSection.addEventListener('keyup', handleSearch)
   headerSection.addEventListener('click', handleSearch)
}

// This function allows you to search with both the 'click' event and 'keyup' event.
function handleSearch(e){
   e.preventDefault();
   const input = document.querySelector('#search');
   studentSearch(input.value);
}

// This function is filtering through the array of data and running addPagination and showPage to update the UI.
function studentSearch(search) {
   let items = data.filter((item) => {
      const searchLower = search.toLowerCase();
      const name = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`

      if (name.includes(searchLower)) {
         return true;
      }

      return false;
   })
   addPagination(items);
   showPage(items, 1);
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const error = document.querySelector('.error');

   if ( !error && list.length === 0 ) {
      showSearchError();
   } else if ( error && list.length > 0 ) {
      error.remove();
   }

   const studentList = document.querySelector('.student-list');
   const startIndex = (page * pageSize) - pageSize;
   const endIndex = page * pageSize;
   studentList.innerHTML = '';

   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const student = document.createElement('li');
         student.className = 'student-item cf';
      
         const details = document.createElement('div');
         details.className = 'student-details';
         student.appendChild(details);
      
         const img = document.createElement('img');
         img.className = 'avatar';
         img.src = list[i].picture.thumbnail;
         img.alt = 'Profile Picture'
         details.appendChild(img);
      
         const name = document.createElement('h3')
         name.textContent = `${list[i].name.first} ${list[i].name.last}`;
         details.appendChild(name);
      
         const email = document.createElement('span');
         email.className = 'email';
         email.textContent = `${list[i].email}`;
         details.appendChild(email);
      
         const joinedDetails = document.createElement('div');
         joinedDetails.className = 'joined-details';
         student.appendChild(joinedDetails);
      
         const joinDate = document.createElement('span');
         joinDate.className = 'date'
         joinDate.textContent = `Joined ${list[i].registered.date}`;
         joinedDetails.appendChild(joinDate);
      
         studentList.appendChild(student);
      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const linkList = document.querySelector('.link-list');
   let pageCount = list.length / pageSize;
   linkList.innerHTML = '';

   for (let i = 0; i < pageCount; i++) {
      const buttonListItem = document.createElement('li');
      const button = document.createElement('button');

      button.type = 'button';
      button.textContent = i + 1; // I added + 1 so that the first page button is not 0.

      if (i === 0) {
         button.className = 'active';
      }

      buttonListItem.appendChild(button);
      linkList.insertAdjacentElement('beforeend', buttonListItem);
   }

   linkList.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() === 'button') {
         const buttons = linkList.querySelectorAll('button');

         for (let i = 0; i < buttons.length; i++) { 
            buttons[i].className = ''; // Setting all buttons to not active.
         }

         event.target.className = 'active';
         showPage(list, parseInt(event.target.textContent, 10));
      }
   })
}

// This function is called when no search items are present.
function showSearchError () {
   const studentList = document.querySelector('.student-list');
   const errorText = document.createElement('h2');
   errorText.textContent = 'No results found';
   errorText.className = 'error';
   studentList.insertAdjacentElement('beforebegin', errorText);

}

// Call functions
createSearch();
showPage(data, 1);
addPagination(data);