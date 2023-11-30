import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import DealerTwoModal from '../modals/DealerTwoModal';
import redMaze from '../../../assets/blackjack/images/redMaze.svg';
import {
  newDeal,
  newStand,
  playerStand,
  shuffleToggle,
} from '../../../features/blackjack/blackjackSlice';

interface CardProps {
  image: string;
  code: string;
  value: string;
}

interface BlackJackProps {
  result: any;
  cardCount: number;
  cardValue: string[];
  stand: boolean;
  refetch: any;
  dispatch: any;
  cardMax: number;
  handleDealerIncrement: any;
}

const LandscapeDealer = ({
  result,
  cardValue,
  cardCount,
  handleDealerIncrement,
  stand,
  refetch,
  dispatch,
  cardMax,
}: BlackJackProps) => {
  let sum = 0;
  let sum2 = 0;

  const shuffleDeal = () => {
    dispatch(shuffleToggle());
    dispatch(newDeal());
  };

  useEffect(() => {
    dispatch(playerStand());
  }, [stand]);

  useMemo(
    () => cardValue.slice(0, 2).map((num: string) => (sum += Number(num))),
    [cardCount, cardValue, stand, cardMax]
  );
  useMemo(
    () =>
      cardValue
        .slice(cardCount, cardMax)
        .map((num: string) => (sum2 += Number(num))),
    [cardCount, cardValue, stand, cardMax]
  );

  // Cards total
  let sum3 = (sum += sum2);

  // ACES 11 or 1
  function checkEleven(age: any) {
    return age > 10;
  }

  const cardsDelt = cardValue.slice(0, 2).filter(checkEleven);

  const cardsDrawn = cardValue.slice(cardCount, cardMax).filter(checkEleven);

  function elevenAce() {
    if (sum3 > 21) {
      return (sum3 -= 10);
    }
  }
  useMemo(() => {
    cardsDelt.forEach(elevenAce);
  }, [cardCount, cardMax, cardsDelt]);
  useMemo(() => {
    cardsDrawn.forEach(elevenAce);
  }, [cardCount, cardMax, cardsDrawn]);
  // ACES 11 or 1 - END

  const secondCard = result.cards.slice(1, 2).map((item: CardProps) => (
    <li className="z-20 -mr-10 lg:-mr-16">
      <motion.img
        src={item.image}
        alt={item.code}
        key={item.code}
        className="h-32 lg:h-52 tall3x:h-72"
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'tween',
          delay: 0.6,
          duration: 0.3,
        }}
      />
    </li>
  ));

  const remainingCards = result.cards
    .slice(cardCount, cardMax)
    .map((item: CardProps) => (
      <li className="z-30 -mr-10 lg:-mr-16">
        <motion.img
          src={item.image}
          alt={item.code}
          key={item.code}
          className="h-32 lg:h-52 tall3x:h-72"
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'tween',
            delay: 0.4,
            duration: 0.3,
          }}
        />
      </li>
    ));

  return (
    <div className="mt-[45.25px] flex justify-between px-12">
      <div className="flex justify-start">
        {/* Card one index zero[0] */}
        <div className="-mr-10 flex lg:-mr-16">
          <motion.img
            src={redMaze}
            alt="..."
            className="z-0 h-32 lg:h-52 tall3x:h-72"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'tween',
              delay: 0.2,
              duration: 0.3,
            }}
          />
          {stand &&
            result.cards.slice(0, 1).map((item: CardProps) => (
              <motion.img
                src={item.image}
                alt={item.code}
                key={item.code}
                className={`absolute -mr-10 h-32 lg:-mr-16 lg:h-52 tall3x:h-72 ${
                  stand && 'z-10'
                }`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'tween',
                  delay: 0.3,
                  duration: 0.3,
                }}
              />
            ))}
        </div>
        {/* Card two index one[1] */}
        {result === null ? (
          'loading'
        ) : (
          <ul className="flex flex-row">{secondCard}</ul>
        )}
        {/* Drawn Cards */}
        {stand ? <ul className="flex flex-row">{remainingCards}</ul> : null}
      </div>

      {/* Buttons */}
      <div className="align-center flex flex-col">
        {sum3 <= 21 ? (
          <p className="mb-auto w-40 self-center text-center text-2xl text-white lg:text-3xl">
            {stand && sum3 > 0 ? sum3 : '--'}
          </p>
        ) : (
          <DealerTwoModal sum3={sum3} />
        )}
        {stand && sum3 < 18 ? (
          <button
            className="click mt-auto h-8 w-40 self-center rounded bg-yellow-500 px-4 font-bold text-white"
            type="button"
            onClick={handleDealerIncrement}
          >
            Must Hit
          </button>
        ) : null}
        {stand && sum3 > 17 ? (
          <button
            className="click mt-auto h-8 w-40 self-center rounded bg-green-700 px-4 font-bold text-white hover:bg-green-700"
            type="button"
            onClick={() => {
              dispatch(newStand());
              refetch();
              setTimeout(shuffleDeal, 400);
            }}
          >
            New Game?
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default LandscapeDealer;
