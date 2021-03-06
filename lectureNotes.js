'use strict';

// -------------Lecture Notes from 11-Arrays--------

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// filter() uses a boolean value to put items into a new array
const deposits = movements.filter(amount => amount > 0);
// .filter(function(amount) {return amount > 0 //true or false})
const withdraws = movements.filter(amount => amount < 0);

console.log(withdraws);
console.log(deposits);

// with reduce its first argument is the accumulator or total value. It returns--
// -- a single value and not an array.
// this method must have two argumnets. the call back func and the initial value --
// -- of the accumulator. Here its 0.
const balance = movements.reduce(
  (accumulator, value) => accumulator + value,
  0
);
// .reduce(function(accumulator, value) {return accumulator + value}, 0)

console.log(balance);

*/

/*



// const account1USD = account1.movements.map(function (euroAmount) {
//   return euroAmount * euroToUSD;
// });

const account1USD = account1.movements.map(
  euroAmount => euroAmount * euroToUSD
);

// () => euroAmount * euroToUSD

let counter = 0;
for (let value of account1.movements) {
  console.log(value, 'converted:', account1USD[counter]);
  counter++;
}

// const cashFlow2 = account1USD.map((amount, i, arr) => {
//   if (amount > 0) {
//     return `Movement ${i + 1} is to deposit ${amount}`;
//   } else if (amount < 0) {
//     return `Movement ${i + 1} is to withdraw ${amount} `;
//   }
// });

const cashFlow2 = account1USD.map(
  (amount, i) =>
    `Movement ${i + 1} is to ${amount > 0 ? 'deposit' : 'withdrew'} ${Math.abs(
      amount
    )}`
);

console.log(cashFlow2);

*/

/*

let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// slice returns a new array and doesnt effct the orignal

console.log(arr.slice(2));

// first is the start index which will go to the end of the array

console.log(arr.slice(2, 6));

// or we can define both start and end-
// -end is NOT included

console.log(arr.slice(-2));

// when we put a - it starts at the end

console.log(arr.slice());

// this creates a copy of the whole array
console.log(arr);

// splice does change the original array

// console.log(arr.splice(2));
// console.log(arr);

// usually used to get rid of last element

arr.splice(-1);
console.log(arr);

// first argument is start point, second is number of elements

arr.splice(1, 3);
console.log(arr);

const arr2 = ['a', 'u', 'h', 's', 'o', 'j'];
arr2.reverse();
console.log(arr2);

*/

/*


let accountTotal = 0;
// for (const cashFlow of movements) {
// for (const [i, value] of movements.entries()) {
//   if (value > 0) {
//     console.log(`${i + 1}: You deposited ${value} dollars into your account.`);
//   } else if (value < 0) {
//     console.log(
//       `${i + 1}: You withdrew ${Math.abs(value)} dollars from your account.`
//     );
//   }
//   accountTotal += value;
//   console.log(`Your account is now at ${accountTotal} dollars.`);
// }

// we can use the element the index and the array in that order if we want.
movements.forEach(function (cashFlow, index) {
  if (cashFlow > 0) {
    console.log(
      `${index + 1}: You deposited $${cashFlow} dollars into your account.`
    );
  } else if (cashFlow < 0) {
    console.log(
      `${index + 1}: You withdrew $${Math.abs(
        cashFlow
      )} dollars from your account.`
    );
  }
  accountTotal += cashFlow;
  console.log(`Your account is now at $${accountTotal} dollars.`);
});

// -----------CODING CHALLENGE #1------------


1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

const codingChallenge1 = function (juliaarr, katearr) {
  console.log(`Array One: ${juliaarr} \nArray Two: ${katearr}`);

  const juliasCopy = juliaarr.slice(1, 3);
  console.log(juliasCopy);
  const combinedArr = [...juliasCopy, ...katearr];
  // const combinedArr = juliasCopy.concat(katearr);
  combinedArr.forEach(function (dogsAge, i) {
    dogsAge >= 3
      ? console.log(`Dog ${i + 1}: Adult`)
      : console.log(`Dog ${i + 1}: Puppy`);
  });
};

*/

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// for each arguments are 1: value, 2: key, 3: map

// currencies.forEach(function (value, key, map) {
//   console.log(`The ${value} is abbrevieated with ${key}. `);
// });

// -----------CODING CHALLENGE #2------------

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (agesArr) {
  const humanAge = agesArr.map(age => (age <= 2 ? age * 2 : 16 + age * 4));
  const adults = humanAge.filter(newHumanAge => newHumanAge >= 18);
  const adultAverageAge = adults.reduce(
    (averageAge, eachAge) => (averageAge += eachAge),
    0
  );
  return adultAverageAge / adults.length;
};

// -----------CODING CHALLENGE #3------------

// const calcAverageHumanAge = function (agesArr) {
//   const humanAge = agesArr
//     .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter(newHumanAge => newHumanAge >= 18)
//     .reduce(
//       (averageAge, eachAge, i, arr) => (averageAge += eachAge / arr.length),
//       0
//     );
//   return humanAge;
// };


console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

*/

// -----------CODING CHALLENGE #4------------

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
*/

// TEST DATA:

/*

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//  ---- 1
dogs.forEach(
  eachdog => (eachdog.recommendedFood = eachdog.weight ** 0.75 * 28)
);

// ---- 2
const sarahsDog = dogs.find(ownerName => ownerName.owners.includes('Sarah'));

// if (
//   dogsObject.curFood > dogsObject.recommendedFood * 0.9 &&
//   dogsObject.curFood < dogsObject.recommendedFood * 1.1
// ) {
//   console.log(`eats adequate amout`);
// } else if (dogsObject.curFood < dogsObject.recommendedFood * 0.9) {
//   console.log(`Eats to little`);
// } else if (dogsObject.curFood > dogsObject.recommendedFood * 1.1) {
//   console.log(`Eats to much`);
// } else {
//   console.log(`Something went wrong`);
// }

const dogsThatEatToMuch = dogs
  .filter(eachDog => eachDog.curFood > eachDog.recommendedFood * 1.1)
  .map(wewantall => wewantall.owners)
  .flat()
  .join(' and ');

console.log(`${dogsThatEatToMuch}'s dogs eat too much`);

const dogsThatEatToLittle = dogs
  .filter(eachDog => eachDog.curFood < eachDog.recommendedFood * 0.9)
  .map(all => all.owners)
  .flat()
  .join(' and ');
console.log(`${dogsThatEatToLittle}'s dogs don't eat enough`);

const dogEatsEnough = dogs
  .filter(
    eachdog =>
      eachdog.curFood > eachdog.recommendedFood * 0.9 &&
      eachdog.curFood < eachdog.recommendedFood * 1.1
  )
  .map(x => x.owners)
  .join('');

console.log(dogEatsEnough);
*/
