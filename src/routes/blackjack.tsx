// RTK Query
import { useDealCardsQuery } from '../api/blackjackSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { increment } from '../features/blackjack/blackjackSlice';
import RetroLoading from '../components/shared/RetroLoading';
import RetroError from '../components/shared/RetroError';
// Components
import DealerOne from '../components/blackjack/portrait/DealerOne';
import PlayerOne from '../components/blackjack/portrait/PlayerOne';
import DealerTwo from '../components/blackjack/landscape/DealerTwo';
import PlayerTwo from '../components/blackjack/landscape/PlayerTwo';

const BlackJack = () => {
  // RTK
  const { data: result, refetch, error, isLoading } = useDealCardsQuery();
  const cardCount = useAppSelector((state) => state.blackjack.count);
  const stand = useAppSelector((state) => state.blackjack.stand);
  const dispatch = useAppDispatch();
  const url: any = result;

  const cardValue = url?.cards.map((card: any) => {
    if (
      card.value === 'KING' ||
      card.value === 'QUEEN' ||
      card.value === 'JACK'
    ) {
      return Number('10');
    }
    if (card.value === 'ACE') {
      return Number('11');
    }
    return Number(card.value);
  });

  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div>
      {error ? (
        <RetroError />
      ) : isLoading ? (
        <RetroLoading />
      ) : result ? (
        <>
          <div className="flex min-h-screen flex-col justify-evenly bg-green-900 landscape:hidden">
            <DealerOne
              result={result}
              cardValue={cardValue}
              stand={stand}
              refetch={refetch}
              dispatch={dispatch}
              cardCount={cardCount}
            />
            <PlayerOne
              result={result}
              cardValue={cardValue}
              stand={stand}
              refetch={refetch}
              handleIncrement={handleIncrement}
              dispatch={dispatch}
              cardCount={cardCount}
            />
          </div>
          <div className="flex min-h-screen flex-col justify-evenly bg-green-900 portrait:hidden">
            <DealerTwo
              result={result}
              cardValue={cardValue}
              stand={stand}
              cardCount={cardCount}
              refetch={refetch}
              dispatch={dispatch}
            />
            <PlayerTwo
              result={result}
              cardValue={cardValue}
              stand={stand}
              cardCount={cardCount}
              refetch={refetch}
              handleIncrement={handleIncrement}
              dispatch={dispatch}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
export default BlackJack;
