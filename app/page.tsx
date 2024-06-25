import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-steam-header text-neutral-200 w-full h-[100px] flex flex-row justify-between pl-5 pr-5">
        <div className="mt-5 ml-6">Logo</div>
        {/* <div className="font-semibold text-2xl mt-7 w-90 p-2">
          <button className="mr-4 hover:text-neutral-500">Home</button>
          <button className="mr-4 hover:text-neutral-500">Community</button>
          <button className="mr-4 hover:text-neutral-500">About</button>
          <button className="hover:text-neutral-500">Profile</button>
        </div> */}
        <div className="mt-3">
          <Link
            href="/login"
            className="mr-1 text-sm pt-1 pb-1 pl-2 pr-2 hover:text-neutral-500"
          >
            log in
          </Link>
          &nbsp;|&nbsp;
          <Link
            href="/signup"
            className="ml-1 mr-6 text-sm pt-1 pb-1 pl-2 pr-2 hover:text-neutral-500"
          >
            sign up
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col max-w-[60%] self-center transform translate-y-[-50px] m-auto overflow-hidden pb-2.5">
        <span className="inline-block text-[3vw] text-[#efefef] w-full uppercase transform translate-x-[-100%] animate-byBottom font-semibold tracking-[0.25vw]">
          Backlog
        </span>
        <span className="inline-block text-[1rem] text-[#efefef] w-full uppercase transform translate-x-[-100%] animate-byBottom delay-[250ms] font-semibold tracking-[0.25vw]">
          Made by
          <a
            href="http://google.com"
            target="_blank"
            className="relative inline-block ml-2 text-[#F7CA18] no-underline"
          >
            Gamer
            <span className="after:content-[''] after:h-[2px] after:bg-[#F7CA18] after:absolute after:bottom-[-10px] after:left-0 after:w-0 after:animate-linkAfter"></span>
          </a>
        </span>
      </div>
      <div className="w-full">Footer</div>
    </main>
  );
}
