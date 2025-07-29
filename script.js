let savedData = {
  name: "",
  gender: "masculino",
  skin: "clara",
  hair: "corto"
};

let brain = 0, heart = 0, luck = 0;

function startGame() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");
  showFirstEvent();
}

function openCustomization() {
  document.getElementById("menu").classList.add("hidden");
  document.getElementById("customization").classList.remove("hidden");
  updatePreview();
}

function updatePreview() {
  let gender = document.getElementById("gender").value;
  let src = `assets/images/personaje-${gender}.png`;
  document.getElementById("previewImage").src = src;
}

function saveCustomization() {
  savedData.name = document.getElementById("playerName").value || "Jugador";
  savedData.gender = document.getElementById("gender").value;
  savedData.skin = document.getElementById("skin").value;
  savedData.hair = document.getElementById("hair").value;
  document.getElementById("customization").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

function confirmExit() {
  document.getElementById("confirm-exit").classList.remove("hidden");
}

function exitWithoutSaving() {
  document.getElementById("confirm-exit").classList.add("hidden");
  document.getElementById("customization").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

function cancelExit() {
  document.getElementById("confirm-exit").classList.add("hidden");
}

function showFirstEvent() {
  const name = savedData.name || "Jugador";
  document.getElementById("storyText").innerText = `*Tu hermano se asoma y dice:* "${name}, ¿qué hora es? ¿Aún no llegan mamá y papá? ¿Qué haces despierto/a a esta hora?"`;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  const optionA = document.createElement("button");
  optionA.innerText = "No, aún no llegan. Pero no te preocupes, vuelve a la cama.";
  optionA.onclick = () => handleChoice("calma");

  const optionB = document.createElement("button");
  optionB.innerText = "¿Qué quieres ahora? ¡No soy tu niñera!";
  optionB.onclick = () => handleChoice("frialdad");

  const optionC = document.createElement("button");
  optionC.innerText = "*Ignoras a tu hermano*";
  optionC.onclick = () => handleChoice("suerte");

  choicesDiv.appendChild(optionA);
  choicesDiv.appendChild(optionB);
  choicesDiv.appendChild(optionC);

  choicesDiv.classList.remove("hidden");

  startTimer();
}

function handleChoice(type) {
  document.getElementById("choices").classList.add("hidden");
  document.getElementById("changeNotice").classList.remove("hidden");

  if (type === "calma") heart++;
  if (type === "frialdad") brain++;
  if (type === "suerte") luck++;

  updateStats();
  setTimeout(() => {
    document.getElementById("changeNotice").classList.add("hidden");
    nextReaction(type);
  }, 1500);
}

function updateStats() {
  document.getElementById("brainCount").innerText = brain;
  document.getElementById("heartCount").innerText = heart;
  document.getElementById("luckCount").innerText = luck;
}

function nextReaction(type) {
  let response = "";
  if (type === "calma") response = "Tu hermano sonríe con sueño y vuelve a la cama confiado.";
  if (type === "frialdad") response = "Tu hermano se queda en silencio y se va cabizbajo.";
  if (type === "suerte") response = "Tu hermano duda un momento, luego se va sin decir palabra.";

  document.getElementById("storyText").innerText = response;
}

function startTimer() {
  let time = 20;
  const timer = document.getElementById("timer");
  timer.classList.remove("hidden");
  timer.innerText = time;

  const interval = setInterval(() => {
    time--;
    timer.innerText = time;
    if (time <= 0) {
      clearInterval(interval);
      timer.classList.add("hidden");
      document.getElementById("choices").classList.add("hidden");
    }
  }, 1000);
}

