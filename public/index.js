var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
  Task 1: Change font, size and color of the text

  Whenever the user clicks on the button, the selected element's
  color, font-size and font-family should change to the values specified above
*/
document.getElementById("task1").onclick = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    let element = yield webflow.getSelectedElement();
    if (element && element.styles && element.configurable && element.textContent) {
        const fontFamily = getFontFamily();
        const fontSize = getFontSize();
        const fontColor = getFontColor();
        if (fontSize == 'px') {
            console.log("font size is empty");
            webflow.notify({ type: 'Error', message: 'Font size must be greater than 0' });
            return;
        }
        console.log("fontFamily", fontFamily, "fontSize", fontSize, "fontColor", fontColor);
        let newStyle = yield createOrUseExistingStyle("task1Style", fontFamily, fontSize, fontColor);
        element.setStyles([newStyle]);
        yield element.save();
        webflow.notify({ type: 'Success', message: 'Successfully added styles to ' + element.type + ' !' });
    }
    else {
        webflow.notify({ type: 'Error', message: 'Cannot apply styles to ' + element.type + '!' });
    }
});
function getFontFamily() {
    const fontFamilySelect = document.getElementById('fontFamily');
    const fontFamily = fontFamilySelect.options[fontFamilySelect.selectedIndex].value;
    return fontFamily;
}
function getFontColor() {
    const fontColor = document.getElementById('fontColor');
    return fontColor.value;
}
function getFontSize() {
    const fontSize = document.getElementById('fontSize');
    return fontSize.value + 'px';
}
// Check if specified style exists. If not, create a new style
function createOrUseExistingStyle(styleName, fontFamily, fontSize, fontColor) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if this style exists to avoid duplicate styles
        const style = yield webflow.getStyleByName(styleName);
        if (style) {
            return style;
        }
        else {
            // Create a new style, return it
            const taskStyle = webflow.createStyle(styleName);
            taskStyle.setProperties({ "color": fontColor, "font-size": fontSize, "font-family": fontFamily });
            return taskStyle;
        }
    });
}
/*
Task 2: Create a combo class and apply it to the text

Based on the docs mentioned here
https://developers.webflow.com/reference/the-domelement-object#creating-elements
Combo Class creation is NOT currently supported
So even though we try to append to the existing styles, instead of
creating a combo class its going to create a new class inheriting
from the previous class
*/
document.getElementById("task2").onclick = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    let element = yield webflow.getSelectedElement();
    if (element && element.styles && element.configurable && element.textContent) {
        const currentStyle = yield element.getStyles();
        const fontFamily = getFontFamily();
        const fontSize = getFontSize();
        const fontColor = getFontColor();
        if (fontSize == 'px') {
            console.log("font size is empty");
            webflow.notify({ type: 'Error', message: 'Font size must be greater than 0' });
            return;
        }
        console.log("fontFamily", fontFamily, "fontSize", fontSize, "fontColor", fontColor);
        let newStyle = yield createOrUseExistingStyle("task2Style", fontFamily, fontSize, fontColor);
        currentStyle.push(newStyle);
        element.setStyles([...currentStyle]);
        yield element.save();
        webflow.notify({ type: 'Success', message: 'Successfully added styles to ' + element.type + ' !' });
    }
    else {
        webflow.notify({ type: 'Error', message: 'Cannot apply styles to ' + element.type + '!' });
    }
});
/*
  Task 3: Check if a combo class exists, then update the existing combo class styling
  
  Checks if a combo class exists on a selected element.
  If it does, change the background-color of that combo class to yellow.
  If it does not, throw a notification saying no Combo Class exists.
*/
document.getElementById("task3").onclick = (event) => __awaiter(this, void 0, void 0, function* () {
    event.preventDefault();
    let element = yield webflow.getSelectedElement();
    if (element && element.styles && element.configurable && element.textContent) {
        const currentStyle = yield element.getStyles();
        const fontFamily = getFontFamily();
        const fontSize = getFontSize();
        const fontColor = getFontColor();
        if (fontSize == 'px') {
            console.log("font size is empty");
            webflow.notify({ type: 'Error', message: 'Font size must be greater than 0' });
            return;
        }
        console.log("fontFamily", fontFamily, "fontSize", fontSize, "fontColor", fontColor);
        // We are checking if a combo class exists
        if (currentStyle.length > 1) {
            // Applying the background-color to the last class in the array
            const comboClassElement = currentStyle[currentStyle.length - 1];
            comboClassElement.setProperties({ "color": fontColor, "font-size": fontSize, "font-family": fontFamily });
            yield comboClassElement.save();
        }
        else {
            webflow.notify({ type: 'Info', message: 'No Combo Class exists!' });
            return;
        }
        element.setStyles([...currentStyle]);
        yield element.save();
        webflow.notify({ type: 'Success', message: 'Successfully added styles to ' + element.type + ' !' });
    }
    else {
        webflow.notify({ type: 'Error', message: 'Cannot apply styles to ' + element.type + '!' });
    }
});
