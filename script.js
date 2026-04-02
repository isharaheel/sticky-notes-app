document.addEventListener('DOMContentLoaded', function () {
const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const toggleIcon = navToggle.querySelector('i');

    if (navToggle && navMenu) { // Safety check
        navToggle.addEventListener('click', () => {
            // Toggles the 'active' class for the slide effect
            navMenu.classList.toggle('active');

            // Smoothly switch between the 'bars' and 'x' icon
            if (navMenu.classList.contains('active')) {
                toggleIcon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                toggleIcon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }
  let inp = document.querySelectorAll('input')[0];
  let addBtn = document.getElementsByClassName('addBtn')[0];
  let display = document.querySelector('.notesContainer');

  addBtn.addEventListener('click', function () {

    let enterData = JSON.parse(localStorage.getItem('enterData')) || [];
    let newData = { txt: inp.value };
    enterData.push(newData);
    localStorage.setItem('enterData', JSON.stringify(enterData));
    inp.value = '';
    renderData();
  });

  
function renderData() {
  display.innerHTML = '';
  const displayData = JSON.parse(localStorage.getItem('enterData')) || [];

  
  displayData.forEach((items, index) => {
  const note = document.createElement('div');
  note.className = 'note';


  const upperDiv = document.createElement('div');
  upperDiv.className = 'upperDiv';
  note.appendChild(upperDiv);


  const leftContainer = document.createElement('div');
  leftContainer.className = 'leftContainer';

  const rightContainer = document.createElement('div');
  rightContainer.className = 'rightContainer';

  upperDiv.appendChild(leftContainer);
  upperDiv.appendChild(rightContainer);

// Create icons
  const editIcon = document.createElement('i');
  editIcon.classList.add('fas', 'fa-edit', 'editBtn');

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas', 'fa-trash', 'deleteBtn');

  rightContainer.appendChild(editIcon);
  rightContainer.appendChild(deleteIcon);

//edit logic

editIcon.addEventListener('click', function () {
  if (leftContainer.querySelector('.editInput')) return;

  const input = document.createElement('input');
  input.className = 'editInput';
  input.value = items.txt;

  const saveBtn = document.createElement('button');
  saveBtn.className = 'saveBtn'
  saveBtn.innerText = 'Save';

  leftContainer.appendChild(input);
  leftContainer.appendChild(saveBtn);

  saveBtn.addEventListener('click', function () {
    const updatedText = input.value.trim();
    if (updatedText !== '') {
      let enterData = JSON.parse(localStorage.getItem('enterData')) || [];
      enterData[index].txt = updatedText;
      localStorage.setItem('enterData', JSON.stringify(enterData));
      renderData();
    }
  });
});

//delete logic

  deleteIcon.addEventListener('click', function () {
    note.remove();
    let enterData = JSON.parse(localStorage.getItem('enterData')) || [];
    enterData.splice(index, 1);
    localStorage.setItem('enterData', JSON.stringify(enterData));
  });  
  
  //heading
  
  const heading = document.createElement('div');
  heading.className = 'noteHeading';
  heading.innerText = 'Sticky Note';
  note.appendChild(heading);

  // Note text
  const noteText = document.createElement('div');
  noteText.className = 'noteText';
  noteText.innerText = '-> ' + items.txt;
  note.appendChild(noteText);

  // Time
  const timeDiv = document.createElement('div');
  timeDiv.className = 'noteTime';
  timeDiv.innerText = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
  note.appendChild(timeDiv);

  // Date
  const dateDiv = document.createElement('div');
  dateDiv.className = 'noteDate';
  const now = new Date();
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  dateDiv.innerText = now.toLocaleDateString('en-US', options);
  note.appendChild(dateDiv);

  // Append note to display
  display.appendChild(note);
// 


});
}



  renderData(); 
});
