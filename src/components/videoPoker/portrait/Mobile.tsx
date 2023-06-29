import { useDealCardsQuery } from '../../../api/apiSlice';

const Mobile = () => {
  const { data: mobileCards } = useDealCardsQuery();

  const POSITION = [
    {
      card: mobileCards?.cards[0].image,
    },
    {
      card: mobileCards?.cards[1].image,
    },
    {
      card: mobileCards?.cards[2].image,
    },
    {
      card: mobileCards?.cards[3].image,
    },
    {
      card: mobileCards?.cards[4].image,
    },
  ];

  return (
    <div className="my-auto mt-14 grid grid-flow-col grid-rows-5">
      {POSITION.map((spot, index) => (
        <div key={index} className="mx-auto flex rotate-90 flex-col">
          <img
            src={spot.card}
            alt="card"
            className="tall:h-24 tall2x:h-32 tall3x:h-40"
          />
        </div>
      ))}
    </div>
  );
};
export default Mobile;
