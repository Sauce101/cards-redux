/* eslint-disable no-lone-blocks */
import { useAppSelector } from '../app/hooks';
import { useDealCardsQuery, useShuffleCardsQuery } from '../api/apiSlice';
import DealCards from '../components/videoPoker/landscape/DealCards';
import DrawCards from '../components/videoPoker/landscape/DrawCards';
import payout from '../assets/videoPoker/images/payout.png';
import RetroLoading from '../components/shared/RetroLoading';
import RetroError from '../components/shared/RetroError';
import MobileOne from '../components/videoPoker/portrait/MobileOne';
import MobileTwo from '../components/videoPoker/portrait/MobileTwo';

export default function VideoPoker() {
  // Using a query hook automatically fetches data and returns query values
  const { data: shuffleCards, error, isLoading } = useShuffleCardsQuery();
  const { data: dealCards } = useDealCardsQuery();
  // Current State
  const dealDrawState = useAppSelector((state) => state.dealDraw.value);

  return (
    <div>
      {error ? (
        <RetroError />
      ) : isLoading ? (
        <RetroLoading />
      ) : shuffleCards ? (
        <>
          <div className="flex min-h-screen flex-col place-items-center bg-[#0000bf]	text-center font-medium text-white portrait:hidden">
            <div className="flex flex-col place-items-center">
              <img
                src={payout}
                alt="..."
                className="mt-[45.25px] hidden w-3/5 lg:block"
              />
            </div>
            <div className="my-auto mb-auto flex flex-col place-items-center">
              {dealDrawState ? (
                <DrawCards dealCards={dealCards} />
              ) : (
                <DealCards dealCards={dealCards} />
              )}
            </div>
          </div>
          <div className="flex min-h-screen flex-col place-items-center bg-[#0000bf]	text-center font-medium text-white landscape:hidden">
            <div className="my-auto flex flex-col place-items-center">
              {dealDrawState ? <MobileOne /> : <MobileTwo />}
            </div>
          </div>{' '}
        </>
      ) : null}
    </div>
  );
}
