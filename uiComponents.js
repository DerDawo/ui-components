class PrettyTextInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const parent = this;

        // Collect the pattern-attrbute
        const pattern = this.getAttribute("pattern")
        this._pattern = pattern;
        
        // Collect the name attribtue 
        const name = this.getAttribute("name");
        this._name = name;

        // Create the link
        const link = document.createElement("link");
        this._link = link
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
        link.setAttribute("integrity", "sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==");
        link.setAttribute("crossorigin", "anonymous");
        link.setAttribute("referrerpolicy", "stylesheet");

        // Create the div.wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "beautiful-input");
        this._wrapper = wrapper;

        // Create the div.status
        const status = document.createElement("div");
        status.setAttribute("class", "status");
        status.innerHTML = `
            <i class="fa-solid fa-circle-check" style="color: #008000;"></i>
            <i class="fa-solid fa-circle-xmark" style="color: #c60000;"></i>
        `;
        this._status = status;

        // Create Input
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("pattern", pattern);
        input.setAttribute("placeholder", " ");
        this._input = input;

        // Create Label
        const label = document.createElement("label");
        label.innerHTML = `${name}`;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");

        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
        
            .beautiful-input{
                width: calc(100% - 4px - 10px);
                border: 2px solid #c5c5c5;
                background-color: white;
                color: #3a3a3a;
                padding: 5px;
                border-radius: 5px;
                transition: 0.2s;
                display: grid;
                cursor: pointer;
            }
            
            .beautiful-input.active{
                border-color: #57bbfd;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                cursor: text;
            }
            
            .beautiful-input.valid{
                border-color: #008000;
                color: #000000;
                grid-template-columns: auto 16px;
                gap: 5px;
                cursor: text;
                -webkit-box-shadow: unset;
                -moz-box-shadow: unset;
                box-shadow: unset;
            }
            
            .beautiful-input.invalid{
                border-color: #c60000;
                color: #000000;
                grid-template-columns: auto 16px;
                gap: 5px;
                cursor: text;
                -webkit-box-shadow: unset;
                -moz-box-shadow: unset;
                box-shadow: unset;
            }
            
            .beautiful-input.disabled{
                background-color: #f7f7f7;
                color: #3a3a3a;
                pointer-events: none;
                cursor: not-allowed;
            }
            
            .beautiful-input > label{
                all: unset;
                color: inherit;
                position: absolute;
                transition: 0.2s;
            }
            
            .beautiful-input.active > label{
                font-size: 0.7rem;
                margin-top: calc(-1rem);
                background-color: white;
                padding: 0 3px;
            }
            
            .beautiful-input > input{
                all: unset;
                color: inherit;
            }
            
            .beautiful-input > input:not(:placeholder-shown) + label{
                font-size: 0.7rem;
                margin-top: calc(-1rem);
                background-color: white;
                padding: 0 3px;
            }
            
            .beautiful-input > .status{
                background-color: inherit;
                width: max-content;
            }
            
            .beautiful-input > .status > i{
                display: none;
            }
            
            .beautiful-input.valid > .status > .fa-circle-check{
                display: unset;
            }
            
            .beautiful-input.invalid > .status > .fa-circle-xmark{
                display: unset;
            }
        `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(link);
        shadow.appendChild(wrapper);
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.appendChild(status);
        console.log(this)

        input.addEventListener("change", checkPattern)
        input.addEventListener("input", checkPattern)
        function checkPattern() {
            if (this.value.length === 0) {
                parent.removeValidity()
                return
            }
            setDataToParent()
            if (this.pattern.length === 0) return

            const regex = new RegExp(this.pattern);
            if (regex.test(this.value) === true) {
                parent.setValid();
                return
            }
            parent.setInvalid();
        }

        function setDataToParent() {
            parent.setAttribute("value", input.value);
        }

        document.addEventListener(
            "click",
            function (event) {
                if (parent.contains(event.target)) {
                    parent.setActive()
                    return
                }
                parent.setInactive()
            }
        )

    }

    setActive(){
        console.log(this)
        if (this._wrapper.classList.contains("valid")) return
        if (this._wrapper.classList.contains("invalid")) return
        this._wrapper.classList.add("active")
        this._input.focus()
    }

    setInactive(){
        console.log(this)
        if (this._wrapper.classList.contains("valid")) return
        if (this._wrapper.classList.contains("invalid")) return
        this._wrapper.classList.remove("active")
    }
    
    setDisabled(){
        console.log(this)
        this._wrapper.classList.add("disabled")
    }
    
    setEnabled(){
        console.log(this)
        this._wrapper.classList.remove("disabled")
    }
    
    setInvalid(){
        console.log(this)
        this._wrapper.classList.remove("valid")
        this._wrapper.classList.add("invalid")
    }
    
    setValid(){
        console.log(this)
        this._wrapper.classList.remove("invalid")
        this._wrapper.classList.add("valid")
    }
    
    removeValidity(){
        console.log(this)
        this._wrapper.classList.remove("invalid")
        this._wrapper.classList.remove("valid")
    }
}
customElements.define("pretty-text-input", PrettyTextInput);
