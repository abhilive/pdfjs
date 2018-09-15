/*Function implementation*/
this.temp = 12;

const testerObj = {
    funct1: function() {
        console.log('funct1', this);
    },

    funct2: () => {
        console.log('funct2', this);
    }
}
testerObj.funct1();
testerObj.funct2();
/* Use of arrow functions */
const square = (a) => a*a;
console.log(square(10));
console.log([1, 2, 3].map(a => a*a));