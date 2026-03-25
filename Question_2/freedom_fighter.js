const picsContainer = document.getElementById("pics");
const pics = document.querySelectorAll("#pics img");
const favorites = document.getElementById("favorites");
const actions = document.getElementById("actions");

let selectionCount = 0;

// Store original positions
pics.forEach((img, index) => {
  img.dataset.index = index;
});

// here we create a counter element to display the number of remaining images that can be selected as favorites. The counter is updated each time an image is moved to the favorites or reverted back to the main list.
const counter = document.createElement("p");
counter.textContent = `Remaining images: ${pics.length}`;
document.body.insertBefore(counter, favorites);

// here we create a message element to display feedback to the user about their actions, such as which image was selected as a favorite and how many images are remaining. The message is updated each time an image is moved to the favorites or reverted back to the main list.
const message = document.createElement("p");
document.body.insertBefore(message, favorites);

// Function to move image to favorites
function moveToFavorites(event) {
  const img = event.target;

  // Prevent moving if already in favorites
  if (img.parentElement === favorites) return;
  selectionCount++;

  // Move image to favorites
  favorites.appendChild(img);
  // here we add a visual highlight to the selected image by changing its border color. This provides immediate feedback to the user that the image has been selected as a favorite.
  img.style.border = "3px solid green";

  // here we add a visual highlight to the selected image by changing its border color. This provides immediate feedback to the user that the image has been selected as a favorite.
  const li = document.createElement("li");
  li.textContent = `Moved ${img.src} to favorites`;
  actions.appendChild(li);

  // Show selection message
  message.textContent = `Image ${img.dataset.index} selected as favorite number ${selectionCount}`;

  const remaining = pics.length - selectionCount;
  counter.textContent = `Remaining images: ${remaining}`;
  if (remaining === 0) {
    message.textContent = "All images have been selected!";
  }
  img.addEventListener("click", revertImage);
}

// Function to revert image back to original position
// function revertImage(event) {
//   const img = event.target
//   const index = parseInt(img.dataset.index);
//   const children = picsContainer.child
//   if (index => children.length) {
//     picsContainer.appendchild(img);
//   } else {
//     picsContainer.insertBefore(children[index], img);
//   }
// }

function revertImage(event) {
  const img = event.target;
  const index = parseInt(img.dataset.index);
  const children = picsContainer.children;
  if (index >= children.length) {
    picsContainer.appendChild(img);
  } else {
    picsContainer.insertBefore(img, children[index]);
  }

  selectionCount--;
  //here we add a text to actions list to indicate that the image has been reverted back to the main list.
  const li = document.createElement("li");
  li.textContent = `Reverted ${img.src} back to main list`;
  actions.appendChild(li);

  // Update counter
  const remaining = pics.length - selectionCount;
  counter.textContent = `Remaining images: ${remaining}`;

  // Update message
  message.textContent = "Image reverted";

  // Remove revert listener and re-add original click
  img.removeEventListener("click", revertImage);
  img.addEventListener("click", moveToFavorites);
}

// here we add event listeners to each image in the main list to allow users to click on them and move them to the favorites section. We also set the title attribute of each image to provide a tooltip when hovered over, and we ensure that all images have a consistent size for better visual presentation.
pics.forEach((img) => {
  img.addEventListener("click", moveToFavorites);
  img.title = img.alt;
  // here we set the width and height of each image to 120 pixels and use the object-fit property to ensure that the images maintain their aspect ratio while fitting within the specified dimensions. This helps create a uniform and visually appealing layout for the images in both the main list and the favorites section.
  img.style.width = "120px";
  img.style.height = "120px";
  img.style.objectFit = "cover";
});
