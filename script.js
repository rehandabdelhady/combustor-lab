let step = 0;

function show(id) {
  document.getElementById(id).style.display = "block";
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function activateStep(id) {
  document.getElementById(id).classList.add("active-step");
}

function nextStep() {
  step++;

  if (step === 1) {
    show("blower");
    show("airFlow");
    activateStep("s1");
    document.getElementById("status").innerText = "BLOWER STARTED";
    document.getElementById("pressure").innerText = "1.8 bar";
  }

  if (step === 2) {
    show("preheater");
    activateStep("s2");
    document.getElementById("status").innerText = "PREHEATER ON";
    document.getElementById("temp").innerText = "650 K";
  }

  if (step === 3) {
    show("h2Flow");
    activateStep("s3");
    document.getElementById("status").innerText = "HYDROGEN VALVE OPEN";
  }

  if (step === 4) {
    show("keroFlow");
    activateStep("s4");
    document.getElementById("status").innerText = "KEROSENE PUMP ON";
  }

  if (step === 5) {
    show("spark");
    show("flame");
    activateStep("s5");
    document.getElementById("status").innerText = "IGNITION STARTED";

    setTimeout(() => {
      hide("spark");
    }, 1500);

    document.getElementById("temp").innerText = "1420 K";
    document.getElementById("pressure").innerText = "4.2 bar";
  }

  if (step === 6) {
    show("exhaustFlow");
    show("daq");
    activateStep("s6");
    document.getElementById("status").innerText = "FULL SYSTEM RUNNING";
    document.getElementById("pressure").innerText = "5 bar";
    document.getElementById("eff").innerText = "96.5%";
  }

  if (step > 6) {
    step = 6;
  }
}

function shutdown() {
  step = 0;

  hide("blower");
  hide("airFlow");
  hide("preheater");
  hide("h2Flow");
  hide("keroFlow");
  hide("spark");
  hide("flame");
  hide("exhaustFlow");
  hide("daq");

  document.getElementById("status").innerText = "SYSTEM STANDBY";
  document.getElementById("temp").innerText = "300 K";
  document.getElementById("pressure").innerText = "0 bar";
  document.getElementById("eff").innerText = "--";

  document.querySelectorAll(".steps div").forEach((el) => {
    el.classList.remove("active-step");
  });
}
