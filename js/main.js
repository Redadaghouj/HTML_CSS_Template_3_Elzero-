const scrollBtn = document.querySelector(".scroll-top");
const skillsSection = document.querySelector(".skills");
const progresses = document.querySelectorAll(".progress");
const statsSection = document.querySelector(".stats");
const statsNbr = document.querySelectorAll(".stats .box .number");

document.addEventListener("click", (e) => {
  if (e.target.dataset.filter) {
    document.querySelector(`.${e.target.dataset.filter}`).scrollIntoView();
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

let started = false;

window.addEventListener("scroll", () => {
  // Scroll to top
  if (window.scrollY > 300) {
    scrollBtn.style.marginBottom = "15px";
  } else {
    scrollBtn.style.marginBottom = "-100%";
  }

  //   Progress of skills
  if (window.scrollY >= skillsSection.offsetTop) {
    progresses.forEach((progress) => {
      progress.firstElementChild.style.width = progress.dataset.prog;
    });
  }

  // Stats counter
  if (!started) {
    if (window.scrollY >= statsSection.offsetTop) {
      started = true;
      statsNbr.forEach((statNbr) => {
        let handle = setInterval(() => {
          statNbr.textContent++;
          if (statNbr.textContent == statNbr.dataset.nbr) {
            clearInterval(handle);
          }
        }, 1000 / statNbr.dataset.nbr);
      });
    }
  }
});

// Latest Event Countdown
(function countdown() {
  let countDowDate = new Date("Dec 31, 2023 23:59:59").getTime();

  let daysDom = document.querySelector(".latest-events .days");
  let hoursDom = document.querySelector(".latest-events .hours");
  let minutesDom = document.querySelector(".latest-events .minutes");
  let secondesDom = document.querySelector(".latest-events .secondes");

  let handel = setInterval(() => {
    let dateNow = new Date().getTime();
    let dateDiff = countDowDate - dateNow;
    let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let secondes = Math.floor((dateDiff % (1000 * 60)) / 1000);

    daysDom.textContent = days < 10 ? `0${days}` : days;
    hoursDom.textContent = hours < 10 ? `0${hours}` : hours;
    minutesDom.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondesDom.textContent = secondes < 10 ? `0${secondes}` : secondes;

    dateDiff == 0 && clearInterval(handel);
  });
})();
