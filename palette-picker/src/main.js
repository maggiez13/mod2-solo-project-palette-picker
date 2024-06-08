import "./assets/style.css"
import palettesFromJSONData from '../../palettes.json'
import { getLocalStorageKey, getPalettes, setLocalStorageKey } from "./js/local-storage-handlers.js";
import { makePaletteCards } from "./js/dom-helpers";
import { handlePaletteSubmit, copyingPaletteButtons } from "./js/event-handlers";


const main = () => {
  // check local storage 
  const getLocalPalettes = getPalettes();
  if (getLocalPalettes.length === 0) {
    setLocalStorageKey('palettes', palettesFromJSONData)
  }

  makePaletteCards();

  document.querySelector("#palette-form-header").addEventListener("submit", handlePaletteSubmit);

  copyingPaletteButtons();
}

main(); 