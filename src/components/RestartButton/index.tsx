export default function RestartButton({restart}: {restart: () => void}) {
  return(
    <button className="restart" onClick={restart}>
        Restart Game
    </button>
  );
}