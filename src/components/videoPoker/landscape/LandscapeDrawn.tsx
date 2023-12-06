import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { deal } from '../../../features/dealDrawSlice';
import {
  holdReset1,
  holdReset2,
  holdReset3,
  holdReset4,
  holdReset5,
} from '../../../features/holdOneSlice';
import {
  useDealNextCardsMutation,
  useReturnCardsMutation,
  useReShuffleCardsMutation,
} from '../../../api/apiSlice';
import redback from '../../../assets/videoPoker/images/2B.svg';

interface DealProps {
  success: boolean;
  deck_id: string;
  cards: {
    code: string;
    image: string;
    images: { svg: string; png: string };
    value: string;
    suit: string;
  }[];
  remaining: number;
}

const LandscapeDrawn = ({
  dealCards,
}: {
  dealCards: DealProps | undefined;
}) => {
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
      hold: holdState1,
      delt: dealCards?.cards[0].image,
      drawn: dealCards?.cards[5].image,
      back: redback,
      delay: 0.5,
    },
    {
      hold: holdState2,
      delt: dealCards?.cards[1].image,
      drawn: dealCards?.cards[6].image,
      back: redback,
      delay: 0.6,
    },
    {
      hold: holdState3,
      delt: dealCards?.cards[2].image,
      drawn: dealCards?.cards[7].image,
      back: redback,
      delay: 0.7,
    },
    {
      hold: holdState4,
      delt: dealCards?.cards[3].image,
      drawn: dealCards?.cards[8].image,
      back: redback,
      delay: 0.8,
    },
    {
      hold: holdState5,
      delt: dealCards?.cards[4].image,
      drawn: dealCards?.cards[9].image,
      back: redback,
      delay: 0.9,
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

  const container = {
    hidden: { opacity: 0.0, scale: 1.0 },
    hid: { opacity: 0.0, scale: 0.0 },
    show: {
      opacity: 1,
      scale: 1.0,
    },
  };

  const drawnCards = POSITION.map((spot, index) => (
    <li className={`card relative mx-auto`} key={index}>
      {spot.hold ? (
        <div className="">
          <p>HELD</p>
          <img src={`${spot.delt}`} alt="..." className="mt-2" />
        </div>
      ) : (
        <div className="card">
          <div className="card__face card__face--front">
            <p>&nbsp;</p>
            <img src={spot.back} alt="..." className="mt-2 h-auto w-[99%]" />
          </div>
          <motion.div
            className="card__face card__face--back"
            variants={container}
            initial="hidden"
            animate="show"
            transition={{ delay: spot.delay }}
          >
            <p>&nbsp;</p>
            <img src={`${spot.drawn}`} alt="..." className="mt-2" />
          </motion.div>
        </div>
      )}
    </li>
  ));

  return (
    <>
      <div className="scene mt-8 w-9/12 space-y-8">
        <div>
          <ul className="grid grid-cols-5 gap-2">{drawnCards}</ul>
          <div className="w-3/8 centeredB">
            <motion.p
              className="play__five bg-[#0000bf] p-2 text-center align-middle text-3xl font-bold text-red-700 md:text-4xl"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'tween',
                delay: 1.5,
              }}
            >
              PLAY 5 CREDITS
            </motion.p>
          </div>
        </div>

        <div>
          <button
            className="click h-8 w-40 self-center rounded bg-yellow-500 px-4 font-bold text-black tall2x:h-10 tall2x:text-2xl tall3x:h-14 tall3x:w-60 tall3x:text-3xl tall4x:h-16 tall4x:w-80 tall4x:text-4xl"
            type="button"
            onClick={() => dealHand()}
          >
            Deal
          </button>
        </div>
      </div>
    </>
  );
};
export default LandscapeDrawn;
