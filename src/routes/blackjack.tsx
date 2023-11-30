// RTK Query
import { useDealCardsQuery } from '../api/blackjackSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  increment,
  dealerIncrement,
} from '../features/blackjack/blackjackSlice';
import RetroLoading from '../components/shared/RetroLoading';
import RetroError from '../components/shared/RetroError';
// Components
import PortraitDealer from '../components/blackjack/portrait/PortraitDealer';
import PortraitPlayer from '../components/blackjack/portrait/PortraitPlayer';
import LandscapeDealer from '../components/blackjack/landscape/LandscapeDealer';
import LandscapePlayer from '../components/blackjack/landscape/LandscapePlayer';

const BlackJack = () => {
  // RTK
  const { data: result, refetch, error, isLoading } = useDealCardsQuery();
  const cardCount = useAppSelector((state) => state.blackjack.count);
  const cardMax = useAppSelector((state) => state.blackjack.cardMax);
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
  const handleDealerIncrement = () => {
    dispatch(dealerIncrement());
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
            <PortraitDealer
              refetch={refetch}
              result={result}
              cardValue={cardValue}
              cardCount={cardCount}
              stand={stand}
              dispatch={dispatch}
              handleDealerIncrement={handleDealerIncrement}
              cardMax={cardMax}
            />
            <PortraitPlayer
              refetch={refetch}
              result={result}
              cardValue={cardValue}
              cardCount={cardCount}
              handleIncrement={handleIncrement}
              stand={stand}
              dispatch={dispatch}
            />
          </div>
          <div className="flex min-h-screen flex-col justify-evenly bg-green-900 portrait:hidden">
            <LandscapeDealer
              refetch={refetch}
              result={result}
              cardValue={cardValue}
              cardCount={cardCount}
              stand={stand}
              dispatch={dispatch}
              handleDealerIncrement={handleDealerIncrement}
              cardMax={cardMax}
            />
            <LandscapePlayer
              refetch={refetch}
              result={result}
              cardValue={cardValue}
              cardCount={cardCount}
              handleIncrement={handleIncrement}
              stand={stand}
              dispatch={dispatch}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};
export default BlackJack;
