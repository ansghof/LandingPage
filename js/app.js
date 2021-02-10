const menuList = document.getElementById("menulist");
const sections = document.querySelectorAll(".section-header");
const menuItems = [];

function printSectionInfo() {
  console.log("Found " + sections.length + " sections: ");
  for (const section of sections) {
    console.log(section.getAttribute("data-navtitle"));
  }
}

function addSectionsToNav(sections) {
  for (section of sections) {
    let li = document.createElement("li");
    li.setAttribute("id", "li" + section.getAttribute("id"));
    let link = document.createElement("a");
    link.setAttribute("href", "#" + section.getAttribute("id"));
    link.textContent = section.getAttribute("data-navtitle");
    link.classList.add("navbar-link");
    link.addEventListener("click", onClickNavItem);
    li.classList.add("navbar-listitem");
    li.appendChild(link);
    menuList.appendChild(li);
    menuItems.push(li);
  }
}

/* although scrolling would have worked just as well with the regular a href to id, 
here a click handler to scroll to the section and preventing the working default behaviour */
function onClickNavItem(event) {
  console.log("Click " + event);
  if (event.target != null) {
    event.target.scrollToLocation();
    event.preventDefault();
  }
}

// copied and modified version of: https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
function isElementPartiallyInViewport(el) {
  const waitFromTop = 150;
  const waitFromBottom = 250;
  var rect = el.getBoundingClientRect();
  var windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;

  var vertInView =
    rect.top + waitFromTop <= windowHeight &&
    rect.top + rect.height >= waitFromBottom;
  var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

/* highlight section by adding a class if the element is in viewport (functions copied from stackoverflow) */
function onScrollHighlightActiveSection() {
  // use conventional for loop to be able to use the index for selection of the navbar Elements;
  for (let index = 0; index < sections.length; index++) {
    if (isElementPartiallyInViewport(sections[index].parentElement)) {
      sections[index].parentElement.classList.add("section-currentlyactive");
      menuItems[index].classList.add("navbar-listitem-active");
    } else {
      sections[index].parentElement.classList.remove("section-currentlyactive");
      menuItems[index].classList.remove("navbar-listitem-active");
    }
  }
}

printSectionInfo();

addSectionsToNav(sections);

/* execute once to highlight the currently visible section, then register scroll listener */
onScrollHighlightActiveSection();
window.onscroll = onScrollHighlightActiveSection;
