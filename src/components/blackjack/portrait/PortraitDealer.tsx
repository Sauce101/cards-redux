import { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import DealerOneModal from '../modals/DealerOneModal';
import redMaze from '../../../assets/blackjack/images/redMaze.svg';
import {
  newDeal,
  newStand,
  shuffleToggle,
  playerStand,
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
  handleDealerIncrement: any;
  cardMax: number;
}

const PortraitDealer = ({
  result,
  cardValue,
  handleDealerIncrement,
  stand,
  refetch,
  dispatch,
  cardCount,
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

  // eslint-disable-next-line consistent-return
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
    <li className="z-20 -mr-28 tall2x:-mr-36">
      <motion.img
        src={item.image}
        alt={item.code}
        key={item.code}
        className="tall:h-44 tall2x:h-56 tall3x:h-64 tall4x:h-80"
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
      <li className="z-30 -mr-28 tall2x:-mr-36">
        <motion.img
          src={item.image}
          alt={item.code}
          key={item.code}
          className="tall:h-44 tall2x:h-56 tall3x:h-64 tall4x:h-80"
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
    <div className="mt-[45.25px] grid w-full grid-flow-col grid-rows-3 gap-2">
      <div className="row-span-2">
        <div className="flex flex-row px-12">
          {/* Card One index Zero[0] */}
          <div className="-mr-28 flex tall2x:-mr-36">
            <motion.img
              src={`${redMaze}`}
              alt="..."
              className=" z-0 tall:h-44 tall2x:h-56 tall3x:h-64 tall4x:h-80"
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
                  className={`absolute -mr-28 tall:h-44 tall2x:-mr-36 tall2x:h-56 tall3x:h-64 tall4x:h-80 ${
                    stand && 'z-10'
                  }`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'tween',
                    delay: 0.4,
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
      </div>

      {/* Buttons */}
      <div className="align-center my-5 flex flex-row px-12">
        {sum3 <= 21 ? (
          <p className="my-auto mr-auto w-6 text-center text-xl text-white sm:text-3xl">
            {stand ? sum3 : '--'}
          </p>
        ) : (
          <DealerOneModal sum3={sum3} />
        )}
        {stand && sum3 < 18 ? (
          <button
            className="click w-30 my-auto ml-auto h-8 self-center rounded bg-yellow-500 px-4 font-bold text-white"
            type="button"
            onClick={handleDealerIncrement}
          >
            Must Hit
          </button>
        ) : null}

        {stand && sum3 > 17 ? (
          <button
            className="click w-30 my-auto ml-auto rounded bg-green-700 px-4 py-2 font-bold text-white"
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
export default PortraitDealer;
