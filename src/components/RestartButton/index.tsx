export default function RestartButton({display, restart}: {display: boolean, restart: () => void}) {
  return(
    <>
        {display &&
            <button className="restart" onClick={restart}>
                Restart Game
            </button>
        }
    </>
  );
}