import React, { useState } from 'react';

const Customize = () => {
  const [coffeeType, setCoffeeType] = useState('Espresso');
  const [milkType, setMilkType] = useState('Whole Milk');
  const [sugarLevel, setSugarLevel] = useState(0);
  const [size, setSize] = useState('Small');
  const [extras, setExtras] = useState([]);

  const extrasOptions = ['Whipped Cream', 'Caramel Drizzle', 'Flavored Syrups'];

  const toggleExtra = (extra) => {
    if (extras.includes(extra)) {
      setExtras(extras.filter(e => e !== extra));
    } else {
      setExtras([...extras, extra]);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#1f1f1f', color: '#FFD700', borderRadius: '10px' }}>
      <h1>Coffee Customization Interface</h1>
      <form>
        <label>
          Coffee Type:
          <select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)}>
            <option>Espresso</option>
            <option>Latte</option>
            <option>Cappuccino</option>
            <option>Americano</option>
            <option>Mocha</option>
          </select>
        </label>
        <br /><br />
        <label>
          Milk Type:
          <select value={milkType} onChange={(e) => setMilkType(e.target.value)}>
            <option>Whole Milk</option>
            <option>Almond Milk</option>
            <option>Soy Milk</option>
            <option>Oat Milk</option>
            <option>No Milk</option>
          </select>
        </label>
        <br /><br />
        <label>
          Sugar Level:
          <input type="range" min="0" max="5" value={sugarLevel} onChange={(e) => setSugarLevel(e.target.value)} />
          {sugarLevel} tsp
        </label>
        <br /><br />
        <label>
          Size:
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>Extra Large</option>
          </select>
        </label>
        <br /><br />
        <fieldset>
          <legend>Extras:</legend>
          {extrasOptions.map(extra => (
            <label key={extra}>
              <input
                type="checkbox"
                checked={extras.includes(extra)}
                onChange={() => toggleExtra(extra)}
              />
              {extra}
            </label>
          ))}
        </fieldset>
      </form>
      <br />
      <div style={{ backgroundColor: '#333', padding: '15px', borderRadius: '10px' }}>
        <h2>Your Coffee Preview</h2>
        <p><strong>Type:</strong> {coffeeType}</p>
        <p><strong>Milk:</strong> {milkType}</p>
        <p><strong>Sugar:</strong> {sugarLevel} tsp</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Extras:</strong> {extras.length > 0 ? extras.join(', ') : 'None'}</p>
      </div>
    </div>
  );
};

export default Customize;
