/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const headerSection = document.querySelector('.header');

const searchLabel = document.createElement('label');
searchLabel.className = 'student-search'
headerSection.appendChild(searchLabel);


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage (list, page) {

   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   
   for ( let i = 0; i < list.length; i++ ) {

      if ( i >= startIndex && i < endIndex ) {
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

function addPagination (list) {

   let pageCount = list.length / 9;
   const linkList = document.querySelector('.link-list');
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

showPage(data, 1);
addPagination(data);