function solution(n, money) {
  const dp = new Array(n + 1).fill(0).map((_, index) => {
    const remain = index % money[0];
    
    return remain === 0 ? 1 : 0;
  });
  
  for (const currency of money.slice(1)) {
    for (let i = currency; i <= n; i++) {
      dp[i] += dp[i - currency];
    }    
  }
  
  return dp[n] % 1_000_000_007;
}
