import { useAppSelector } from '../app/hooks';
import { useDealCardsQuery, useShuffleCardsQuery } from '../api/apiSlice';
import payout from '../assets/videoPoker/images/payout.png';
import RetroLoading from '../components/shared/RetroLoading';
import RetroError from '../components/shared/RetroError';
import LanndscapeDealt from '../components/videoPoker/landscape/LandscapeDealt';
import LandscapeDrawn from '../components/videoPoker/landscape/LandscapeDrawn';
import PortraitDealt from '../components/videoPoker/portrait/PortraitDealt';
import PortraitDrawn from '../components/videoPoker/portrait/PortraitDrawn';

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
                <LanndscapeDealt dealCards={dealCards} />
              ) : (
                <LandscapeDrawn dealCards={dealCards} />
              )}
            </div>
          </div>
          <div className="flex min-h-screen flex-col place-items-center bg-[#0000bf]	text-center font-medium text-white landscape:hidden">
            <div className="my-auto flex flex-col place-items-center">
              {dealDrawState ? <PortraitDealt /> : <PortraitDrawn />}
            </div>
          </div>{' '}
        </>
      ) : null}
    </div>
  );
}
