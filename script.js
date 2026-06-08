function startSystem(){

    document.getElementById("status").innerHTML =
    "BLOWER ON → PREHEATER ON → H2 FLOW → KEROSENE FLOW → IGNITION";

    document.getElementById("poster")
    .classList.add("running");
}

function shutdownSystem(){

    document.getElementById("status").innerHTML =
    "SYSTEM OFF";

    document.getElementById("poster")
    .classList.remove("running");
}
