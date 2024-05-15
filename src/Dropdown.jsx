import { useState } from "react";

const Dropdown = () => {

  const [selectedValue, setSelectedValue] = useState('Breakfast');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  }

  return (
    <div>
      <select value={selectedValue} onChange={handleChange}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
        <option value="dessert">Dessert</option>
        <option value="appetizers">Appetizers</option>
        <option value="gluten-free">Gluten-Free</option>
        <option value="vegan">Vegan</option>
      </select>
    </div>
  );
};


export default Dropdown;

/** 
 * This code defines a functional component named Dropdown.
 *  It uses the useState hook to manage the selected value of the dropdown menu. 
 * The handleChange function updates the state whenever the user selects a different option from the dropdown.
*/
