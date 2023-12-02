// // // // // const dogsJulia = [3, 5, 2, 12, 7];
// // // // // const dogsKate = [4, 1, 15, 8, 3];
// // // // // const checkDogs = function (dogsJulia, dogsKate) {
// // // // //   const updatedDogsJulia = dogsJulia.slice(1, dogsJulia.lenght - 1);
// // // // //   const combinedData = updatedDogsJulia.concat(dogsKate);
// // // // //   combinedData.forEach(function (age, i) {
// // // // //     if (age >= 3)
// // // // //       console.log(`"Dog number ${i + 1} is an adult, and is ${age} years old`);
// // // // //     else {
// // // // //       console.log(`"Dog number ${i + 1} is still a puppy 🐕`);
// // // // //     }
// // // // //   });
// // // // // };
// // // // // checkDogs(dogsJulia, dogsKate);
// // // // // const arr = [1, 2, 3, 4];
// // // // // const newArr = arr.map(val => val * 2);
// // // // // console.log(...newArr);
// // // // const ages = [5, 2, 4, 1, 15, 8, 3];
// // // // // const calcAverageHumanAge = function (ages) {
// // // // //   //   return ages.map(function (curr) {
// // // // //   //     if (curr <= 2) return 2 * curr;
// // // // //   //     else return 16 + curr * 4;
// // // // //   //   });
// // // // // };
// // // // const calcAverageHumanAge = ages =>
// // // //   ages
// // // //     .map(currVal => (currVal > 2 ? currVal * 4 + 16 : currVal * 2))
// // // //     .filter(currVal => currVal >= 18)
// // // //     .reduce(
// // // //       (acc, currVal, i, adultDogs) => acc + currVal / adultDogs.length,
// // // //       0
// // // //     );
// // // // const humanAge = calcAverageHumanAge(ages);
// // // // console.log(humanAge);
// // // // // const updated = humanAge.filter(curr => curr >= 18);
// // // // // console.log(updated);
// // // const arr =
// // //   Array.from({ length: 100 }, () => Math.trunc(Math.random() * 6)) + 1;
// // // console.log(arr);
// // const dogs = [
// //   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
// //   { weight: 8, curFood: 200, owners: ['Matilda'] },
// //   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
// //   { weight: 32, curFood: 340, owners: ['Michael'] },
// // ];
// // let ownersEatTooMuch = [];
// // let ownersEatTooLittle = [];
// // dogs.map(function (currObj) {
// //   //const currObj = curr;
// //   currObj.recFood = Math.trunc(currObj.weight ** 0.75 * 28);
// //   if (currObj.owners.includes('Sarah')) {
// //     if (
// //       currObj.food > currObj.recFood * 0.9 &&
// //       currObj.food < currObj.recFood * 1.1
// //     ) {
// //       console.log('Dog is eating fine');
// //     } else if (currObj.food < currObj.recFood * 0.9) {
// //       ownersEatTooLittle.push(currObj.owners);
// //     } else {
// //       ownersEatTooMuch.push(currObj.owners);
// //     }
// //   }
// // });
// // ownersEatTooLittle = ownersEatTooLittle.flat();
// // ownersEatTooMuch = ownersEatTooMuch.flat();
// // console.log(`${ownersEatTooMuch.join(' and')}'s dog eat too much.`);
// // console.log(`${ownersEatTooLittle.join(' and')}'s dog eat too little.`);

// // // dogs.map(function (currObj) {
// // //   //const currObj = curr;
// // //   //currObj.recFood = currObj.weight ** 0.75 * 28;
// // //   console.log(currObj);
// // // });
// // const now = new Date();
// // console.log(now);
// const num = 3888765.23;
// const options = {
//   style: 'currency',
//   currency: 'INR',
// };
// console.log(`new Intl.NumberFormat('en-IN', options).format(num)`);
setInterval(() => {
  const now = new Date();
  //console.log(now);
  console.log(
    `Current Time is ${now.getHours()}H:${now.getMinutes()}M:${now.getSeconds()}S`
  );
}, 1000);
