let part1 = "Hi, I'm Mohamed 👋";
let part2 = "welcome in my profile ";
let part3 = "Web Developer \n & 1st year computer science student";

let i = 0;
let j = 0;
let k = 0;

let title = document.getElementById("title");
let subtitle = document.getElementById("subtitle");
let paragraph = document.getElementById("paragraph");

title.innerHTML = "";
subtitle.innerHTML = "";
paragraph.innerHTML = "";

function writeTitle() {
  if (i < part1.length) {
    title.innerHTML += part1[i];
    i++;
    setTimeout(writeTitle, 100);
  } else {
    writeSubtitle();
  }
}

function writeSubtitle() {
  if (j < part2.length) {
    subtitle.innerHTML += part2[j];
    j++;
    setTimeout(writeSubtitle, 100);
  } else {
    writeParagraph();
  }
}

function writeParagraph() {
  if (k < part3.length) {
    paragraph.innerHTML += part3[k];
    k++;
    setTimeout(writeParagraph, 100);
  }else{
    createButton();
  }
}
function createButton() {
   let div=document.querySelector(".welcome-div");
  let work = document.createElement("a");
  work.innerHTML = "View My Work";
  work.href = "#project-parts";
  div.appendChild(work);
}

setTimeout(writeTitle, 500);
