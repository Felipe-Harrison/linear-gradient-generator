var numInput = 2;

const inputOnChange = (event) => {
    let data = getValueInput(`#${event.target.id}`)
    data = event.target.id == "angle" ? data + "deg" : data
    changeCssVar(`--${event.target.id}`,data);
    adjustColorText();
    showCssCode();
}

window.onload = function() {
    
    let inputs = document.querySelectorAll("input");

    for(let input of inputs){
        input.addEventListener("change",(event) => {
            inputOnChange(event)
        });
    }
    
    let angleValue = document.querySelector("#angleLabel");
    angleValue.nextElementSibling.addEventListener("change", (event) => {
        angleValue.innerHTML = getValueInput(`#${event.target.id}`);
    });

    showCssCode();
};

function getValueInput(inputName) {
    let input = document.querySelector(`${inputName}`);
    return input.value;
}

const changeCssVar = (variable, value) => {
    let cssVar = document.querySelector(":root");

    cssVar.style.setProperty(variable,value);
}

const showCssCode = () => {
    let cssVar = document.querySelector(":root");
    let angle = cssVar.style.getPropertyValue("--angle");
    
    let color1 = cssVar.style.getPropertyValue("--color1");
    let color2 = cssVar.style.getPropertyValue("--color2");

    let text = `
    background-image: linear-gradient(
        ${angle ? angle : '180deg'},
        ${color1 ? color1 : "#f2f2f2"},
        ${color2 ? color2 : "#d9d9d9"}
    );`;
    document.querySelector("#cssCode").innerHTML = text;

}

function adjustColorText() {
    let color1 = getValueInput("#color1");
    let color2 = getValueInput("#color2");

    (!isBrightness(getRGB(color1)) || !isBrightness(getRGB(color2))) ?
    document.querySelector("body").style.color = "white" :
    document.querySelector("body").style.color = "black" 
}

function getRGB(color) {
    let r = parseInt(color[1]+color[2],16);
    let g = parseInt(color[3]+color[4],16);
    let b = parseInt(color[5]+color[6],16);

    return {r,g,b};

}

function isBrightness(colorRGB) {

    let brightnessPercent = Math.sqrt(
        colorRGB.r * colorRGB.r * 0.241 +
        colorRGB.g * colorRGB.g * 0.691 +
        colorRGB.b * colorRGB.b * 0.068
    ); 

    return brightnessPercent > 50;

}

function addInput() {
    let InputContainer = document.querySelector("#input-container");

    let newInput = document.createElement("input");
    newInput.setAttribute("type","color");
    newInput.id = `color${numInput+1}`;
    newInput.addEventListener("change",(event) => {
        inputOnChange(event)
    });

    numInput++;
    InputContainer.appendChild(newInput);

}
