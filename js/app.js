const menuList = document.getElementById("menulist");
const sections = document.querySelectorAll(".section-header");

function printSectionInfo() {
  console.log("Found " + sections.length + " sections: ");
  for (const section of sections) {
    console.log(section.getAttribute("data-navtitle"));
  }
}

function addSectionsToNav(sections) {
  for (section of sections) {
    let li = document.createElement("li");
    li.classList.add("navbar-listitem");
    li.textContent = section.getAttribute("data-navtitle");
    menuList.appendChild(li);
  }
}

printSectionInfo();

addSectionsToNav(sections);
