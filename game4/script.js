// Get  to DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"),
  score = document.querySelector(".score b"),
  nextLevel = document.querySelector(".hidden");

let wins = 0;
// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    userResult?.classList.remove("zoom-top-l");
    cpuResult?.classList.remove("zoom-top-r");
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Czekaj...";

    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;
      if (userResult.src.includes("images/ja.png")) {
        userResult?.classList.add("zoom-top-l");
      }

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = [
        "images/lukasz.png",
        "images/miecz.png",
        "images/ja.png",
      ];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      if (cpuResult.src.includes("images/ja.png")) {
        cpuResult?.classList.add("zoom-top-r");
      }

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "Miecz",
        RS: "Łukasz",
        PP: "Draw",
        PR: "Miecz",
        PS: "Ryś",
        SS: "Draw",
        SR: "Łukasz",
        SP: "Ryś",
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];
      let didUserWin = false;
      if (
        (userValue === "R" && cpuValue === "S") ||
        (userValue === "P" && cpuValue === "R") ||
        (userValue === "S" && cpuValue === "P")
      )
        didUserWin = true;

      // Display the result
      result.textContent =
        userValue === cpuValue ? "Remis" : `${outComeValue} Wygrał!!!`;
      if (userValue !== cpuValue && didUserWin) {
        wins++;
        if (wins >= 3) {
          nextLevel?.classList.remove("hidden");
        }
        if (wins <= 3) {
          score.innerText = `${wins} / 3`;
        } else {
          score.innerText = `jeszcze jedna szybka to nie zawsze dobry pomysł`;
        }
      }
    }, 1200);
  });
});
