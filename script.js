let step = 0;
let autoTimer = null;

const data = {
  temp: [300, 300, 650, 700, 760, 1420, 1480],
  pressure: [0, 1.8, 2.1, 2.5, 3.2, 4.2, 5.0],
  air: [0, 0.22, 0.25, 0.27, 0.29, 0.31, 0.34],
  eff: ["--", "--", "--", "--", "--", "92.8%", "96.5%"]
};

function el(id) {
  return document.getElementById(id);
}

function show(id) {
  el(id).style.display = "block";
}

function hide(id) {
  el(id).style.display = "none";
}

function setStatus(text) {
  el("systemStatus").innerText = text;
}

function updateReadings() {
  el("temp").innerText = data.temp[step] + " K";
  el("pressure").innerText = data.pressure[step].toFixed(1) + " bar";
  el("air").innerText = data.air[step].toFixed(2) + " kg/s";
  el("eff").innerText = data.eff[step];
}

function activateStep(n) {
  el("step" + n).classList.add("active");
}

function nextStep() {
  if (step >= 6) return;

  step++;

  if (step === 1) {
    el("fan").classList.add("run");
    show("airFlow");
    activateStep(1);
    setStatus("BLOWER RUNNING");
    el("runMode").innerText = "AIR SYSTEM ACTIVE";
  }

  if (step === 2) {
    show("heaterGlow");
    activateStep(2);
    setStatus("PREHEATER ACTIVE");
    el("runMode").innerText = "THERMAL MODE";
  }

  if (step === 3) {
    show("h2Flow");
    activateStep(3);
    setStatus("HYDROGEN VALVE OPEN");
    el("runMode").innerText = "DUAL FUEL PREP";
  }

  if (step === 4) {
    show("keroFlow");
    activateStep(4);
    setStatus("KEROSENE PUMP ACTIVE");
  }

  if (step === 5) {
    show("spark");
    show("flame");
    activateStep(5);
    setStatus("IGNITION STARTED");

    setTimeout(function () {
      hide("spark");
    }, 1300);
  }

  if (step === 6) {
    show("exhaustFlow");
    el("daqBox").classList.add("daq-run");
    activateStep(6);
    setStatus("FULL SYSTEM RUNNING");
    el("runMode").innerText = "ONLINE";
  }

  updateReadings();
}

function autoRun() {
  shutdown();

  autoTimer = setInterval(function () {
    nextStep();

    if (step >= 6) {
      clearInterval(autoTimer);
    }
  }, 900);
}

function shutdown() {
  step = 0;

  if (autoTimer) {
    clearInterval(autoTimer);
  }

  hide("airFlow");
  hide("h2Flow");
  hide("keroFlow");
  hide("exhaustFlow");
  hide("heaterGlow");
  hide("spark");
  hide("flame");

  el("fan").classList.remove("run");
  el("daqBox").classList.remove("daq-run");

  document.querySelectorAll(".steps div").forEach(function (item) {
    item.classList.remove("active");
  });

  setStatus("SYSTEM STANDBY");
  el("runMode").innerText = "OFFLINE";
  el("alarm").innerText = "No active alarms";
  el("alarm").style.color = "#22c55e";

  updateReadings();
}

function updateBlend() {
  const h2 = Number(el("blend").value);
  const kero = 100 - h2;

  el("blendText").innerText = h2;
  el("keroText").innerText = kero;

  if (step >= 5) {
    const temp = 1400 + h2 * 2;
    const eff = 92 + h2 * 0.09;

    el("temp").innerText = Math.round(temp) + " K";
    el("eff").innerText = eff.toFixed(1) + "%";

    if (h2 >= 45) {
      el("alarm").innerText = "High hydrogen blend. Check flashback margin.";
      el("alarm").style.color = "#facc15";
    } else {
      el("alarm").innerText = "No active alarms";
      el("alarm").style.color = "#22c55e";
    }
  }
}

shutdown();
