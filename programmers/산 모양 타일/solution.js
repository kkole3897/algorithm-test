function solution(n, tops) {
  const USED_PREV_INDEX = 0;
  const USED_NEXT_INDEX = 1;
  const MOD = 10007;

  const dp = new Array(n).fill(0).map(() => {
    return [0, 0];
  });
  if (hasTop(tops, 0)) {
    dp[0][USED_PREV_INDEX] = 1;
    dp[0][USED_NEXT_INDEX] = 3;
  } else {
    dp[0][USED_PREV_INDEX] = 1;
    dp[0][USED_NEXT_INDEX] = 2;
  }

  for (let i = 1; i < n; i++) {
    if (hasTop(tops, i)) {
      dp[i][USED_PREV_INDEX] =
        (dp[i - 1][USED_PREV_INDEX] + dp[i - 1][USED_NEXT_INDEX]) % MOD;
      dp[i][USED_NEXT_INDEX] =
        (dp[i - 1][USED_PREV_INDEX] * 2 + dp[i - 1][USED_NEXT_INDEX] * 3) % MOD;
    } else {
      dp[i][USED_PREV_INDEX] =
        (dp[i - 1][USED_PREV_INDEX] + dp[i - 1][USED_NEXT_INDEX]) % MOD;
      dp[i][USED_NEXT_INDEX] =
        (dp[i - 1][USED_PREV_INDEX] + dp[i - 1][USED_NEXT_INDEX] * 2) % MOD;
    }
  }

  const answer =
    (dp[n - 1][USED_PREV_INDEX] + dp[n - 1][USED_NEXT_INDEX]) % MOD;
  return answer;
}

function hasTop(tops, index) {
  const HAS_TOP_VALUE = 1;

  return tops[index] === HAS_TOP_VALUE;
}
