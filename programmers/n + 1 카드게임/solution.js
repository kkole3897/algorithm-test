function solution(coin, cards) {
  let answer = 0;

  let cardsOnHand = cards.slice(0, cards.length / 3);
  let remainCards = cards.slice(cards.length / 3);
  let bonusCards = [];
  let remainCoin = coin;
  const targetNum = cards.length + 1;

  while (true) {
    answer += 1;
    if (remainCards.length === 0) {
      break;
    }

    const newCards = remainCards.slice(0, 2);
    bonusCards = [...bonusCards, ...newCards];
    remainCards = remainCards.slice(2);

    const matchedCardsOnHand = getMatchedCards(cardsOnHand, targetNum);
    if (matchedCardsOnHand.length > 0) {
      cardsOnHand = cardsOnHand.filter(
        (card) => !matchedCardsOnHand.includes(card)
      );
      continue;
    }
    if (remainCoin === 0) {
      break;
    }
    const matchedCards = getMatchedCardsBetweenHandAndBonus(
      cardsOnHand,
      bonusCards,
      targetNum
    );
    if (matchedCards.length > 0) {
      remainCoin -= 1;
      cardsOnHand = cardsOnHand.filter((card) => !matchedCards.includes(card));
      bonusCards = bonusCards.filter((card) => !matchedCards.includes(card));
      continue;
    }
    if (remainCoin === 1) {
      break;
    }
    const matchedCardsOnBonus = getMatchedCards(bonusCards, targetNum);
    if (matchedCardsOnBonus.length === 0) {
      break;
    }
    remainCoin -= 2;
    bonusCards = bonusCards.filter(
      (card) => !matchedCardsOnBonus.includes(card)
    );
  }

  return answer;
}

function getMatchedCards(cards, targetNum) {
  for (const card of cards) {
    if (cards.includes(targetNum - card)) {
      return [card, targetNum - card];
    }
  }

  return [];
}

function getMatchedCardsBetweenHandAndBonus(
  cardsOnHand,
  bonusCards,
  targetNum
) {
  for (const bonus of bonusCards) {
    if (cardsOnHand.includes(targetNum - bonus)) {
      return [bonus, targetNum - bonus];
    }
  }

  return [];
}
