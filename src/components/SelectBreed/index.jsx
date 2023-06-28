import React, { useContext } from "react";
import { AppContext } from "../context";
import "./styles.css";

function SelectBreed() {
  const { onSelectBreed } = useContext(AppContext);
  return (
    <section className="select_container" aria-label="select dog breed">
      <label htmlFor="breed-imgs">
        <span className="select_title">Select dog breed:</span>
        <select name="breed-imgs" id="breed-imgs" onChange={onSelectBreed}>
          <option value="chihuahua">Chihuahua</option>
          <option value="sharpei">Sharpei</option>
          <option value="dachshund">Dachshund</option>
          <option value="corgi">Corgi</option>
        </select>
      </label>
    </section>
  );
}

export default SelectBreed;
