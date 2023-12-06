// import { useEffect } from 'react';
import { useDealCardsQuery } from '../../../api/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
// actions
import { draw } from '../../../features/dealDrawSlice';
// import { rotateFalse, rotateTrue } from '../../../features/rotateSlice';
import {
  holdOne,
  holdTwo,
  holdThree,
  holdFour,
  holdFive,
} from '../../../features/holdOneSlice';
// Back of card - red design style
import redback from '../../../assets/videoPoker/images/2B.svg';
import { motion } from 'framer-motion';

const PortraitDealt = () => {
  const { data: mobileCards } = useDealCardsQuery();
  const dispatch = useAppDispatch();
  // card State
  const isActive = useAppSelector((state) => state.rotate.value);

  // hold State
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(rotateTrue());
  //   }, 400);
  //   return () => clearTimeout(timer);
  // }, [dispatch]);

  const drawHand = () => {
    dispatch(draw());
    // dispatch(rotateFalse());
  };

  const POSITION = [
    {
      delay: 0.5,
      hold: holdState1,
      dis: holdOne(),
      card: mobileCards?.cards[0].image,
    },
    {
      delay: 0.6,
      hold: holdState2,
      dis: holdTwo(),
      card: mobileCards?.cards[1].image,
    },
    {
      delay: 0.7,
      hold: holdState3,
      dis: holdThree(),
      card: mobileCards?.cards[2].image,
    },
    {
      delay: 0.8,
      hold: holdState4,
      dis: holdFour(),
      card: mobileCards?.cards[3].image,
    },
    {
      delay: 0.9,
      hold: holdState5,
      dis: holdFive(),
      card: mobileCards?.cards[4].image,
    },
  ];

  // Card size and styles
  const cardSizeStyle =
    'tall:-mb-14 tall2x:-mb-16 rotate-90 tall:h-28 tall2x:h-36 tall3x:h-44 tall4x:h-60';

  const cardHeldStyle = 'mt-7 tall4x:text-4xl tall3x:text-3xl';

  const container = {
    hidden: { opacity: 0.0, scale: 1.0 },
    show: {
      opacity: 1,
      scale: 1.0,
    },
  };

  const dealtCardsList = POSITION.map((spot, index) => (
    <li key={index}>
      <div
        className={`card mx-auto mb-8 ${isActive ? 'is-flipped' : null}`}
        // className={`relative mx-auto mb-8`}
        // className="mx-auto mb-8"
      >
        {/* Redback - Front */}
        <div
          className="absolute
         h-full"
        >
          <div className="grid h-full grid-cols-3 justify-center gap-4">
            <div className="my-auto">
              {spot.hold ? (
                <p className={cardHeldStyle}>&nbsp;</p>
              ) : (
                <p className={cardHeldStyle}>&nbsp;</p>
              )}
            </div>
            <div>
              <img
                className={`${cardSizeStyle}`}
                src={redback}
                alt="..."
                aria-hidden="true"
              />
            </div>
            <div className="my-auto">
              {spot.hold ? (
                <p className={cardHeldStyle}>&nbsp;</p>
              ) : (
                <p className={cardHeldStyle}>&nbsp;</p>
              )}
            </div>
          </div>
        </div>
        {/* Cards Face - Back */}
        <div className="relative h-full">
          <div className="grid h-full grid-cols-3 justify-center gap-4">
            {/* left side HELD */}
            <div className="my-auto">
              {spot.hold ? (
                <p className={cardHeldStyle}>HELD</p>
              ) : (
                <p className={cardHeldStyle}>&nbsp;</p>
              )}
            </div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delay: spot.delay }}
            >
              <img
                src={spot.card}
                alt="card"
                className={cardSizeStyle}
                onClick={() => dispatch(spot.dis)}
                aria-hidden="true"
              />
            </motion.div>
            {/* right side HELD */}
            <div className="my-auto">
              {spot.hold ? (
                <p className={cardHeldStyle}>HELD</p>
              ) : (
                <p className={cardHeldStyle}>&nbsp;</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <>
      <ul className="my-12 grid grid-flow-col grid-rows-5 tall3x:my-14 tall4x:my-16">
        {dealtCardsList}
      </ul>

      <div>
        <button
          className="click h-8 w-40 self-center rounded bg-yellow-500 px-4 font-bold text-black tall2x:h-10 tall2x:text-2xl tall3x:h-14 tall3x:w-60 tall3x:text-3xl tall4x:h-16 tall4x:w-80 tall4x:text-4xl"
          type="button"
          onClick={() => drawHand()}
        >
          Draw
        </button>
      </div>
    </>
  );
};
export default PortraitDealt;
