function solution(dice) {
  const n = dice.length;

  const filteredDice = new Array(n).fill(0).map(() => new Map());
  for (let i = 0; i < n; i++) {
    for (const diceNum of dice[i]) {
      const count = filteredDice[i].get(diceNum) ?? 0;
      filteredDice[i].set(diceNum, count + 1);
    }
  }

  const diceCombinations = getCombinations(
    new Array(n).fill(0).map((_, index) => index),
    n / 2
  );
  let maxWins = 0;
  let answer = [];
  for (let i = 0; i < diceCombinations.length / 2; i++) {
    const a = diceCombinations[i];
    const b = diceCombinations[diceCombinations.length - i - 1];
    const combA = [...a];
    const combB = [...b];

    let aSum = filteredDice[a.shift()];
    let bSum = filteredDice[b.shift()];
    while (a.length > 0) {
      const currentA = filteredDice[a.shift()];
      const currentB = filteredDice[b.shift()];

      const newASum = new Map();
      const newBSum = new Map();

      for (const [acc, countAcc] of aSum) {
        for (const [num, countNum] of currentA) {
          const newAcc = acc + num;
          const newCount = countAcc * countNum;
          const beforeCount = newASum.get(newAcc) ?? 0;
          newASum.set(newAcc, beforeCount + newCount);
        }
      }

      for (const [acc, countAcc] of bSum) {
        for (const [num, countNum] of currentB) {
          const newAcc = acc + num;
          const newCount = countAcc * countNum;
          const beforeCount = newBSum.get(newAcc) ?? 0;
          newBSum.set(newAcc, beforeCount + newCount);
        }
      }

      aSum = newASum;
      bSum = newBSum;
    }

    let aWin = 0;
    let bWin = 0;
    for (const [aNum, aCount] of aSum) {
      for (const [bNum, bCount] of bSum) {
        if (aNum === bNum) continue;
        if (aNum > bNum) {
          aWin += aCount * bCount;
        } else {
          bWin += aCount * bCount;
        }
      }
    }

    if (aWin > maxWins) {
      answer = combA;
      maxWins = aWin;
    }
    if (bWin > maxWins) {
      answer = combB;
      maxWins = bWin;
    }
  }

  return answer.map((value) => value + 1);
}

function getCombinations(array, n) {
  const results = [];

  if (n === 1) {
    return array.map((element) => [element]);
  }

  array.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombinations(rest, n - 1);
    const attached = combinations.map((combination) => [fixed, ...combination]);
    results.push(...attached);
  });

  return results;
}
