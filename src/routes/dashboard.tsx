import { Link } from 'react-router-dom';
import blackjack from '../assets/dashboard/blackjack.jpg';
import videoPoker from '../assets/dashboard/videoPoker.jpg';
import Footer from '../components/shared/Footer';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col  place-items-center bg-slate-800">
      {/* Portrait */}
      <div className="my-auto flex flex-col justify-center gap-8 text-white landscape:hidden">
        <div className="mx-auto w-4/5">
          <img src={blackjack} alt="blackjack" />
          <div className="flex justify-between bg-emerald-600 px-4 py-1">
            <h2 className="tall:text-lg tall2x:text-3xl">Blackjack</h2>
            <div className="my-auto">
              <Link to="blackjack">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 tall2x:h-8 tall2x:w-8 tall3x:h-12 tall3x:w-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto w-4/5">
          <img src={videoPoker} alt="blackjack" />
          <div className="flex justify-between bg-blue-600 px-4 py-1">
            <h2 className="tall:text-lg tall2x:text-3xl">Video Poker</h2>
            <div className="my-auto">
              <Link to="video-poker">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 tall2x:h-8 tall2x:w-8 tall3x:h-12 tall3x:w-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* Landscape */}
      <div className="flex-col-2 my-auto flex justify-evenly text-white portrait:hidden">
        <div className="mx-auto w-2/5">
          <img src={blackjack} alt="blackjack" />
          <div className="flex justify-between bg-emerald-600 px-4 py-1">
            <h2 className="my-auto text-xl lg:text-3xl">Blackjack</h2>
            <div className="my-auto">
              <Link to="blackjack">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto w-2/5">
          <img src={videoPoker} alt="blackjack" />
          <div className="flex justify-between bg-blue-600 px-4 py-1">
            <h2 className="my-auto text-xl lg:text-3xl">Video Poker</h2>
            <div className="my-auto">
              <Link to="video-poker">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default Dashboard;
