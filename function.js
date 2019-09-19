const axios = require('axios');

const getBitRate = async (currency_code) => {
    try {
        let rate_object = await axios.get(`https://bitpay.com/api/rates/BTC/${currency_code}`);
        return rate_object.data.rate;
    } catch (error) {
        console.log('Can Not Find Rate From Source 1');

    }
};

const getBitRate2 = async (currency_code) => {
    try {
        let rate_object = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=${currency_code}`);
        return eval('rate_object.data.'+currency_code);
    } catch (error) {
        console.log('Can Not Find Rate From Source 2');

    }
};

const getCountryCurrency = async (country_code) => {
    try {
        let country_object = await axios.get(`http://country.io/currency.json`);
        return eval('country_object.data.'+country_code);
    } catch (error) {
        console.log('Can Not Find Country Currency');
    }
};


const getCountryCode = async (address) => {
    try {
        let code_object = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyB7b56t3nf1khPW6YFPSIXZHY55-c7g5Pk`);
        var list_add = code_object.data.results[0].address_components;

        for ( i = 0; i< list_add.length; i++) {
            if (list_add[i].types[0] === "country") {
              var country_code = list_add[i].short_name;
            }
        }
        return country_code;
    } catch (error) {
        console.log('Country Not Valid');
    }
};



var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

var checkSpecialChar = function(string){
    for(i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return true
        }
    }
    return false;
};


module.exports = {
    getBitRate,
    getBitRate2,
    getCountryCurrency,
    getCountryCode,
    checkSpecialChar
};
