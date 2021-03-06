'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Joshua Gulledge',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2020-01-18T21:31:17.178Z',
    '2020-04-23T07:42:02.383Z',
    '2020-08-28T09:15:04.904Z',
    '2020-10-01T10:17:24.185Z',
    '2020-11-08T14:11:59.604Z',
    '2020-11-26T17:01:17.194Z',
    '2020-12-20T23:36:17.929Z',
    '2020-12-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'it-IT', // de-DE
};

const account2 = {
  owner: 'Bethany Hampton',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Ted Hampton',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-04-01T10:17:24.185Z',
    '2020-02-05T16:33:06.386Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'CNY',
  locale: 'zh-CN', // de-DE
};

const account4 = {
  owner: 'Janet Hampton',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
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

const formatMovementDate = function (theDay, locale) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), theDay);

  if (daysPassed === 0) return `Today`;
  else if (daysPassed === 1) return `Yesterday`;
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(theDay);
    // const year = theDay.getFullYear();
    // const month = `${theDay.getMonth() + 1}`.padStart(2, 0);
    // const date = `${theDay.getDate()}`.padStart(2, 0);
    // return `${month}/${date}/${year}`;
  }
};

let currentAccount;
let timer;

const formatCurr = function (value) {
  const newCurr = new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
  }).format(value);
  return newCurr;
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const sortedCashFlow = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  sortedCashFlow.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const dateDisplay = formatMovementDate(date, acc.locale);

    const formattedMovement = formatCurr(mov);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date"> ${dateDisplay}</div>
    <div class="movements__value">${formattedMovement}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calDisplayBal = function (account) {
  account.balance = account.movements.reduce(
    (totalValue, individualAmount) => totalValue + individualAmount,
    0
  );
  const formattedbalance = formatCurr(account.balance);

  labelBalance.textContent = formattedbalance;
};

const calDisplaySummary = function (cashFlow) {
  const totalDeposit = cashFlow
    .filter(amount => amount > 0)
    .reduce((totalAmount, amount) => totalAmount + amount, 0);
  labelSumIn.textContent = formatCurr(totalDeposit);

  const totalWithdrawal = cashFlow
    .filter(amount => amount < 0)
    .reduce((totalAmount, amount) => totalAmount + amount, 0);
  labelSumOut.textContent = formatCurr(Math.abs(totalWithdrawal));

  const interest = cashFlow
    .filter(amount => amount > 0)
    .map(deposit => (deposit * currentAccount.interestRate) / 100)
    .filter(interstAmount => interstAmount >= 1)
    .reduce((totalAmount, amount) => totalAmount + amount, 0);
  labelSumInterest.textContent = formatCurr(interest);
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
  displayMovements(currentAccount);
  calDisplaySummary(currentAccount.movements);
  calDisplayBal(currentAccount);
}

const logOutTimer = function () {
  const startTimer = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Please log back in...';
    }
    time--;
  };

  let time = 240;
  startTimer();
  const timer = setInterval(startTimer, 1000);
  return timer;
};

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // check to see if account exist
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // the ? makes it so it doesnt read this if the account is undefined
  if (currentAccount?.pin === +inputLoginPin.value) {
    // display welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    clearInterval(timer);
    timer = logOutTimer();

    const now = new Date();

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // display cashflow and summary for account
    updatingUI();
    // ----------------
  } else {
    labelWelcome.textContent = `Account Not Found`;
    containerApp.style.opacity = 0;
  }
  // console.log(currentAccount);
});

const transferMoney = btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const reciever = accounts.find(
    name =>
      name.userName === inputTransferTo.value ||
      name.owner === inputTransferTo.value
  );

  if (
    // if loan is valid

    amount > 0 &&
    reciever &&
    amount < currentAccount.balance &&
    reciever.userName !== currentAccount.userName
  ) {
    // push tranfer to both arrays

    currentAccount.movements.push(-amount);
    reciever.movements.push(amount);

    // push date to both arrays

    currentAccount.movementsDates.push(new Date().toISOString());
    reciever.movementsDates.push(new Date().toISOString());

    labelWelcome.textContent = `Transfer Complete`;

    updatingUI();

    // clear trasfer fields

    inputTransferAmount.value = inputTransferTo.value = '';

    // reset timer
    clearInterval(timer);
    logOutTimer();
  } else if (amount > 0 && amount >= currentAccount.balance) {
    labelWelcome.textContent = `Insufficient funds to proceed`;
  } else if (amount === 0) {
    labelWelcome.textContent = `Can not tranfer ${amount}.`;
  } else {
    labelWelcome.textContent = `You can not transfer to yourself or to an unkown account`;
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    // check to make sure its user

    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    labelWelcome.textContent = 'Close Account Accepted';

    // delete user object inside array

    const deletionIndex = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    accounts.splice(deletionIndex, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  } else {
    labelWelcome.textContent = `Username or Pin Incorrect`;
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanRequest = Math.floor(inputLoanAmount.value);
  if (
    // check if loan is valid

    loanRequest > 0 &&
    currentAccount.movements.some(amount => amount >= loanRequest * 0.1)
  ) {
    // wait for loan to be approved

    setTimeout(function () {
      labelWelcome.textContent = `Loan approved`;

      // push loan to array

      currentAccount.movements.push(loanRequest);

      // push date of loan to array

      currentAccount.movementsDates.push(new Date().toISOString());
      updatingUI();
    }, 3500);

    // clear loan field

    inputLoanAmount.value = '';

    // reset timer
    clearInterval(timer);
    logOutTimer();
  } else {
    labelWelcome.textContent = `Loan not approved`;
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// ----------Notes from section 12----------

// ---Creating Dates---

/*
const now = new Date();
console.log(now);
// ^ current date and time
const myBirthday = new Date('March 21, 1989 09:25');
console.log(myBirthday);
// ^ set a day and time

console.log(new Date(account1.movementsDates[1]));
// ^ from an array, tricky, use if js created to begin with

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
// the month is 0 based: 0 => Jan, 1 => Feb ...

console.log(new Date(2024, 2, 21, 14, 32));
// ^ set with arguments (year, month, day, hour, minute, secons)


// ---Working with Dates---
const futureDate = new Date(2024, 2, 21, 14, 32);
console.log(futureDate);
console.log(futureDate.getFullYear());
console.log(futureDate.getMonth());
console.log(futureDate.getDate());
console.log(futureDate.getDay());
// ^ day of the week with sunday as 0
console.log(futureDate.getHours());
console.log(futureDate.getMinutes());
console.log(futureDate.getSeconds());
console.log(futureDate.toISOString());
console.log(futureDate.getTime());
// ^ time stamp is time from new Date(0) unitl ...
console.log(new Date(1711049520000));
console.log(Date.now());
// ^ gives us the current time stamp

*/

/*

// console.log(Number('23'));
// console.log(+'23');
// // same thing ^

console.log(Number.parseInt('24px', 10));
// ^ this gets number from a string, if it STARTS with a number;
// second argument is the number system we are using, mostly base 10
console.log(Number.parseInt('e24', 10));
// ^ this will not work and gives you NaN
console.log(Number.parseFloat('2.5rem'));
// ^ uses for decimal numbers
console.log(Number.parseInt('2.5rem'));
// ^ stops at decimal number
console.log(Number.isFinite(23));
console.log(Number.isFinite('23'));
//  ^ good way to check if something is a number => booleans
console.log(Number.isInteger(23));
console.log(Number.isInteger('23'));

// square root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
// ^ both do the same thing
console.log(8 ** (1 / 3));
// ^ how to get the cubic root

console.log(Math.max(2, 6, 22, 34, 12, 8));
console.log(Math.max('2', 6, 22, '34', 12, 8));
// ^ does type coersion
console.log(Math.min(2, 6, 22, 34, 12, 8));
console.log(Math.min('2', 6, 22, '34', 12, 8));

const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};
console.log(randomInt(10, 20));
console.log(randomInt(1, 5));

*/
