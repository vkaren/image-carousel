import { useContext } from "react";
import { AppContext } from "@context";
import "./styles.css";

function SelectBreed() {
  const { onSelectBreed } = useContext(AppContext);
  const breedOptions = [
    "Dachshund",
    "Corgi",
    "Sharpei",
    "Chihuahua",
    "Boxer",
    "Border Collie",
    "Dingo",
    "Toy Poodle",
    "Mix",
    "Pug",
    "Mexicanhairless",
  ];

  return (
    <section className="select_container" aria-label="select dog breed">
      <label htmlFor="breed-imgs">
        <span className="select_title">Select dog breed:</span>
        <select name="breed-imgs" id="breed-imgs" onChange={onSelectBreed}>
          {breedOptions.map((breed) => (
            <option key={breed} value={breed.toLowerCase()}>
              {breed}
            </option>
          ))}
        </select>
      </label>
    </section>
  );
}

export default SelectBreed;
