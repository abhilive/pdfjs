const theOneFunc = delay => {
    console.log('Hello after ' +delay+ ' seconds');
};
//Hello after 4 ms
setTimeout(theOneFunc, 4 * 1000, 4);
//Hello after 8 ms
setTimeout(theOneFunc, 8 * 1000, 8);

/* */
const myFunc = () => {
    console.log(this);
}