const workercode = () => {

    onmessage = function (event) {
        console.log('Number of prices to fetch received from the main thread:', event.data);
        postMessage(getSortedPrices(event.data));
    };

    // randomly generate eth prices and gas fee to imitate price fetch from different DEXs
    function generatePrices(num) {

        const ethereumPriceRange = { min: 1000, max: 4000 };
        const gasFeeRange = { min: 20, max: 1000 };

        const prices = [];

        for (let i = 0; i < num; i++) {
            let ethPrice = Math.random() * (ethereumPriceRange.max - ethereumPriceRange.min) + ethereumPriceRange.min;
            let gasFee = Math.random() * (gasFeeRange.max - gasFeeRange.min) + gasFeeRange.min;
            gasFee *= ethPrice * 0.000000001;

            prices.push({ ethPrice, gasFee });
        }
        return prices;
    }

    // return sorted randomly generated prices
    function getSortedPrices(num) {
        const prices = generatePrices(num);

        prices.sort((a, b) => {
            return (a.ethPrice + a.gasFee) - (b.ethPrice + b.gasFee)
        });

        return prices;
    }
}

// encode worker code to make it accessible in js
let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;

