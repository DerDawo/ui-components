const beautifulInput = document.getElementsByClassName("beautiful-input")[0]

function focus(target) {
    if (target.classList.contains("valid")) return
    if (target.classList.contains("invalid")) return
    target.classList.add("active")
    beautifulInput.getElementsByTagName("input")[0].focus()
}

function unfocus(target) {
    if (target.classList.contains("valid")) return
    if (target.classList.contains("invalid")) return
    target.classList.remove("active")
}

beautifulInput.getElementsByTagName("input")[0].addEventListener("change",checkPattern)
beautifulInput.getElementsByTagName("input")[0].addEventListener("input",checkPattern)
function checkPattern() {
    if(this.pattern.length === 0) return
    
    const regex = new RegExp(this.pattern);
    if(regex.test(this.value)===true){
        beautifulInput.classList.add("valid")
        return
    } 
    beautifulInput.classList.remove("valid")
}

document.addEventListener(
    "click",
    function (event) {
        if (beautifulInput.contains(event.target)) {
            focus(beautifulInput)
            return
        }
        unfocus(beautifulInput)
    }
)