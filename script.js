function calculateIngredients(targetLiters, drinkType) {
  let lemonadeRatio, sugarRatio, limantosRatio;

  if (drinkType === 'lemonade') {
    lemonadeRatio = 25
    sugarRatio = 1;
    limantosRatio = 30;
  } else if (drinkType === 'blueberry') {
    lemonadeRatio = 200;
    sugarRatio = 1;
    limantosRatio = 30;
  } else {
    throw new Error('Invalid drink type');
  }

  const lemonadeAmount = (targetLiters / 10) * lemonadeRatio;
  const sugarAmount = (targetLiters / 10) * sugarRatio;
  const limantosAmount = (targetLiters / 10) * limantosRatio;

  return {
    lemonade: `${lemonadeAmount.toFixed(2)} ml`,
    sugar: `${sugarAmount.toFixed(2)} kg`,
    limantos: `${limantosAmount.toFixed(2)} grams`,
  };
}

function updateIngredients() {
  const drinkTypeSelect = document.getElementById('drinkType');
  const targetLitersInput = document.getElementById('targetLiters');

  // Reset target liters input and result container
  targetLitersInput.value = '';
  document.getElementById('result').innerHTML = '';

  // Clear any error messages
  targetLitersInput.setCustomValidity('');

  // Enable/disable target liters input based on the selected drink type
  targetLitersInput.enable = drinkTypeSelect.value === 'blueberry';
}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    calculate();
  }
}

function calculate() {
  const drinkTypeSelect = document.getElementById('drinkType');
  const targetLitersInput = document.getElementById('targetLiters');
  const resultContainer = document.getElementById('result');

  const targetLiters = parseFloat(targetLitersInput.value);
  const drinkType = drinkTypeSelect.value;

  if (!isNaN(targetLiters) && targetLiters > 0) {
    try {
      const { lemonade, sugar, limantos } = calculateIngredients(targetLiters, drinkType);

      resultContainer.innerHTML = `
        <p><strong>${capitalizeFirstLetter(drinkType)}:</strong> ${lemonade}</p>
        <p><strong>Sugar:</strong> ${sugar}</p>
        <p><strong>Limantos:</strong> ${limantos}</p>
      `;
    } catch (error) {
      resultContainer.innerHTML = `<p>${error.message}</p>`;
    }
  } else {
    resultContainer.innerHTML = '<p>Please enter a valid target liters value.</p>';
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
