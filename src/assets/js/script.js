// creating cards dynamically 
const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
.then(response => response.json())
.then(data => {
    data.forEach((country) => {
        // console.log(country);
        const countryCard = document.createElement("a");
        countryCard.href = `src/components/country.html?name=${country.name.common}`;
        countryCard.classList.add("country-card");
        countryCard.innerHTML = `
                <div class="country-flag">
                    <img src="${country.flags.svg}" alt="${country.flags.alt}">
                </div>
                <div class="country-info">
                    <h2 class="country-name">${country.name.common}</h2>
                    <p class="country-population"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p class="country-region"><strong>Region:</strong> ${country.region}</p>
                    <p class="country-capital"><strong>Capital:</strong> ${country.capital}</p>
                </div>
        `;
    
        countriesContainer.append(countryCard);
    });
});



// Dark Mode
const darkModeIcon = document.querySelector(".nav-theme-mode");
const darkModeText = document.querySelector(".nav-theme-mode span");

// Check for saved dark mode preference on page load
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeText.textContent = "Light Mode";
}

darkModeIcon.addEventListener("click", () => {
    document.body.classList.add("transition");
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        darkModeText.textContent = "Light Mode";
        localStorage.setItem("darkMode", "enabled");
    } else {
        darkModeText.textContent = "Dark Mode";
        localStorage.setItem("darkMode", "disabled");
    }
    setTimeout(() => {
        document.body.classList.remove("transition");
    }, 1000); // Adjust the timeout duration to match the CSS transition duration
});


// Search
const searchInput = document.querySelector("body > main > section > div.search-filter-container > div.search-container > div > input");

let debounceTimeout;
searchInput.addEventListener("input", () => {
    console.log(searchInput.value);
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const searchValue = searchInput.value.toLowerCase();
        const countryCards = document.querySelectorAll(".country-card");
        countryCards.forEach((countryCard) => {
            const countryName = countryCard.querySelector(".country-name").textContent.toLowerCase();
            if (countryName.includes(searchValue)) {
                countryCard.style.display = "block";
            } else {
                countryCard.style.display = "none";
            }
        });
    }, 300); // Adjust the debounce delay as needed
});


// Filter by Region
const regionSelect =  document.querySelector(".region-select");
regionSelect.addEventListener("change", (e) => {
    const selectedRegion = e.target.value;
    const countryCards = document.querySelectorAll(".country-card");
    countryCards.forEach((countryCard) => {
        const countryRegion = countryCard.querySelector(".country-region").textContent.split(": ")[1].toLowerCase();
        if (selectedRegion === "all" || selectedRegion === countryRegion) {
            countryCard.style.display = "block";
        } else {
            countryCard.style.display = "none";
        }
    });
})