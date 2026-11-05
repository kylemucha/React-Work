export default function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
  }

  return (
    <button onClick={props.holdFunc} style={styles} className="die">
      {props.value}
    </button>

  );
}
