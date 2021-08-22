/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



// Declared in the global Scope as they are used in multiple functions
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');



/*
Exceeded cirteria:
   Here I have created the Input element that allows a user to search.
*/



function createSearch () {

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

   headerSection.addEventListener('keyup', (e) => {
      e.preventDefault();
      studentSearch(e.target.value);
   });
   
   headerSection.addEventListener('click', (e) => {
      e.preventDefault();
      const input = document.querySelector('#search');
      studentSearch(input.value);
   });
}



function studentSearch (search) {

   studentList.innerHTML = '';

   for ( let i = 0; i < data.length; i++ ) {

// We use Object.values to provide an array from the name object so we can work with an array.

      const nameArray = Object.values(data[i].name);
      nameArray.shift();

      const name = nameArray.join(' ').toLowerCase();

      if ( search && name.includes(search.toLowerCase()) ) {

         createStudent(data[i]);

      }
   }
}



function createStudent (item) {

   const student = document.createElement('li');
   student.className = 'student-item cf';
   
   const details = document.createElement('div');
   details.className = 'student-details';
   student.appendChild(details);

   const img = document.createElement('img');
   img.className = 'avatar';
   img.src = item.picture.thumbnail;
   img.alt = 'Profile Picture'
   details.appendChild(img);

   const name = document.createElement('h3')
   name.textContent = `${item.name.first} ${item.name.last}`;
   details.appendChild(name);

   const email = document.createElement('span');
   email.className = 'email';
   email.textContent = `${item.email}`;
   details.appendChild(email);

   const joinedDetails = document.createElement('div');
   joinedDetails.className = 'joined-details';
   student.appendChild(joinedDetails);

   const joinDate = document.createElement('span');
   joinDate.className = 'date'
   joinDate.textContent = `Joined ${item.registered.date}`;
   joinedDetails.appendChild(joinDate);

   studentList.appendChild(student);

}



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/



function showPage (list, page) {

   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   studentList.innerHTML = '';
   
   for ( let i = 0; i < list.length; i++ ) {

      if ( i >= startIndex && i < endIndex ) {

         createStudent(list[i]);

      }
   }
}



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



function addPagination (list) {

   let pageCount = list.length / 9;
   linkList.innerHTML = '';

   for ( let i = 0; i < pageCount; i++ ) {

      const buttonListItem = document.createElement('li');
      const button = document.createElement('button');

      button.type = 'button';
      button.textContent = i + 1;
      
      if ( i === 0 ) {
         button.className = 'active';
      }

      buttonListItem.appendChild(button);
      linkList.insertAdjacentElement('beforeend', buttonListItem);
   }

   linkList.addEventListener('click', (event) => {

      if ( event.target.tagName.toLowerCase() === 'button' ) {

         const buttons = linkList.querySelectorAll('button');

         for ( let i = 0; i < buttons.length; i++ ) {

            buttons[i].className = '';

         }

         event.target.className = 'active';
         showPage(data, parseInt(event.target.textContent, 10));

      }
   })
}



// Call functions


createSearch();
showPage(data, 1);
addPagination(data);
