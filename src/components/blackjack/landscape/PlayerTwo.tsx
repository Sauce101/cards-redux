import { useMemo } from 'react';
import PlayerTwoModal from '../modals/PlayerTwoModal';
import {
  newStand,
  standToggle,
  newDeal,
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

const PlayerTwo = ({
  result,
  cardValue,
  cardCount,
  stand,
  refetch,
  handleIncrement,
  dispatch,
}: BlackJackProps) => {
  // PlayerTwo landscape
  let sum = 0;

  const handleStand = () => {
    dispatch(standToggle());
  };

  const shuffleDeal = () => {
    dispatch(newStand());
    refetch();
    dispatch(shuffleToggle());
    dispatch(newDeal());
  };

  // Derived state wrapped with useMemo
  useMemo(
    () =>
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cardValue.slice(2, cardCount).map((num: string) => (sum += Number(num))),
    [cardCount, cardValue, stand]
  );

  // ACES 11 or 1
  function checkEleven(aces: any) {
    return aces > 10;
  }

  const cards = cardValue.slice(2, cardCount).filter(checkEleven);

  function eleven() {
    if (sum > 21) {
      return (sum -= 10);
    }
  }
  // Derived state wrapped with useMemo
  useMemo(() => cards.forEach(eleven), [cardCount, cards]);
  // ACES 11 or 1 - END

  return (
    <div className="mb-2 flex justify-between px-12 md:mb-4 lg:mb-12 tall3x:mb-28">
      {/* Cards */}
      <div className="flex flex-row">
        {result === null
          ? 'loading'
          : result.cards
              .slice(2, cardCount)
              .map((item: CardProps) => (
                <img
                  src={item.image}
                  alt={item.code}
                  key={item.code}
                  className="z-30 -mr-10 h-32 lg:-mr-16 lg:h-52 tall3x:h-72"
                />
              ))}
      </div>
      {/* Buttons */}
      <div className="align-center flex flex-col lg:my-4">
        {sum <= 21 ? (
          <p className="mb-auto w-40 text-center text-2xl text-white lg:text-3xl">
            {/* {sum} */}
            {sum > 0 ? sum : '--'}
          </p>
        ) : (
          <PlayerTwoModal sum={sum} />
        )}

        {!stand && sum < 22 ? (
          <button
            className="click mt-4 h-8 w-40 self-center rounded bg-red-500 px-4 font-bold text-white hover:bg-red-700"
            type="button"
            onClick={handleStand}
          >
            Stand
          </button>
        ) : null}
        {!stand && sum < 22 ? (
          <button
            className="click mt-4 h-8 w-40 self-center rounded bg-yellow-500 px-4 font-bold text-white"
            type="button"
            onClick={handleIncrement}
          >
            Hit Me
          </button>
        ) : null}

        {sum > 21 ? (
          <button
            className="click mt-auto h-8 w-40 self-center rounded bg-green-700 px-4 font-bold text-white"
            type="button"
            onClick={shuffleDeal}
          >
            New Game?
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default PlayerTwo;
