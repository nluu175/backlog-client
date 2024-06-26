import useSWR from "swr";

type GameInfo = {
  name: string;
  // description: string;
};

type GameItemBoxProps = {
  gameInfo: GameInfo;
  setCurrentGame: React.Dispatch<React.SetStateAction<GameInfo>>;
};

function GameItemBox({ gameInfo, setCurrentGame }: GameItemBoxProps) {
  return (
    <div
      className="border-2 border-l-cyan-200 m-3 
                relative w-[95%] pt-[100%]
                transform transition-transform duration-300 hover:scale-105"
      onClick={() => {
        console.log(gameInfo.name);
        setCurrentGame(gameInfo);
      }}
    >
      {gameInfo.name}
    </div>
  );
}

type GameListProps = {
  setCurrentGame: React.Dispatch<React.SetStateAction<GameInfo>>;
};

export default function GameList({ setCurrentGame }: GameListProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/backlog/games/",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div
      className="w-[60%] m-1
                grid grid-cols-4 grid-flow-row gap-4 
                overflow-y-auto"
    >
      {data.map((game: { name: string }) => (
        <GameItemBox
          key={game.name}
          gameInfo={game}
          setCurrentGame={setCurrentGame}
        />
      ))}
    </div>
  );
}
