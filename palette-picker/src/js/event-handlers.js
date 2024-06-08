import { v4 as uuidv4 } from "uuid";
import { makePaletteCards } from "./dom-helpers";
import { setLocalStorageKey, getLocalStorageKey } from "./local-storage-handlers";

export const handlePaletteSubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const form = event.target; 
  const uuid = uuidv4(); 
  const title = form.paletteTitle.value; 
  if (!title) {
    alert("Please enter a title.");
    return;
  }

  const color1 = form.color1.value; 
  const color2 = form.color2.value; 
  const color3 = form.color3.value; 

  const temperature = form.temperature.value;

  const palettes = getLocalStorageKey("palettes") || [];

  palettes.push({ uuid, title, colors: [color1, color2, color3], temperature });

  setLocalStorageKey("palettes", palettes);

  makePaletteCards();

  form.reset();
}

const copyPaletteButtonFunction = async (event) => {
  const button = event.target;
  const colorCode = button.dataset.color;

  try {
    // Copy color code to clipboard
    await navigator.clipboard.writeText(colorCode);

    // Change button text
    button.innerText = "Copied hex!";
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Revert button text after 1 second
    button.innerText = `Copy\n${colorCode}`;
  } catch (error) {
    console.error('Unable to copy color code to clipboard:', error);
  }
};

export const copyingPaletteButtons = () => {
  document.querySelectorAll(".color-copy").forEach(copyButton => {
    copyButton.addEventListener("click", copyPaletteButtonFunction);
  });
}



