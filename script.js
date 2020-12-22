'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Joshua Gulledge',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Bethany Hampton',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Ted Hampton',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Janet Hampton',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const euroToUSD = 1.23;

const displayMovements = function (cashFlow) {
  containerMovements.innerHTML = '';
  cashFlow.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplayBal = function (account) {
  account.balance = account.movements.reduce(
    (totalValue, individualAmount) => totalValue + individualAmount,
    0
  );

  labelBalance.textContent = `${account.balance}€`;
};

const calDisplaySummary = function (cashFlow) {
  const totalDeposit = cashFlow
    .filter(amount => amount > 0)
    .reduce((totalAmount, amount) => totalAmount + amount, 0);
  labelSumIn.textContent = `${totalDeposit}€`;

  const totalWithdrawal = cashFlow
    .filter(amount => amount < 0)
    .reduce((totalAmount, amount) => totalAmount + amount, 0);
  labelSumOut.textContent = `${Math.abs(totalWithdrawal)}€`;

  const Interest = cashFlow
    .filter(amount => amount > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(interstAmount => interstAmount >= 1)
    .reduce((totalAmount, amount) => totalAmount + amount, 0);
  labelSumInterest.textContent = `${Interest}€`;
  console.log(currentAccount.interestRate);
};

// const user = account1.owner;
// refer back to video 148
const getUserName = function (accountsarr) {
  // accountsarr is an array of all the account objects
  accountsarr.forEach(function (acc) {
    // for each object(value) in the array passed into it--
    // --we use this function
    acc.userName = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
    // Here we created a new value in the individual --
    // --object we are working in.
  });
};
getUserName(accounts);

function updatingUI() {
  displayMovements(currentAccount.movements);
  calDisplaySummary(currentAccount.movements);
  calDisplayBal(currentAccount);
}

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // check to see if account exist
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // the ? makes it so it doesnt read this if the account is undefined
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(`Log in achieved`);

    // display welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // display cashflow and summary for account
    updatingUI();
    // ----------------
  } else {
    console.log(`log in not achieved`);
    labelWelcome.textContent = `Account Not Found`;
    containerApp.style.opacity = 0;
  }
  // console.log(currentAccount);
});

const transferMoney = btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciever = accounts.find(
    name =>
      name.userName === inputTransferTo.value ||
      name.owner === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciever &&
    amount < currentAccount.balance &&
    reciever.userName !== currentAccount.userName
  ) {
    console.log(`You may proceed`);
    currentAccount.movements.push(-amount);
    reciever.movements.push(amount);
    updatingUI();
  } else if (amount > 0 && amount >= currentAccount.balance) {
    console.log(`Insufficient funds to proceed`);
  } else if (amount === 0) {
    console.log(`Can not tranfer ${amount}.`);
  } else {
    console.log(`You can not transfer to yourself or to an unkown account`);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
  console.log(reciever.owner, amount);
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

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
