import { getPalettes, setLocalStorageKey } from "./local-storage-handlers";
import { copyingPaletteButtons } from "./event-handlers";

// making div for each row of content 
const createColorDiv = (colorCode) => {
  const colorContainer = document.createElement("div");
  colorContainer.classList.add("color-container");

  const colorTextContainer = document.createElement("div"); // Create a div for color text
  colorTextContainer.classList.add("color-text-container");

  const colorText = document.createElement("p");
  colorText.classList.add("color-text");
  colorText.style.background = colorCode;
  colorText.innerHTML = 'Text <span style="color: black;">Example</span>';

  // Append the color text to the color text container
  colorTextContainer.appendChild(colorText);

  const colorCopy = document.createElement("button");
  colorCopy.classList.add("color-copy");
  colorCopy.dataset.color = colorCode;
  colorCopy.innerText = `Copy \n${colorCode}`;

  colorContainer.append(colorTextContainer, colorCopy);
  
  return colorContainer;
};

// structure of palette 
const makePaletteCard = (parentElement, paletteData) => {
  const { uuid, title, colors, temperature } = paletteData; 

  const li = document.createElement("li");
  li.dataset.uuid = uuid;

  const h3 = document.createElement("h3");
  h3.innerText = title;
  h3.classList.add("spacing")

  li.append(h3);
  colors.forEach((color) => {
    // will make a div for each color 
    li.append(createColorDiv(color));
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete Palette";
  deleteButton.classList.add("delete-palette");

  const temperatureText = document.createElement("p");
  temperatureText.innerText = temperature;
  temperatureText.classList.add("temperature")
  temperatureText.classList.add(temperature);

  deleteButton.addEventListener("click", () => {
    removePaletteFromLS(uuid);
  });

  li.append(deleteButton, temperatureText);
  parentElement.append(li);
}

// making actual card
export const makePaletteCards = () => {
  const palettes = getPalettes();
  const ul = document.getElementById("palettes-list");
  ul.innerHTML = "";
  console.log(palettes)
  palettes.forEach((palette) => makePaletteCard(ul, palette));
  copyingPaletteButtons();
}

// removing card  
const removePaletteFromLS = (uuid) => {
  const palettes = getPalettes();
  const updatedPalettes = palettes.filter(palette => palette.uuid !== uuid);
  setLocalStorageKey("palettes", updatedPalettes);
  makePaletteCards();
  copyingPaletteButtons();
}

