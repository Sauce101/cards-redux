import { useMemo } from 'react';
import { motion } from 'framer-motion';
import PlayerOneModal from '../modals/PlayerOneModal';
import {
  newDeal,
  newStand,
  standToggle,
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
  handleIncrement: any;
  dispatch: any;
}

const PortraitPlayer = ({
  result,
  cardValue,
  cardCount,
  stand,
  refetch,
  handleIncrement,
  dispatch,
}: BlackJackProps) => {
  let sum = 0;

  const handleStand = () => {
    dispatch(standToggle());
  };

  const shuffleDeal = () => {
    dispatch(shuffleToggle());
    dispatch(newStand());
    dispatch(newDeal());
  };

  // Derived state wrapped with useMemo
  useMemo(
    () =>
      cardValue.slice(2, cardCount).map((num: string) => (sum += Number(num))),
    [cardCount, cardValue, stand]
  );

  // ACES 11 or 1
  function checkEleven(age: any) {
    return age > 10;
  }

  const cards = cardValue.slice(2, cardCount).filter(checkEleven);

  function eleven() {
    if (sum > 21) {
      return (sum -= 10);
    }
  }
  useMemo(() => cards.forEach(eleven), [cardCount, cards]);

  // first, second, and remaining cards wrapped in <ul> tags
  const firstCard = result.cards.slice(2, 3).map((item: CardProps) => (
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
  const secondCard = result.cards.slice(3, 4).map((item: CardProps) => (
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
          delay: 0.8,
          duration: 0.3,
        }}
      />
    </li>
  ));
  const remainingCards = result.cards
    .slice(4, cardCount)
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
    <div className="grid w-full grid-flow-col grid-rows-3 gap-2">
      <div className="row-span-2">
        {/* Cards */}
        <div className="flex px-12">
          {result === null ? (
            'loading'
          ) : (
            <>
              <ul className="flex flex-row">{firstCard}</ul>
              <ul className="flex flex-row">{secondCard}</ul>
              <ul className="flex flex-row">{remainingCards}</ul>
            </>
          )}
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-row px-12 align-middle">
        {sum <= 21 ? (
          <p className="my-auto mr-auto w-6 text-center text-xl text-white sm:text-3xl">
            {sum}
          </p>
        ) : (
          <PlayerOneModal sum={sum} />
        )}

        {!stand && sum < 22 ? (
          <button
            className="click w-30 my-auto mr-2 h-8 self-center rounded bg-red-500 px-4 font-bold text-white hover:bg-red-700"
            type="button"
            onClick={handleStand}
          >
            Stand
          </button>
        ) : null}

        {!stand && sum < 22 ? (
          <button
            className="click w-30 my-auto h-8 self-center rounded bg-yellow-500 px-4 font-bold text-white"
            type="button"
            onClick={handleIncrement}
          >
            Hit Me
          </button>
        ) : null}

        {sum > 21 ? (
          <button
            className="click w-30 my-auto rounded bg-green-700 px-4 py-2 font-bold text-white"
            type="button"
            onClick={() => {
              refetch();
              setTimeout(shuffleDeal, 500);
            }}
          >
            New Game?
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default PortraitPlayer;
