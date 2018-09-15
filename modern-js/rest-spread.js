const [ first, ...restOfItems ] = [10, 20, 30, 40];

const data = {
    temp1: '001',
    temp2: '002',
    firstName: 'John',
    lastName: 'Doe',
};

const { temp1, temp2, ...person } = data;

console.log('person:', person);
console.log('restOfItems:', restOfItems);

const newArray = [...restOfItems]; //shallow copy
console.log('newArray:', newArray);

const newObject = {
    ...person,
}; //shallow copy
console.log('newObject:', newObject);