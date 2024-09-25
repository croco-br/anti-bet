async function placeBet() {

    try {
        showLoader()

        const betAmount = parseFloat(document.getElementById('bet-amount').value);
        const houseValue = document.getElementById('bet-slider-house').value;
        const betQuantity = document.getElementById('bet-simulation-option').value;

        if (isNaN(betAmount) || houseValue === "" || betQuantity === "") {
            alert("Por favor, preencha todos os campos");
            hideLoader()
            return;
        }

        const simulationResult = await simulate(betAmount, betQuantity, houseValue / 100)

        showResults(simulationResult)


    } catch (error) {
        console.log(error)
    }
    finally {
        hideLoader()
    }

}

async function simulate(value, quantity, houseValue) {
    const response = await fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value, quantity: quantity, house_value: houseValue }),
    });

    return await response.json();
}

function showResults(simulationResult) {
    const resultMessage = document.getElementById('result-message');


    const betResultElement = document.querySelector('.bet-result');
    betResultElement.style.display = 'block'; // Show the result element

    betResultElement.classList.remove('is-danger', 'is-info')

    resultMessage.innerText = `A banca venceu ${simulationResult.houseWins} vezes. Os jogadores venceram ${simulationResult.playerWins} vezes.`;

    if (simulationResult.houseWins > simulationResult.playerWins) {
        resultMessage.innerText += ` A banca ganhou ${simulationResult.sum}.`;
        betResultElement.classList.add('is-danger');
    }
    else {
        resultMessage.innerText += ` Os jogadores ganharam ${simulationResult.sum * -1}.`;
        betResultElement.classList.add('is-success');
    }
}

function hideLoader() {
    const loader = document.getElementById('placeButton');
    loader.classList.remove('is-loading');
}

function showLoader() {
    const loader = document.getElementById('placeButton');
    loader.classList.add('is-loading');

    const resultMessage = document.getElementById('result-message');
    resultMessage.innerText = `Calculando apostas...`
}

function updateSlider() {
    const slider = document.getElementById('bet-slider-house');
    const sliderValue = document.getElementById('bet-slider-house-value');

    // Função para formatar o valor do slider com uma casa decimal
    function formatSliderValue(value) {
        return `${parseFloat(value).toFixed(1)}%`;
    }

    // Atualiza o valor exibido quando o slider é movido
    slider.addEventListener('input', () => {
        sliderValue.textContent = formatSliderValue(slider.value);
    });

    // Exibe o valor inicial
    sliderValue.textContent = formatSliderValue(slider.value);
}