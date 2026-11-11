export default function LeaderboardName(props) {
  return (
    <li>
      {props.playerName}: {props.playerScore}
    </li>
  );
}
