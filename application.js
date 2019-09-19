const yargs = require('yargs');

const func = require('./function.js');


const argv = yargs
    .option({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Search for an address and return bit rate',
            string: true
        }
    })
    .help()
    .argv;



func.getCountryCode(argv.address).then((countrycode) => {

    if ( func.checkSpecialChar(argv.address)) {
        console.log("Address Should Not Contain Special Chars")
    }

    else if  (typeof(countrycode) === 'undefined') {
           console.log("Stop")
    }

    else
        func.getCountryCurrency(countrycode).then ((countrycurrency) => {
            func.getBitRate(countrycurrency).then( (bitrate1) => {
                func.getBitRate2(countrycurrency).then ((bitrate2) =>{

                    if (typeof(bitrate1) === 'undefined' || typeof(bitrate2) === 'undefined'){
                        console.log('Bit Rate Not Available')
                    }
                    else if (bitrate1 < bitrate2) {
                        console.log(`Place: ${argv.address}\nCurrency Code: ${countrycurrency}\nRate 1: ${bitrate1}\nRate 2: ${bitrate2}\nLower Rate: ${bitrate1}`);
                    }
                    else console.log(`Place: ${argv.address}\nCurrency Code: ${countrycurrency}\nRate 1: ${bitrate1}\nRate 2: ${bitrate2}\nLower Rate: ${bitrate2}`);
                })
            });
        })
    .catch((e) => {console.log(e)});
});
