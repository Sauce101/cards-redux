/* eslint-disable no-lone-blocks */
import { useAppSelector } from '../app/hooks';
import { useDealCardsQuery, useShuffleCardsQuery } from '../api/apiSlice';
import DealCards from '../components/videoPoker/DealCards';
import DrawCards from '../components/videoPoker/DrawCards';
import payout from '../assets/videoPoker/images/payout.png';
// import rotateScreen from '../assets/videoPoker/images/rotateScreen.png';
// import Footer from '../components/videoPoker/Footer';
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
            {/* <div className="mb-8 flex flex-col place-items-center"> */}
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
            {/* <Footer /> */}
          </div>
          {/* Try Outs */}
          <div className="flex min-h-screen flex-col place-items-center bg-[#0000bf]	text-center font-medium text-white landscape:hidden">
            <div className="my-auto flex flex-col place-items-center">
              {dealDrawState ? <MobileOne /> : <MobileTwo />}
            </div>
            {/* <Footer /> */}
          </div>{' '}
        </>
      ) : null}
    </div>
  );
}
