const compareBtn = document.getElementById("compare-btn");
const clearBtn = document.getElementById("clear-btn");
const results = document.getElementById("result");

compareBtn.addEventListener("click", () => {
  // Clear previous results
  results.innerHTML = "";

  const expectedText = document.getElementById("expected").value.trim();
  const actualText = document.getElementById("actual").value.trim();

  // This code checks that both input areas have text before comparing them. If either area is empty, it displays a message prompting the user to enter text in both areas before proceeding with the comparison.
  if (expectedText === "" || actualText === "") {
    const msg = document.createElement("li");
    msg.textContent = "Enter text in both areas before comparing.";
    results.appendChild(msg);
    return;
  }
  // this part is gonna  splits texts into lines for comparison
  const expectedLines = expectedText.split("\n");
  const actualLines = actualText.split("\n");

  const ol = document.createElement("ol");
  ol.id = "differences";

  let differencesFound = false;

  // this part is gonna  checks if the number of lines in both texts is different.
  //  If they differ, it adds a message to the list indicating the lengths of  texts.
  if (expectedLines.length !== actualLines.length) {
    differencesFound = true;

    const li = document.createElement("li");
    li.textContent = `Lengths differ: < ${expectedLines.length}, > ${actualLines.length}`;
    ol.appendChild(li);
  }

  // this part is gonna  compares the lines of both texts and identifies any differences.
  // const minLength = Math.min(expectedLines.length, actualLines.length);
  //   for (let i = 0; i <= minLength; i++) {
  //     if ((expectedLines[i] = !actualLines[i])) {
  //       differencesFound == true;

  //       const li = document.createElement("li");
  //       li.textContent =
  //         "Line " + i + 1 + ":\n< " + expectedLines[i] + "\n> " + actualLines[i];

  //       ol.appendchild(li);
  //     }
  //   }
  const minLength = Math.min(expectedLines.length, actualLines.length);
  for (let i = 0; i < minLength; i++) {
    if (expectedLines[i] !== actualLines[i]) {
      differencesFound = true;

      const li = document.createElement("li");
      li.textContent = `Line ${i + 1}:\n< ${expectedLines[i]}\n> ${actualLines[i]}`;
      ol.appendChild(li);
    }
  }

  // this part is gonna  checks if any differences were found during the comparison. If no differences are found, it adds a message to the list indicating that the texts are identical. If differences are found, it adds a header to the list indicating that the texts are different.
  if (differencesFound === false) {
    ol.className = "nochange";

    const li = document.createElement("li");
    li.textContent = "No differences found";
    ol.appendChild(li);
  } else {
    ol.className = "change";

    const header = document.createElement("li");
    header.textContent = "Texts are different";
    header.style.listStyle = "none";

    ol.prepend(header);
  }

  results.appendChild(ol);
});
// here we add an event listener to the "Clear" button that clears the input areas and the results when clicked.
clearBtn.addEventListener("click", () => {
  document.getElementById("expected").value = "";
  document.getElementById("actual").value = "";
  results.innerHTML = "";
});
