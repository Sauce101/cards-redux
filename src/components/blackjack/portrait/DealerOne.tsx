import { useState, useMemo, useEffect } from 'react';
import DealerOneModal from '../modals/DealerOneModal';
import redMaze from '../../../assets/blackjack/images/redMaze.svg';
import {
  newDeal,
  newStand,
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
  // setCardCount: React.Dispatch<React.SetStateAction<number>>;
  cardValue: string[];
  // setShuffle: React.Dispatch<React.SetStateAction<boolean>>;
  stand: boolean;
  // setStand: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: any;
  dispatch: any;
}

const DealerOne = ({
  result,
  cardValue,
  // cardCount,
  // setCardCount,
  // setShuffle,
  // setStand,
  stand,
  refetch,
  dispatch,
  cardCount,
}: BlackJackProps) => {
  // DealerOne
  const [cardMax, setCardMax] = useState<number>(0);
  let sum = 0;
  let sum2 = 0;

  const handleIncrement = () => {
    setCardMax((prevCount) => prevCount + 1);
  };

  const shuffleDeal = () => {
    // setShuffle((prevShuffle) => !prevShuffle);
    dispatch(shuffleToggle());
    // setStand(false);
    setCardMax(0);
    dispatch(newDeal());
  };

  useEffect(() => {
    setCardMax(cardCount);
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

  return (
    // <div className="my-auto grid w-full grid-flow-col grid-rows-3 gap-2">
    <div className="mt-[45.25px] grid w-full grid-flow-col grid-rows-3 gap-2">
      <div className="row-span-2">
        <div className="flex flex-row px-12">
          {/* Card One index Zero[0] */}
          <div className="-mr-28 flex tall2x:-mr-36">
            <img
              src={`${redMaze}`}
              alt="..."
              className=" z-0 tall:h-44 tall2x:h-56 tall3x:h-64 tall4x:h-80"
            />
            {stand &&
              result.cards
                .slice(0, 1)
                .map((item: CardProps) => (
                  <img
                    src={item.image}
                    alt={item.code}
                    key={item.code}
                    className={`absolute -mr-28 tall:h-44 tall2x:-mr-36 tall2x:h-56 tall3x:h-64 tall4x:h-80 ${
                      stand && 'z-10'
                    }`}
                  />
                ))}
          </div>
          {/* Card Two index One[1] */}
          {result === null
            ? 'loading'
            : result.cards
                .slice(1, 2)
                .map((item: CardProps) => (
                  <img
                    src={item.image}
                    alt={item.code}
                    key={item.code}
                    className=" z-20 -mr-28 tall:h-44 tall2x:-mr-36 tall2x:h-56 tall3x:h-64 tall4x:h-80"
                  />
                ))}
          {/* Drawn Cards */}
          {stand
            ? result.cards
                .slice(cardCount, cardMax)
                .map((item: CardProps) => (
                  <img
                    src={item.image}
                    alt={item.code}
                    key={item.code}
                    className=" z-30 -mr-28 tall:h-44 tall2x:-mr-36 tall2x:h-56 tall3x:h-64 tall4x:h-80"
                  />
                ))
            : null}
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
            onClick={handleIncrement}
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
export default DealerOne;
