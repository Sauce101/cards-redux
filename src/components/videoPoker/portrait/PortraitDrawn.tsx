import {
  useDealCardsQuery,
  useDealNextCardsMutation,
  useReturnCardsMutation,
  useReShuffleCardsMutation,
} from '../../../api/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { deal } from '../../../features/dealDrawSlice';
import {
  holdReset1,
  holdReset2,
  holdReset3,
  holdReset4,
  holdReset5,
} from '../../../features/holdOneSlice';

import redback from '../../../assets/videoPoker/images/2B.svg';
import { motion } from 'framer-motion';

const PortraitDrawn = () => {
  const { data: mobileCards } = useDealCardsQuery();
  const dispatch = useAppDispatch();
  // mutations
  const [returnCards] = useReturnCardsMutation();
  const [reShuffle] = useReShuffleCardsMutation();
  const [dealNext] = useDealNextCardsMutation();
  // hold State
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  const POSITION = [
    {
      delay: 0.5,
      hold: holdState1,
      delt: mobileCards?.cards[0].image,
      drawn: mobileCards?.cards[5].image,
      // back: redback,
    },
    {
      delay: 0.6,
      hold: holdState2,
      delt: mobileCards?.cards[1].image,
      drawn: mobileCards?.cards[6].image,
      // back: redback,
    },
    {
      delay: 0.7,
      hold: holdState3,
      delt: mobileCards?.cards[2].image,
      drawn: mobileCards?.cards[7].image,
      // back: redback,
    },
    {
      delay: 0.8,
      hold: holdState4,
      delt: mobileCards?.cards[3].image,
      drawn: mobileCards?.cards[8].image,
      // back: redback,
    },
    {
      delay: 0.9,
      hold: holdState5,
      delt: mobileCards?.cards[4].image,
      drawn: mobileCards?.cards[9].image,
      // back: redback,
    },
  ];

  const dealHand = () => {
    dealNext();
    returnCards();
    reShuffle();
    dispatch(holdReset1());
    dispatch(holdReset2());
    dispatch(holdReset3());
    dispatch(holdReset4());
    dispatch(holdReset5());
    dispatch(deal());
  };

  //Card size and styles
  const cardSizes =
    'tall:-mb-14 tall2x:-mb-16 rotate-90 tall:h-28 tall2x:h-36 tall3x:h-44 tall4x:h-60';

  const cardHeldStyle = 'mt-7 tall4x:text-4xl tall3x:text-3xl';

  const container = {
    hidden: { opacity: 0.0, scale: 1.0 },
    show: {
      opacity: 1,
      scale: 1.0,
    },
  };

  const drawnCards = POSITION.map((spot, index) => (
    <li key={index}>
      {spot.hold ? (
        <div className="card mx-auto mb-8">
          <div className="grid h-full grid-cols-3 justify-center gap-4">
            <div className="my-auto">
              <p className={cardHeldStyle}>HELD</p>
            </div>
            <div>
              <img src={spot.delt} alt="..." className={cardSizes} />
            </div>
            <div className="my-auto">
              <p className={cardHeldStyle}>HELD</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="card mb-8">
          {/* Redback - Front */}
          <div className="card__face card__face--front">
            <div className="grid h-full grid-cols-3 justify-center gap-4">
              <div className="my-auto">
                <p className={cardHeldStyle}>&nbsp;</p>
              </div>
              <div>
                <img src={redback} alt="..." className={cardSizes} />
              </div>
              <div className="my-auto">
                <p className={cardHeldStyle}>&nbsp;</p>
              </div>
            </div>
          </div>
          {/* Cards Face - hidden */}
          <div className="card__face card__face--back">
            <div className="grid h-full grid-cols-3 justify-center gap-4">
              <div className="my-auto">
                <p className={cardHeldStyle}>&nbsp;</p>
              </div>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                transition={{ delay: spot.delay }}
              >
                <img src={spot.drawn} alt="..." className={cardSizes} />
              </motion.div>
              <div className="my-auto">
                <p className={cardHeldStyle}>&nbsp;</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  ));

  return (
    <>
      <motion.div
        className="fixed"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'tween',
          delay: 1.3,
          duration: 0.2,
        }}
      >
        <p className="play__five p-2 text-center text-4xl font-bold text-red-700 tall3x:text-5xl tall4x:text-6xl">
          PLAY 5 CREDITS
        </p>
      </motion.div>

      <ul className="my-12 grid grid-flow-col grid-rows-5 tall3x:my-14 tall4x:my-16">
        {drawnCards}
      </ul>

      <div>
        <button
          className="click h-8 w-40 self-center rounded bg-yellow-500 px-4 font-bold text-black tall2x:h-10 tall2x:text-2xl tall3x:h-14 tall3x:w-60 tall3x:text-3xl tall4x:h-16 tall4x:w-80 tall4x:text-4xl"
          type="button"
          onClick={() => dealHand()}
        >
          Deal
        </button>
      </div>
    </>
  );
};
export default PortraitDrawn;
