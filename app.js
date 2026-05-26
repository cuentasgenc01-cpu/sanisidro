import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {

  apiKey: "AIzaSyAbDDHUnzSI_7QoqdDCrMMYP8dWiAP93F0",

  authDomain:
  "pruebamaria-80f86.firebaseapp.com",

  databaseURL:
  "https://pruebamaria-80f86-default-rtdb.firebaseio.com",

  projectId: "pruebamaria-80f86",

  storageBucket:
  "pruebamaria-80f86.firebasestorage.app",

  messagingSenderId: "700964200967",

  appId:
  "1:700964200967:web:6d83c96c2748db5299c0a2"

};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const comboProfesor =
document.getElementById("profesor");

const password =
document.getElementById("password");

const mensaje =
document.getElementById("mensaje");

const btnLogin =
document.getElementById("btnLogin");


// CARGAR PROFESORES

async function cargarProfesores(){

    const snapshot = await get(
        ref(db, "PROFESORES")
    );

    comboProfesor.innerHTML = '<option value="" selected disabled>Seleccione un profesor</option>';

    snapshot.forEach((child)=>{

        const option =
        document.createElement("option");

        option.value = child.key;
        option.text = child.key;

        comboProfesor.appendChild(option);

    });

}

cargarProfesores();


// LOGIN

btnLogin.addEventListener("click", async ()=>{

    const profesor =
    comboProfesor.value;

    const clave =
    password.value;

    if (!profesor || !clave) {
        mensaje.style.color = "orange";
        mensaje.innerHTML = "Por favor, complete todos los campos";
        return;
    }

    const snapshot = await get(
        ref(db, "PROFESORES/" + profesor)
    );

    if(snapshot.exists()){

        const datos =
        snapshot.val();

        if(String(datos.CONTRASENA) === clave){

            mensaje.style.color = "green";

            mensaje.innerHTML =
            "BIENVENIDO " + profesor;

            localStorage.setItem(
                "profesor",
                profesor
            );

            setTimeout(()=>{

                window.location =
                "panel.html";

            },1000);

        }else{

            mensaje.style.color = "red";

            mensaje.innerHTML =
            "Contraseña incorrecta";

        }

    }

});

// SOPORTE PARA TECLA ENTER
[comboProfesor, password].forEach(elemento => {
    elemento.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            btnLogin.click();
        }
    });
});