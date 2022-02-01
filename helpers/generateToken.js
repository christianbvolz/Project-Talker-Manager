// https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details 

const rand = () => Math.random().toString(36).substr(2);

const generateToken = () => (rand() + rand()).slice(0, 16);

console.log(generateToken());
module.exports = generateToken;