import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
// actions
import { draw } from '../../../features/dealDrawSlice';
import { rotateFalse, rotateTrue } from '../../../features/rotateSlice';
import {
  holdOne,
  holdTwo,
  holdThree,
  holdFour,
  holdFive,
} from '../../../features/holdOneSlice';
// card back
import redback from '../../../assets/videoPoker/images/2B.svg';

interface DrawProps {
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

const DrawCards = ({ dealCards }: { dealCards: DrawProps | undefined }) => {
  const dispatch = useAppDispatch();
  // card State
  const isActive = useAppSelector((state) => state.rotate.value);
  // hold State
  const holdState1 = useAppSelector((state) => state.holdCardOne.toggleHold1);
  const holdState2 = useAppSelector((state) => state.holdCardOne.toggleHold2);
  const holdState3 = useAppSelector((state) => state.holdCardOne.toggleHold3);
  const holdState4 = useAppSelector((state) => state.holdCardOne.toggleHold4);
  const holdState5 = useAppSelector((state) => state.holdCardOne.toggleHold5);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(rotateTrue());
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const drawHand = () => {
    dispatch(draw());
    dispatch(rotateFalse());
  };

  const POSITION = [
    {
      hold: holdState1,
      card: dealCards?.cards[0].image,
      dis: holdOne(),
      back: redback,
    },
    {
      hold: holdState2,
      card: dealCards?.cards[1].image,
      dis: holdTwo(),
      back: redback,
    },
    {
      hold: holdState3,
      card: dealCards?.cards[2].image,
      dis: holdThree(),
      back: redback,
    },
    {
      hold: holdState4,
      card: dealCards?.cards[3].image,
      dis: holdFour(),
      back: redback,
    },
    {
      hold: holdState5,
      card: dealCards?.cards[4].image,
      dis: holdFive(),
      back: redback,
    },
  ];

  return (
    <div className="scene mt-8 w-9/12 space-y-8">
      <div className="grid grid-cols-5 gap-2">
        {POSITION.map((spot, index) => (
          <div
            className={`card mx-auto ${isActive ? 'is-flipped' : null}`}
            key={index}
          >
            {/* Redback - Front */}
            <div className="card__face card__face--front">
              <p>&nbsp;</p>
              <img
                className="mt-2 w-full"
                src={spot.back}
                alt="..."
                aria-hidden="true"
              />
            </div>
            {/* CARDS - Hidden Until Flip */}
            <div className="card__face card__face--back">
              {spot.hold ? <p>HELD</p> : <p>&nbsp;</p>}
              <img
                className="mt-2"
                src={`${spot.card}`}
                alt="..."
                onClick={() => dispatch(spot.dis)}
                aria-hidden="true"
              />
            </div>
          </div>
        ))}
      </div>

      <div>
        <button
          className="click h-8 w-40 self-center rounded bg-yellow-500 px-4 font-bold text-black tall2x:h-10 tall2x:text-2xl tall3x:h-14 tall3x:w-60 tall3x:text-3xl tall4x:h-16 tall4x:w-80 tall4x:text-4xl"
          type="button"
          onClick={() => drawHand()}
        >
          Draw
        </button>
      </div>
    </div>
  );
};
export default DrawCards;