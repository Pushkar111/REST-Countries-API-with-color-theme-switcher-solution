const countryName = new URLSearchParams(window.location.search).get("name");
console.dir(countryName);

const mainContent = document.querySelector(".main-content");
const countryContainer  = document.createElement("div");
countryContainer.classList.add("country-container");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then(response => response.json())
.then(data => {
    console.log(data);
    const country = data[0];
    console.log(country);
    countryContainer.innerHTML = `
                <div class="country-flag">
                    <img src="${country.flags.svg}" alt="${country.name.common}-flag">
                </div>
                <div class="country-details">
                    <h1 class="country-name">${country.name.common}</h1>
                    <div class="country-data">
                        <div class="country-info-left">
                            <p><strong>Native Name:</strong> ${country.name.nativeName ? country.name.nativeName[Object.keys(country.name.nativeName)[0]].official : country.name.common}</p>
                            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                            <p><strong>Region:</strong> ${country.region}</p>
                            <p><strong>Sub Region:</strong> ${country.subregion ? country.subregion : 'N/A'}</p>
                            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                        </div>
                        <div class="country-info-right">
                            <p><strong>Top Level Domain:</strong> ${country.tld[0]}</p>
                            <p><strong>Currencies:</strong> ${country.currencies ? Object.values(country.currencies)[0].name : 'N/A'}</p>
                            <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                        </div>
                    </div>
                    <div class="country-borders">
                        <p><strong>Border Countries:</strong></p>
                        <div class="border-countries"></div>
                    </div>
                </div>
    `;        
    mainContent.appendChild(countryContainer);

    if (country.borders) {
        country.borders.forEach(border => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                data.forEach(borderCountry => {
                    const borderLink = document.createElement('a');
                    borderLink.href = `/src/components/country.html?name=${borderCountry.name.common}`;
                    borderLink.textContent = borderCountry.name.common;
                    document.querySelector('.border-countries').appendChild(borderLink);
                });
            })
        });
    }else {
        document.querySelector('.border-countries').innerHTML = 'N/A';
    }
    
});


