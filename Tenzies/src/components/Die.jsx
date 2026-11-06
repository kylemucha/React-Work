export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF",
  };

  return (
    <button onClick={props.hold} style={styles} className="die">
      {props.value}
    </button>
  );
}
