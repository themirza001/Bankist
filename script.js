'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mirza Atif',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-19T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2023-11-28T23:36:17.929Z',
    '2023-11-30T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-GB', // de-DE
};

const account2 = {
  owner: 'Ayush shukla',
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
  owner: 'Abdullah',
  movements: [500, 3400, -150, -790, -3210, -1000, 8500, 3000],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2023-11-29T18:49:59.371Z',
    '2023-07-30T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const accounts = [account1, account2, account3];

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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
const euroToUSD = 1.1;
const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); //subtracted dates guves millisecond diff bw them,hence we need to convert ms to s then to m hours to day
  const daysPassed = Math.floor(calcDaysPassed(new Date(), date));
  console.log(daysPassed);
  if (daysPassed == 0) return 'Today';
  else if (daysPassed == 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} Days Ago.`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return Intl.DateTimeFormat(locale).format(date);
  }
};
const convertToINR = function (amount) {
  const options = {
    style: 'currency',
    currency: `${currAccount.currency}`,
  };
  return `${new Intl.NumberFormat(navigator.language, options).format(
    amount.toFixed(2)
  )}`;
};
const displayMovements = function (accnts, sort = false) {
  const movements = accnts.movements;
  containerMovements.innerHTML = '';

  const movDuplicate = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;
  movDuplicate.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const now = new Date(accnts.movementsDates[i]);
    const displayDate = formatMovementsDate(now, currAccount.locale);
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">
      ${i + 1} ${type}
    </div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${convertToINR(mov)}</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const calcDisplayBalance = function (currAcc) {
  currAcc.balance = currAcc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${currAcc.balance.toFixed(2)}.`;
  // const options = {
  //   style: 'currency',
  //   currency: 'INR',
  // };
  // labelBalance.textContent = `${new Intl.NumberFormat('en-IN', options).format(
  //   currAcc.balance.toFixed(2)
  // )}`;
  labelBalance.textContent = convertToINR(currAcc.balance);
};
const calcDisplaySummary = function (movements) {
  const currMovement = movements.movements;
  const income = currMovement
    .filter(currVal => currVal > 0)
    .reduce((acc, currVal) => acc + currVal, 0);
  const outGoing = currMovement
    .filter(currVal => currVal < 0)
    .reduce((acc, currVal) => acc + currVal, 0);
  const interest = currMovement
    .filter(currVal => currVal > 0)
    .map(currVal => currVal * (movements.interestRate / 100))
    .filter(currVal => currVal >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumIn.textContent = `${convertToINR(income)}`;
  const val = console.log(Number(convertToINR(outGoing)));
  labelSumOut.textContent = `${convertToINR(Math.abs(outGoing))}`;
  labelSumInterest.textContent = `${convertToINR(interest)}`;
};
const createUserNames = function (accnts) {
  accnts.forEach(function (accnt) {
    accnt.userName = accnt.owner
      .toLowerCase()
      .split(' ')
      .map(currName => currName[0])
      .join('');
  });
};
createUserNames(accounts);

const updateUI = function (currAccnt) {
  displayMovements(currAccnt);
  calcDisplayBalance(currAccnt);
  calcDisplaySummary(currAccnt);
};
const startLogOutTimer = function () {
  //set time to 5 minutes
  let timer = 300;
  const tick = function () {
    const minutes = String(Math.floor(timer / 60)).padStart(2, 0);
    const seconds = String(timer % 60).padStart(2, 0);
    labelTimer.textContent = `${minutes}:${seconds}`;
    if (timer === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Login to get Started`;
      containerApp.style.opacity = 0;
    }
    timer--;
  };
  //call the timer every seconds
  tick();
  //In each call,print the rem.time to the UI
  //when 0s,stop timer and log out user
  const timerFunc = setInterval(tick, 1000);
  return timerFunc;
};
// const deposit = movements.filter(val => val > 0);
// const withdrawals = movements.filter(val => val < 0);
let currAccount, currTimer;
// currAccount = account1;
// updateUI(currAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currAccount = accounts.find(
    accs => accs.userName === inputLoginUsername.value
  );
  // console.log(currAccount);
  if (currAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back,${
      currAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    updateUI(currAccount);
    //internationalizing way of adding dates
    if (currTimer) clearInterval(currTimer);
    currTimer = startLogOutTimer();
    //currAccount.style.opacity = 0;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    //below line fetches the language browser uses
    // const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currAccount.locale,
      options
    ).format(now);

    //Manual way of fromatting date
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}.${hour}:${minutes}`;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
  } else {
    alert('INVALID USERNAME OR PASSWORD');
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  setTimeout(function () {
    if (
      amount > 0 &&
      currAccount.movements.some(currVal => currVal >= amount * 0.1)
    ) {
      currAccount.movements.push(amount);
      currAccount.movementsDates.push(new Date().toISOString());
      updateUI(currAccount);
    } else {
      alert(
        "Sorry,We Can't process your Loan As you dont FullFill the Criteria of Our Bank"
      );
    }
  }, 3000);

  //if the user does make any transfer then timer function must restart
  if (currTimer) clearInterval(currTimer);
  currTimer = startLogOutTimer();
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (amount > currAccount.balance)
    alert('Sorry,You dont have Enough Balance to Transer');
  else if (
    amount > 0 &&
    currAccount.balance >= amount &&
    recieverAcc &&
    recieverAcc?.userName !== currAccount.userName
  ) {
    currAccount.movements.push(-amount);
    currAccount.movementsDates.push(new Date().toISOString());
    recieverAcc.movements.push(amount);
    recieverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currAccount);
    //if the user does make any transfer then timer function must restart
    if (currTimer) clearInterval(currTimer);
    currTimer = startLogOutTimer();
  } else if (!recieverAcc) alert(`User doesn't exist`);
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currAccount.userName === inputCloseUsername.value &&
    currAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      accnt => accnt.userName === currAccount.userName
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  } else {
    alert('We cant close the Account as no Such account Exist');
  }
});
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currAccount, !sorted);
  sorted = !sorted;
});

// const overAllAccntBalance = accounts
//   .map(accnt => accnt.movements)
//   .flat()
//   .reduce((acc, mov), acc + mov, 0);
const calcDaysPassed = (date1, date2) =>
  Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); //subtracted dates guves millisecond diff bw them,hence we need to convert ms to s then to m hours to day
