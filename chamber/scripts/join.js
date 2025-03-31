
import (members) from "../data/member"
console.log(members);

const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

//dialog button
openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = "NP Member is added";
})

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = "Bronze Member is added";
})

openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = "Silver Member is added";
})

openButton4.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = "Gold Member is added";
})

