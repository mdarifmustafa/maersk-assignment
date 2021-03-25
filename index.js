const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// shuffles the existing array list, so the position got also change in original numbers list, due to shallow copy
function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}

// arrange children hierarchy inside parent node based on array list
function arrangeHierarchy(array) {
  const numbers_pad = document.getElementById("numbers-pad");
  // collecting all children directly in a list
  const children = Object.keys(numbers_pad.children).reduce((a, b) => {
    a.push(numbers_pad.children[b]);
    return a;
  }, []);
  // creating new children list, and appending children inside it based on array index
  const newChildren = [];
  array.forEach((number, index) => {
    const child = children.filter((node) =>
      node.className.includes(`number-${number}`)
    )[0];
    newChildren.push(child);
  });
  // removing numbers_pad div all children
  while (numbers_pad.hasChildNodes()) {
    numbers_pad.removeChild(numbers_pad.lastChild);
  }
  // appending new chilren hierarchy to parent node
  newChildren.forEach((child) => {
    numbers_pad.appendChild(child);
  });
}

// listen shuffle number button click
function shuffleNumbers() {
  arrangeHierarchy(shuffleArray(numbers));
}

// listen sort number button click
function sortNumbers() {
  arrangeHierarchy(numbers.sort((a, b) => a - b));
}

// make height similar to width
function resizeBlockOnDesktop(
  currentWidth = document.documentElement.clientWidth
) {
  if (currentWidth >= 576) {
    const number_tags = document.getElementsByClassName("number");
    let tagWidth;
    Object.keys(number_tags).forEach((key) => {
      tagWidth = tagWidth || number_tags[key].clientWidth;
      number_tags[key].style.height = tagWidth + "px";
    });
  }
}

// adding window resize event handler
window.addEventListener("resize", function (e) {
  resizeBlockOnDesktop(document.documentElement.clientWidth);
});

// call at the first time, to resize block based on document client width
resizeBlockOnDesktop();
