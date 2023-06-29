import { Link } from 'react-router-dom';
import blackjack from '../assets/dashboard/blackjack.jpg';
import videoPoker from '../assets/dashboard/videoPoker.jpg';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col justify-evenly bg-slate-700">
      <div className="text-center text-white">
        <h1 className="mb-4 mt-14 text-4xl">Cards Redux</h1>
      </div>
      <div className="flex flex-wrap content-center justify-evenly gap-4">
        {/* blackjack */}
        <div className="flex max-w-sm flex-col overflow-hidden rounded border-2 border-white bg-slate-800 text-white shadow-lg">
          <img className="w-full" src={blackjack} alt="video poker" />
          <div className="px-6 py-4">
            {/* <div className="flex flex-col justify-between"> */}
            <div className="mb-8">
              <div className="mb-2 text-xl font-bold">Blackjack</div>
              <p className="relative text-base">
                My take on blackjack where you play as both the dealer and
                gambler. The aces are automaticall calculated.
              </p>
            </div>
            {/* </div> */}
          </div>
          <div className="mt-4 px-6 pb-4">
            <Link to="blackjack">
              <button
                className="w-48 rounded bg-emerald-500 px-8 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="button"
              >
                Play ▶️
              </button>
            </Link>
          </div>
        </div>
        {/* video poker */}
        <div className="relative flex max-w-sm flex-col overflow-hidden rounded border-2 border-white bg-slate-800 text-white shadow-lg">
          <img className="w-full" src={videoPoker} alt="video poker" />
          <div className="px-6 py-4">
            <div className="mb-8">
              <div className="mb-2 text-xl font-bold">Video Poker</div>
              <p className="relative text-base">
                Just touch a card to hold it then press the deal or draw button.
              </p>
            </div>
          </div>
          <div className="mt-4 px-6 pb-4 md:absolute md:bottom-0">
            <Link to="video-poker">
              <button
                className="w-48 rounded bg-blue-500 px-8 py-3 text-base font-bold uppercase text-white shadow-md outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-blue-600"
                type="button"
              >
                Play
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
