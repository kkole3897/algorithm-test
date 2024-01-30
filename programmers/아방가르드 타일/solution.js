function solution(n) {
  const MOD = 1_000_000_007;

  const dp = Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 3;
  dp[3] = 10;

  const cache = [dp[2] * 2 + dp[1] * 2, 0, dp[1] * 2];
  const unique = [4, 2, 2];

  for (let i = 4; i <= n; i++) {
    const remainder = i % 3;
    dp[i] =
      (dp[i - 1] +
        2 * dp[i - 2] +
        5 * dp[i - 3] +
        cache[remainder] +
        unique[remainder]) %
      MOD;
    cache[remainder] += (dp[i - 1] * 2 + dp[i - 2] * 2 + dp[i - 3] * 4) % MOD;
  }

  return dp[n];
}
