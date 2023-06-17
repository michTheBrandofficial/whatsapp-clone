import { signIn } from 'apis/auth';
import logo from 'assets/images/logo.png';
import Loader from 'components/Loader';
import { asyncComponent, Suspense } from 'nixix/hoc';

export default function Login() {
  const AsyncLogin = asyncComponent(function () {
    return new Promise((res) => {
      setTimeout(() => {
        res(
          <section className="grid place-content-center h-screen bg-gray-100 w-full">
            <div className="p-[40px] pb-[80px] flex flex-col items-center bg-white rounded-[5px] shadow-md md:p-[80px]">
              
              <img
                src={logo}
                className="h-[200px] w-[200px] object-contain mb-3"
              />
              <button
                className="border-2 border-gray-400 uppercase text-gray-700 font-semibold rounded-md px-2"
                on:click={signIn}
              >
                Sign in with Google
              </button>
            </div>
          </section>
        );
      }, 3000);
    });
  });
  return (
    <div className="w-full h-screen bg-white">
      <Suspense fallback={<Loader />}>
        <AsyncLogin   />
      </Suspense>
    </div>
  );
}
