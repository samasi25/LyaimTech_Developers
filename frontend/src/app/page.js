import Link from "next/link";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: "url(images/home1.png)",
      }}
    >
      <div className="flex justify-between items-center p-3 max-w-3xl mx-auto text-white">
        <div className="font-alex font-medium text-3xl text-[#977108]">Lyaim</div>
        <div className="flex gap-5 text-lg">
          <Link href={'register'}>REGISTRATION</Link>
          <Link href={'login'}>LOGIN</Link>
        </div>
      </div>

      <div className="mt-10 w-2/3 left-1/3 absolute text-white space-y-10">
        <div className="text-center font-acme space-y-5">
          <h1 className="text-3xl font-semibold font-abril">
            KICK OFF YOUR FANTASY JOURNEY!!!
          </h1>
          <p className="text-2xl font-semibold">Build you dream team,</p>
          <p className="text-2xl font-semibold">Dominate the field,</p>
          <p className="text-2xl font-semibold">And win big! 🤑</p>
        </div>

        <div className="text-center space-y-5">
          <p className="text-3xl text-red-950 font-bold font-Agbalumo">
            SO, WHAT ARE YOU WAITING FOR???
          </p>
          <button
            style={{
              background: 'linear-gradient(150deg, #5672B8, #040B29DB)',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
            }}
            className="w-fit px-5 py-1 rounded-2xl text-[#93EEE3] text-lg font-semibold hover:bg-[#93EEF9] transition"
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
}
