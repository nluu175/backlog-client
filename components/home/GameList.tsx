type GameInfo = {
  name: string;
  genre: string;
};

type GameBoxItemProps = {
  gameInfo: GameInfo;
  setCurrentGame: React.Dispatch<React.SetStateAction<GameInfo>>;
};

function GameBoxItem({ gameInfo, setCurrentGame }: GameBoxItemProps) {
  return (
    <div
      className="border-2 border-l-cyan-200 m-3"
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
  const gameList = [
    {
      name: "1",
      genre: "b",
    },
    {
      name: "2",
      genre: "b",
    },
    {
      name: "3",
      genre: "b",
    },
    {
      name: "4",
      genre: "b",
    },
    {
      name: "5",
      genre: "b",
    },
    {
      name: "6",
      genre: "b",
    },
    {
      name: "7",
      genre: "b",
    },
    {
      name: "8",
      genre: "b",
    },
    {
      name: "9",
      genre: "b",
    },
  ];

  return (
    <div
      className="w-[60%] border-2 border-rose-600 h-screen m-1
                    grid grid-cols-4 grid-flow-row gap-4"
    >
      {gameList.map((game) => (
        <GameBoxItem
          key={game.name}
          gameInfo={game}
          setCurrentGame={setCurrentGame}
        />
      ))}
    </div>
  );
}
