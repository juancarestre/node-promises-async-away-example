const axios = require('axios')


const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=6edf5f48c7871ec8522239b3f94396ee')
        const euro = 1/ response.data.rates[from];
        const rate = euro * response.data.rates[to];
        if (isNaN(rate)) {
            throw new Error()
        }
        return rate;
    } catch (error) {
        throw  new Error(`Unable to get exchange rate for ${from} and ${to}.`)        
    }
};


const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        return response.data.map((country) => country.name)        
    } catch (error) {
        throw new Error(`Unable to get countries that use ${currencyCode}`)
    }
}


const convertCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to)
    convertedAmount = (amount * rate).toFixed(2);
    countries = await getCountries(to)
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
}

convertCurrency('USD', 'COP', 12).then((message) => {
    console.log(message);
}).catch((e) => console.log(e.message))



// http://data.fixer.io/api/latest?access_key=6edf5f48c7871ec8522239b3f94396ee

// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=6edf5f48c7871ec8522239b3f94396ee').then((response) => {
//         const euro = 1/ response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name)
//     })
// }

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to)
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(', ')}`;
//     });
// }

// getExchangeRate('USD', 'CAD').then((rate) => {
//     console.log(rate);
// })

// getCountries('CAD').then((name) => console.log(name))