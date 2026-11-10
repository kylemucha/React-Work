export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };

  return (
    <button
      onClick={props.hold}
      style={styles}
      className="die"
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isheld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
