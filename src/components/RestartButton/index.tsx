export default function RestartButton({display, restart}: {display: boolean, restart: () => void}) {
  if (display) {
    return (
      <button className="restart" onClick={restart}>
        Restart Game
      </button>
    )
  }

  return null;
}