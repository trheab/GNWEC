const date = new Date();
const monthYearElement = document.querySelector(".date h1");
const currentDateElement = document.querySelector(".date p");
const monthDays = document.querySelector(".days");
const eventsContainer = document.querySelector(".events-container ul");

const events = {
  "2023-06-01": ["Event 1", "Event 2"],
  "2023-06-05": ["Event 3"],
  "2023-06-10": ["Event 4", "Event 5"],
};

const renderCalendar = () => {
  date.setDate(1);

  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  monthYearElement.textContent = months[date.getMonth()];
  currentDateElement.textContent = date.toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    days += `<div>${i}</div>`;
  }

  for (let i = 1; i <= nextDays; i++) {
    days += `<div class="next-date">${i}</div>`;
  }

  monthDays.innerHTML = days;
};

const displayEvents = () => {
  const selectedDate = date.toISOString().split("T")[0];

  if (events.hasOwnProperty(selectedDate)) {
    const selectedEvents = events[selectedDate];
    eventsContainer.innerHTML = selectedEvents.map(event => `<li>${event}</li>`).join("");
  } else {
    eventsContainer.innerHTML = "<li>No events today</li>";
  }
};

const updateCalendar = () => {
  renderCalendar();
  displayEvents();
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  updateCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  updateCalendar();
});

updateCalendar();

// Responsive behavior
window.addEventListener("resize", updateCalendar);