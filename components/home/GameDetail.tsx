import Image from "next/image";

type GameInfo = {
  name: string;
  // genre: string;
};

type GameDetailProp = {
  currentGame: GameInfo;
};

export default function GameDetail({ currentGame }: GameDetailProp) {
  return (
    <div
      className="w-[40%] border-2 border-rose-600 
                    m-1 pt-4
                    flex flex-col justify-start items-center "
    >
      <Image
        // TODO: change photo later
        src="/placeholder-image.jpg"
        alt="Game Thumbnail"
        className="border-2 border-green-500"
        width={400}
        height={400}
      />
      {currentGame.name}
    </div>
  );
}
