/*
  Task 1: Change font, size and color of the text

  Whenever the user clicks on the button, the selected element's
  color, font-size and font-family should change to the values specified above
*/
document.getElementById("task1").onclick = async (event) => {
  event.preventDefault();
  let element = await webflow.getSelectedElement()
  if (element && element.styles && element.configurable && element.textContent) {

    const fontFamily = getFontFamily();
    const fontSize = getFontSize();
    const fontColor = getFontColor();
    if (fontSize == 'px') {
      console.log("font size is empty")
      webflow.notify({ type: 'Error', message: 'Font size must be greater than 0'})
      return
    }
    console.log("fontFamily", fontFamily, "fontSize", fontSize, "fontColor", fontColor)
    let newStyle = await createOrUseExistingStyle("task1Style", fontFamily, fontSize, fontColor);
    element.setStyles([newStyle]);
    await element.save();
    webflow.notify({ type: 'Success', message: 'Successfully added styles to ' + element.type + ' !' })
  } else {
    webflow.notify({ type: 'Error', message: 'Cannot apply styles to ' + element.type +'!' })
  }
};

function getFontFamily() {
  const fontFamilySelect = document.getElementById('fontFamily') as HTMLSelectElement;
  const fontFamily = fontFamilySelect.options[fontFamilySelect.selectedIndex].value;
 return fontFamily;
}

function getFontColor() {
  const fontColor = document.getElementById('fontColor') as HTMLSelectElement;
  return fontColor.value;
}

function getFontSize() {
  const fontSize = document.getElementById('fontSize') as HTMLSelectElement;
  return fontSize.value + 'px';
}

// Check if specified style exists. If not, create a new style
async function createOrUseExistingStyle(styleName: string, fontFamily: string, fontSize: string, fontColor: string) {
  // Check if this style exists to avoid duplicate styles
  const style = await webflow.getStyleByName(styleName);
  if (style) {
    return style;
  } else {
    // Create a new style, return it
    const taskStyle = webflow.createStyle(styleName);
    taskStyle.setProperties({ "color": fontColor, "font-size": fontSize, "font-family": fontFamily })
    return taskStyle;
  }
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

document.getElementById("task2").onclick = async (event) => {
  event.preventDefault();
  let element = await webflow.getSelectedElement()
  if (element && element.styles && element.configurable && element.textContent) {
    const currentStyle = await element.getStyles();

    const fontFamily = getFontFamily();
    const fontSize = getFontSize();
    const fontColor = getFontColor();
    if (fontSize == 'px') {
      console.log("font size is empty")
      webflow.notify({ type: 'Error', message: 'Font size must be greater than 0'})
      return
    }
    console.log("fontFamily", fontFamily, "fontSize", fontSize, "fontColor", fontColor)
    let newStyle = await createOrUseExistingStyle("task2Style", fontFamily, fontSize, fontColor);
    currentStyle.push(newStyle);
    element.setStyles([...currentStyle]);
    await element.save();
    webflow.notify({ type: 'Success', message: 'Successfully added styles to ' + element.type + ' !' })
  } else {
    webflow.notify({ type: 'Error', message: 'Cannot apply styles to ' + element.type +'!' })
  }

}

/*
  Task 3: Check if a combo class exists, then update the existing combo class styling
  
  Checks if a combo class exists on a selected element. 
  If it does, change the background-color of that combo class to yellow.
  If it does not, throw a notification saying no Combo Class exists.
*/
document.getElementById("task3").onclick = async (event) => {
  event.preventDefault();
  let element = await webflow.getSelectedElement()
  if (element && element.styles && element.configurable && element.textContent) {
    const currentStyle = await element.getStyles();

    const fontFamily = getFontFamily();
    const fontSize = getFontSize();
    const fontColor = getFontColor();
    if (fontSize == 'px') {
      console.log("font size is empty")
      webflow.notify({ type: 'Error', message: 'Font size must be greater than 0'})
      return
    }
    console.log("fontFamily", fontFamily, "fontSize", fontSize, "fontColor", fontColor)
    // We are checking if a combo class exists
    if (currentStyle.length > 1) {
      // Applying the background-color to the last class in the array
      const comboClassElement = currentStyle[currentStyle.length - 1]
        comboClassElement.setProperties({ "color": fontColor, "font-size": fontSize, "font-family": fontFamily })
          await comboClassElement.save()
    } else {
      webflow.notify({ type: 'Info', message: 'No Combo Class exists!' })
      return
    }

    element.setStyles([...currentStyle]);
    await element.save();
    webflow.notify({ type: 'Success', message: 'Successfully added styles to ' + element.type + ' !' })
  } else {
    webflow.notify({ type: 'Error', message: 'Cannot apply styles to ' + element.type +'!' })
  }
};