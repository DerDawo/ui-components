class PrettyInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const parent = this;

        function noAttributeSet(attributeSelection) {
            let str = attributeSelection;
            if (typeof str === "string" && str.length === 0) {
                return true
            } else if (str === null) {
                return true
            } else {
                return false
            }
        }

        function validType(type) {
            switch (type) {
                case "color":
                    return true
                case "date":
                    return true
                case "datetime-local":
                    return true
                case "email":
                    return true
                case "month":
                    return true
                case "number":
                    return true
                case "password":
                    return true
                case "search":
                    return true
                case "tel":
                    return true
                case "text":
                    return true
                case "time":
                    return true
                case "url":
                    return true
                case "week":
                    return true
            }
            return false
        }

        // Set a standard Font-Size
        const _fontSize = this.getAttribute("font-size")
        const fontSize = noAttributeSet(_fontSize) == true ? "16px" : _fontSize
        this._fontSize = fontSize

        // Set a standard Font-Family
        const _fontFamily = this.getAttribute("font-family")
        const fontFamily = noAttributeSet(_fontFamily) == true ? `"Roboto Condensed", sans-serif` : _fontFamily
        this._fontFamily = fontFamily

        // Set a standard Type
        const _type = this.getAttribute("type")
        const type = noAttributeSet(_type) == true ? "text" : validType(_type) == false ? "text" : _type
        this._type = type

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
        input.setAttribute("type", this._type);
        input.setAttribute("pattern", this._pattern);
        input.setAttribute("placeholder", " ");
        this._input = input;

        // Create Label
        const label = document.createElement("label");
        label.innerHTML = `${this._name}`;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");

        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
            
            .beautiful-input{
                --standard-font-size: ${this._fontSize};
                font-family: ${this._fontFamily};
                width: calc(100% - 4px - 10px);
                border: 2px solid #c5c5c5;
                background-color: white;
                color: #3a3a3a;
                padding: 5px;
                border-radius: 5px;
                transition: 0.2s;
                display: grid;
                cursor: pointer;
                font-size: var(--standard-font-size);
            }
            
            .beautiful-input:hover{
                border-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
            }

            .beautiful-input.active{
                border-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                cursor: text;
            }
            
            .beautiful-input.valid{
                border-color: #008000;
                color: #000000;
                grid-template-columns: auto 1em;
                gap: 5px;
                cursor: text;
                -webkit-box-shadow: unset;
                -moz-box-shadow: unset;
                box-shadow: unset;
            }
            
            .beautiful-input.invalid{
                border-color: #c60000;
                color: #000000;
                grid-template-columns: auto 1em;
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
                font-size: 0.7em;
                margin-top: calc(-1.1em);
                background-color: white;
                padding: 0 3px;
            }
            
            .beautiful-input > input{
                all: unset;
                color: inherit;
                font-size: 1em;
                width: 100%;
            }
            
            .beautiful-input > input:not(:placeholder-shown) + label{
                font-size: 0.7em;
                margin-top: calc(-1.1em);
                background-color: white;
                padding: 0 3px;
            }
            
            .beautiful-input > .status{
                background-color: inherit;
                width: max-content;
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: center;
                justify-self: center;
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

            .beautiful-input > input::-webkit-outer-spin-button,
            .beautiful-input > input::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
      
            .beautiful-input > input {
                -moz-appearance:textfield;
            }
        `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(link);
        shadow.appendChild(wrapper);
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.appendChild(status);

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

    resetInputValue(){
        this._input.value = ""
        this.removeValidity()
    }

    updatePattern(newValue) {
        // Collect the pattern-attrbute
        const pattern = newValue
        this._pattern = pattern;

        // Create Input
        this._input.setAttribute("pattern", this._pattern);        
    }

    setActive() {
        if (this._wrapper.classList.contains("valid")) return
        if (this._wrapper.classList.contains("invalid")) return
        this._wrapper.classList.add("active")
        this._input.focus()
    }

    setInactive() {
        if (this._wrapper.classList.contains("valid")) return
        if (this._wrapper.classList.contains("invalid")) return
        this._wrapper.classList.remove("active")
    }

    setDisabled() {
        this._wrapper.classList.add("disabled")
    }

    setEnabled() {
        this._wrapper.classList.remove("disabled")
    }

    setInvalid() {
        this._wrapper.classList.remove("valid")
        this._wrapper.classList.add("invalid")
    }

    setValid() {
        this._wrapper.classList.remove("invalid")
        this._wrapper.classList.add("valid")
    }

    removeValidity() {
        this._wrapper.classList.remove("invalid")
        this._wrapper.classList.remove("valid")
    }
}
customElements.define("pretty-input", PrettyInput);

class PrettySwitch extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const parent = this;


        function noAttributeSet(attributeSelection) {
            let str = attributeSelection;
            if (typeof str === "string" && str.length === 0) {
                return true
            } else if (str === null) {
                return true
            } else {
                return false
            }
        }

        // Set a standard Font-Size
        const _fontSize = this.getAttribute("font-size")
        const fontSize = noAttributeSet(_fontSize) == true ? "16px" : _fontSize
        this._fontSize = fontSize

        // Set a standard Font-Family
        const _fontFamily = this.getAttribute("font-family")
        const fontFamily = noAttributeSet(_fontFamily) == true ? `"Roboto Condensed", sans-serif` : _fontFamily
        this._fontFamily = fontFamily


        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "toggle-switch");
        this._wrapper = wrapper;

        const id = `toggle_${Date.now()}`
        this._id = id;

        const input = document.createElement("input");
        input.setAttribute("class", "toggle-input");
        input.setAttribute("id", id);
        input.setAttribute("type", "checkbox");
        this._input = input;

        const label = document.createElement("label");
        label.setAttribute("class", "toggle-label")
        label.setAttribute("for", id)
        this._label = label;

        const content = document.createElement("label");
        content.setAttribute("class", "content-label")
        content.setAttribute("for", id);
        const contentText = this.innerHTML
        content.innerText = contentText
        this._content = content;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

            .toggle-switch {
                --standard-font-size: ${this._fontSize};
                font-family: ${this._fontFamily};
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 10px;
                font-size: var(--standard-font-size);
            }

            .toggle-switch.disabled{
                pointer-events:none;
                opacity: 0.5;
            }

            .toggle-switch .toggle-input {
                display: none;
            }
            
            .toggle-switch .toggle-label {
                top: 0;
                left: 0;
                width: 2.5em;
                height: 1.5em;
                background-color: #c5c5c5;
                border-radius: 2.125em;
                cursor: pointer;
                transition: 0.2s;
            }

            .toggle-label:hover{
                background-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
            }
            
            .toggle-switch .toggle-label::after {
                content: "";
                position: relative;
                display: block;
                width: 1.25em;
                height: 1.25em;
                border-radius: 50%;
                top: 0.125em;
                left: 0.125em;
                background-color: #fff;
                box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
                transition: transform 0.2s;
            }
            
            .toggle-switch .toggle-input:checked + .toggle-label {
                background-color: #2196F3;
            }
            
            .toggle-switch .toggle-input:checked + .toggle-label::after {
                transform: translateX(1em);
            }

            .content-label{
                cursor: pointer;
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */

            }
        `;

        this.innerHTML = ""

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(input);
        wrapper.appendChild(label);
        wrapper.appendChild(content);

        input.addEventListener("change", setDataToParent)
        input.addEventListener("input", setDataToParent)
        function setDataToParent() {
            if (input.checked === true) {
                parent._checked = true
                parent.setChecked(parent)
            }
            if (input.checked === false) {
                parent._checked = false
                parent.setUnchecked(parent)
            }

        }
    }

    setEnabled() {
        this._wrapper.classList.remove("disabled")
    }

    setDisabled() {
        this._wrapper.classList.add("disabled")
    }

    setChecked() {
        this.setAttribute("checked", this._input.checked);
    }

    setUnchecked() {
        this.setAttribute("checked", this._input.checked);
    }

}
customElements.define("pretty-switch", PrettySwitch);

class PrettySelect extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const parent = this;

        function noAttributeSet(attributeSelection) {
            let str = attributeSelection;
            if (typeof str === "string" && str.length === 0) {
                return true
            } else if (str === null) {
                return true
            } else {
                return false
            }
        }

        // Set a standard Font-Size
        const _fontSize = this.getAttribute("font-size")
        const fontSize = noAttributeSet(_fontSize) == true ? "16px" : _fontSize
        this._fontSize = fontSize

        // Set a standard Font-Family
        const _fontFamily = this.getAttribute("font-family")
        const fontFamily = noAttributeSet(_fontFamily) == true ? `"Roboto Condensed", sans-serif` : _fontFamily
        this._fontFamily = fontFamily

        this.setAttribute("opened", false);

        // Collect the name attribtue 
        const name = this.getAttribute("name");
        this._name = name;

        // Create Label
        const label = document.createElement("label");
        label.innerHTML = `${this._name}`;

        // Collect the Parent Select
        const parentSelect = this.getElementsByTagName("select")[0];
        var opt = new Option('', '0');
        parentSelect.insertBefore(opt, parentSelect.options[0]);
        parentSelect.options[0].innerHTML = "Reset Selection"
        this._parentSelect = parentSelect;

        // Create a div.custom-select
        const customSelect = document.createElement("div");
        customSelect.setAttribute("class", "custom-select");
        this._customSelect = customSelect;

        customSelect.appendChild(parentSelect);
        customSelect.appendChild(label);

        // Create a div.select-selected
        const selectedItem = document.createElement("div");
        selectedItem.setAttribute("class", "select-selected");
        selectedItem.innerHTML = parentSelect.options[parentSelect.selectedIndex].innerHTML;
        this._selectedItem = selectedItem;

        customSelect.appendChild(selectedItem);

        // Create a div.select-items select-hide
        const selectedItemsContainer = document.createElement("div");
        selectedItemsContainer.setAttribute("class", "select-items select-hide");
        this._selectedItemsContainer = selectedItemsContainer;

        for (let j = 1; j < parentSelect.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            const selectOption = document.createElement("DIV");
            selectOption.innerHTML = parentSelect.options[j].innerHTML;
            selectOption.addEventListener("click", function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                const selectedItem = this.parentNode.previousSibling;
                for (let i = 0; i < parentSelect.length; i++) {
                    if (parentSelect.options[i].innerHTML == this.innerHTML) {
                        parentSelect.selectedIndex = i;
                        selectedItem.innerHTML = this.innerHTML;
                        const previousSelected = this.parentNode.getElementsByClassName("same-as-selected");
                        for (let k = 0; k < previousSelected.length; k++) {
                            previousSelected[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected");
                        if (i === 0) {
                            parent.setUnselected();
                        } else {
                            parent.setSelected();
                        }
                        break;
                    }
                }
                selectedItem.click();
            });
            selectedItemsContainer.appendChild(selectOption);
        }

        customSelect.appendChild(selectedItemsContainer);

        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener(
            "click",
            function (event) {
                if (parent !== event.target) return

                if (parent.contains(event.target)) {
                    parent.toggle()
                    closeAllSelect(parent)
                } else {
                    closeAllSelect()
                    parent.setInactive()
                }
            }
        );

        function closeAllSelect(elmnt) {
            const element = typeof elmnt == "undefined" ? "" : elmnt instanceof HTMLElement ? elmnt : elmnt.target
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            const prettySelects = document.getElementsByTagName("pretty-select");
            for (let i = 0; i < prettySelects.length; i++) {
                if (element === prettySelects[i]) {
                    continue
                }
                prettySelects[i].setClosed()
            }
        }


        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
                   
            /*the container must be positioned relative:*/
            .custom-select {
                --standard-font-size: ${this._fontSize};
                font-family: ${this._fontFamily};
                position: relative;
                font-size: var(--standard-font-size);
                color: #3a3a3a;
            }

            .custom-select.active > .select-selected {
                border-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
            }

            .custom-select.disabled{
                background-color: #f7f7f7;
                color: #3a3a3a;
                pointer-events: none;
                cursor: not-allowed;
            }
            
            .custom-select > label{
                all: unset;
                color: inherit;
                position: absolute;
                transition: 0.2s;
                border-radius: 5px;
                top: 7px;
                left: 7px;
                background-color: white;
                cursor: pointer;
            }
            
            .custom-select.active > label{
                font-size: 0.7em;
                margin-top: calc(-1.1em);
                padding: 0 3px;
                border-radius: 0;
                color: black;
            }

            .custom-select.selected > label{
                font-size: 0.7em;
                margin-top: calc(-1.1em);
                padding: 0 3px;
                border-radius: 0;
                color: black;
            }

            .custom-select select {
                all: unset;
                display: none; /*hide original SELECT element:*/
            }

            .custom-select:hover > .select-selected {
                border-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
            }
            
            .select-selected {
                background-color: white;
            }
            
            /*style the arrow inside the select element:*/
            .select-selected:after {
                position: absolute;
                content: "";
                top: 13px;
                right: 10px;
                width: 0;
                height: 0;
                border: 6px solid transparent;
                border-color: #c5c5c5 transparent transparent transparent;
            }
            
            /*point the arrow upwards when the select box is open (active):*/
            .select-selected.select-arrow-active:after {
                border-color: transparent transparent #c5c5c5 transparent;
                top: 6px;
            }
            
            /*style the items (options), including the selected item:*/
            .select-items div,.select-selected {
                color: #3a3a3a;
                padding: 5px;
                border-left: 2px solid #c5c5c5;
                border-right: 2px solid #c5c5c5;
                cursor: pointer;
                user-select: none;
                font-size: 1em;
            }
            
            .select-items div:last-of-type {
                border-radius: 0 0 5px 5px;
                border-bottom: 2px solid #c5c5c5
            }
            
            .select-selected {
                border: 2px solid #c5c5c5;
                border-radius: 5px;
                transition: 0.2s;
            }
            
            .select-selected.select-arrow-active{
                border-radius:5px 5px 0 0;
            }
            
            /*style items (options):*/
            .select-items{
                position: absolute;
                background-color: white;
                top: 100%;
                left: 0;
                right: 0;
                z-index: 99;
            }
            
            /*hide the items when the select box is closed:*/
            .select-hide {
                display: none;
            }
            
            .select-items div:hover, .same-as-selected {
                background-color: #f7f7f7;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(customSelect);


    }

    toggle() {
        if (this.getAttribute("opened") === "true") {
            this.setClosed()
            this.setInactive()
        } else {
            this.setOpened()
            this.setActive()
        }
    }

    setOpened() {
        this._selectedItem.classList.add("select-arrow-active");
        this._selectedItemsContainer.classList.remove("select-hide");
        this.setAttribute("opened", true)
    }

    setClosed() {
        this._selectedItem.classList.remove("select-arrow-active");
        this._selectedItemsContainer.classList.add("select-hide");
        this.setAttribute("opened", false)
    }

    setActive() {
        this._customSelect.classList.add("active")
    }

    setInactive() {
        this._customSelect.classList.remove("active")
    }

    setEnabled() {
        this._customSelect.classList.remove("disabled")
    }

    setDisabled() {
        this._customSelect.classList.add("disabled")
    }

    setSelected() {
        this._customSelect.classList.add("selected")
        this.setAttribute("value", this._customSelect.getElementsByClassName("select-selected")[0].innerText)
    }

    setUnselected() {
        this._customSelect.classList.remove("selected")
    }

}
customElements.define("pretty-select", PrettySelect);

class PrettyTextArea extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const parent = this;

        function noAttributeSet(attributeSelection) {
            let str = attributeSelection;
            if (typeof str === "string" && str.length === 0) {
                return true
            } else if (str === null) {
                return true
            } else {
                return false
            }
        }

        // Set a standard Font-Size
        const _fontSize = this.getAttribute("font-size")
        const fontSize = noAttributeSet(_fontSize) == true ? "16px" : _fontSize
        this._fontSize = fontSize

        // Set a standard Font-Family
        const _fontFamily = this.getAttribute("font-family")
        const fontFamily = noAttributeSet(_fontFamily) == true ? `"Roboto Condensed", sans-serif` : _fontFamily
        this._fontFamily = fontFamily

        // Collect the name attribtue 
        const name = this.getAttribute("name");
        this._name = name;

        // Create the div.wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "beautiful-input");
        this._wrapper = wrapper;

        // Create Input
        const input = document.createElement("textarea");
        input.setAttribute("placeholder", " ");
        this._input = input;

        // Create Label
        const label = document.createElement("label");
        label.innerHTML = `${this._name}`;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");

        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
            
            .beautiful-input{
                --standard-font-size: ${this._fontSize};
                font-family: ${this._fontFamily};
                width: calc(100% - 4px - 10px);
                border: 2px solid #c5c5c5;
                background-color: white;
                color: #3a3a3a;
                padding: 5px;
                border-radius: 5px;
                transition: 0.2s;
                display: grid;
                cursor: pointer;
                font-size: var(--standard-font-size);
            }
            
            .beautiful-input:hover{
                border-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
            }

            .beautiful-input.active{
                border-color: #2196F3;
                color: #000000;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                cursor: text;
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
                font-size: 0.7em;
                margin-top: calc(-1.1em);
                background-color: white;
                padding: 0 3px;
            }
            
            .beautiful-input > textarea{
                all: unset;
                color: inherit;
                font-size: 1em;
            }
            
            .beautiful-input > textarea:not(:placeholder-shown) + label{
                font-size: 0.7em;
                margin-top: calc(-1.1em);
                background-color: white;
                padding: 0 3px;
            }
            
        `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(input);
        wrapper.appendChild(label);

        input.addEventListener("change", setDataToParent)
        input.addEventListener("input", setDataToParent)

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

    setActive() {
        this._wrapper.classList.add("active")
        this._input.focus()
    }

    setInactive() {
        this._wrapper.classList.remove("active")
    }

    setDisabled() {
        this._wrapper.classList.add("disabled")
    }

    setEnabled() {
        this._wrapper.classList.remove("disabled")
    }

}
customElements.define("pretty-text-area", PrettyTextArea);

class PrettyButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        const parent = this;

        function noAttributeSet(attributeSelection) {
            let str = attributeSelection;
            if (typeof str === "string" && str.length === 0) {
                return true
            } else if (str === null) {
                return true
            } else {
                return false
            }
        }

        // Set a standard Font-Size
        const _fontSize = this.getAttribute("font-size")
        const fontSize = noAttributeSet(_fontSize) == true ? "16px" : _fontSize
        this._fontSize = fontSize

        // Set a standard Button Type
        const _type = this.getAttribute("type")
        const type = noAttributeSet(_type) == true ? "secondary" : _type
        this._type = type

        // Set a standard Font-Family
        const _fontFamily = this.getAttribute("font-family")
        const fontFamily = noAttributeSet(_fontFamily) == true ? `"Roboto Condensed", sans-serif` : _fontFamily
        this._fontFamily = fontFamily

        // Collect the name attribtue 
        const value = this.innerHTML;
        this._value = value;

        // Create the div.wrapper
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", `wrapper ${this._type}`);
        this._wrapper = wrapper;

        // Create Input
        const button = document.createElement("button");
        this._button = button;

        // Create Label
        const label = document.createElement("label");
        label.innerHTML = `${this._value}`;

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");

        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,700;1,900&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
                       
            .wrapper > button {
                display:none;
            }
            
            .wrapper > label {
                all: unset;
                cursor: pointer;
            }
            
            .wrapper {
                --standard-font-size: ${this._fontSize};
                font-family: ${this._fontFamily};
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
                width: calc(100% - 4px - 10px);
                padding: 5px;
                background-color: #e6e6e6;
                border: 2px solid #c5c5c5;
                color: #3a3a3a;
                border-radius: 5px;
                transition: 0.2s;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: var(--standard-font-size);
            }

            .wrapper.primary{
                background-color: #2196F3;
                border-color: #2196F3;
                color: #ffffff;
            }
            
            .wrapper.primary:hover{
                filter: brightness(118%);
            }
            
            .wrapper.primary:active{
                background-color: #196AAA;
                -webkit-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                -moz-box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
                box-shadow: 0px 0px 5px 1px rgba(120,203,255,0.75);
            }
            
            .wrapper.disabled{
                pointer-events: none;
                cursor: not-allowed;;
                opacity: 0.5;
            }
            
            .wrapper:hover {
                filter: brightness(85%);
            }
            
            .wrapper:active {
                filter: brightness(70%);
            }
        `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(label);
        wrapper.appendChild(button);

    }

    setDisabled() {
        this._wrapper.classList.add("disabled")
    }

    setEnabled() {
        this._wrapper.classList.remove("disabled")
    }
}
customElements.define("pretty-button", PrettyButton);

class PrettyCaptcha extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const simpleCaptcha = this;
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        function noAttributeSet(attributeSelection) {
            let str = attributeSelection;
            if (typeof str === "string" && str.length === 0) {
                return true
            } else if (str === null) {
                return true
            } else {
                return false
            }
        }

        // Set a standard Font-Size
        const _fontSize = this.getAttribute("font-size")
        const fontSize = noAttributeSet(_fontSize) == true ? "16px" : _fontSize
        this._fontSize = fontSize

        // Set a standard Font-Family
        const _fontFamily = this.getAttribute("font-family")
        const fontFamily = noAttributeSet(_fontFamily) == true ? `"Roboto Condensed", sans-serif` : _fontFamily
        this._fontFamily = fontFamily

        // Create a Wrapper div
        const wrapper = document.createElement("div");
        wrapper.setAttribute("class","wrapper")

        // Create the Calculation, which you ask to check for
        const numbers = "0123456789";
        const operations = ["+", "&#10006;","-"];
        
        // Get the First and Second element of the calculation
        let first = Number(
            numbers.charAt(Math.floor(Math.random() * numbers.length))
        );
        let second = Number(
            numbers.charAt(Math.floor(Math.random() * numbers.length))
        );
        
        // Get the operation of the calculation
        let operation = operations[Math.floor(Math.random() * operations.length)];
        
        // Compute the result
        let result = 0;
        if (operation == "+") {
            result = first + second;
        }
        if (operation == "&#10006;") {
            result = first * second;
        }
        if (operation == "-") {
            result = first - second;
        }
        
        // Set the Standard Captcha-Text
        const captchaText = this.innerHTML.length == 0 ? "Solve the equation to prove you're human." : this.innerHTML;
        // Create a Label
        const label_info = document.createElement("label");
        label_info.innerHTML = `${captchaText}`;

        // Create the Calculation Label, which you ask to check for
        let calculation = `${first} ${operation} ${second} = `;
        const label_calculation = document.createElement("label");
        label_calculation.innerHTML = `${calculation}`;

        // Create a Input
        const input = document.createElement("pretty-input");
        input.setAttribute("font-size", this._fontSize);
        input.setAttribute("id", "pretty-captcha");
        input.setAttribute("name", " ");
        input.setAttribute("type", "number");
        input.setAttribute("min", "-999");
        input.setAttribute("max", "-999");
        input.setAttribute("pattern", result);
        input.setAttribute("data-right", false);
        input.addEventListener("input", checkDataResult);
        input.addEventListener("change", checkDataResult);
        function checkDataResult() {
            if (this.value == this.getAttribute("pattern")) {
                this.setAttribute("data-right", true);
                simpleCaptcha.setAttribute("checked", true);
            } else {
                this.setAttribute("data-right", false);
                simpleCaptcha.setAttribute("checked", false);
            }
        }

        // Create a Reset Button
        const button = document.createElement("pretty-button");
        button.innerHTML = "&#8635;"
        button.setAttribute("font-size",this._fontSize)
        button.addEventListener("click",regenerateEquation)

        function regenerateEquation(){
            // Get the First and Second element of the calculation
            let first = Number( numbers.charAt(Math.floor(Math.random() * numbers.length)) );
            let second = Number( numbers.charAt(Math.floor(Math.random() * numbers.length)) );

            // Get the operation of the calculation
            let operation = operations[Math.floor(Math.random() * operations.length)];

            // Compute the result
            let result = 0;
            if (operation == "+") { result = first + second; }
            if (operation == "-") { result = first - second; }
            if (operation == "&#10006;") { result = first * second; }

            // Create the Calculation Label, which you ask to check for
            let calculation = `${first} ${operation} ${second} = `;

            input.setAttribute("type", "number");
            input.setAttribute("min", "-999");
            input.setAttribute("max", "-999");
            input.setAttribute("pattern", result);
            input.setAttribute("data-right", false);
            input.updatePattern(result)
            input.resetInputValue()

            label_calculation.innerHTML = `${calculation}`;
        }

        const style = document.createElement("style");
        style.textContent = ` 
       
        .wrapper{
            --standard-font-size: ${this._fontSize};
            font-family: ${this._fontFamily};
            font-size: var(--standard-font-size);
            display: grid;
            gap: 5px;
            grid-template-columns: 1fr 50px 1fr;
            align-items: center;
            justify-items: center;
            justify-content: center;
        }


        label:first-of-type{
            grid-column: 1 / 4;
            text-align: center;
        }

        label:last-of-type{
            text-align: end;
            justify-self: end;
            width: 50px;
        }

        #pretty-captcha{
            width: 100%;
        }
        
        pretty-button{
            justify-self: start;
            width: 35px;
        }
     
        `;
        this.innerHTML = "";
        this.appendChild(shadow);
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(label_info);
        wrapper.appendChild(label_calculation);
        wrapper.appendChild(input);
        wrapper.appendChild(button);
    }
}
customElements.define("pretty-captcha", PrettyCaptcha);
