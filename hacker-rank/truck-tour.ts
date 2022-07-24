"use strict";

/*
 Suppose there is a circle. There are N petrol pumps on that circle.
 Petrol Pumps are numbered 0 to (N-1) (both inclusive). 
 You have two pieces of information corresponding to each petrol pumps
  (1) The amount of petrol that petrol pump will give 
  (2) The distance from that petrol pump to the next petrol pump

 Initially, you have a tank of infinite capacity carrying no petrol. 
 You can start the tour at any of the petrol pumps. 
 Calculate the first point from where the truck will be able to complete the circle.

 Consider that the truck will stop at each of the petrol pumps.
 The truck will move one kilometer for each litre of the petrol


*/

function truckTour(petrolpumps: number[][]): number {

  let startIndex = 0;
  let backWardsTanks = 0;
  for (; startIndex < petrolpumps.length; startIndex++) {

    /// if the
    const netFuel = petrolpumps[startIndex][0] - petrolpumps[startIndex][1];
    if (!(netFuel < 0)) {

    let forwardTank = 0;

    for (let j = startIndex; j < petrolpumps.length; j++) {
      forwardTank += petrolpumps[j][0] - petrolpumps[j][1];
      if (forwardTank <= 0) {
        break;
      }
    }

    // const forwardTank = netFuels.slice(k).reduce((a, b) => a+b);
    // console.log("current index: ", startIndex);
    // console.log("Forward Tank::: ", forwardTank);
    // console.log("Backwards Tank:: ", backWardsTanks);
    if (forwardTank > Math.abs(backWardsTanks)) {
      break;
    }
    }

    backWardsTanks += netFuel;
  }

  return startIndex;
}

console.log(
  truckTour([
    [1, 5],
    [6, 5],
    [3, 4],
    [10, 3],
  ])
);
