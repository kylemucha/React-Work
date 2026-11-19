export default function AvengerTile(props) {

    const styles = {
        color: props.color,
        backgroundColor: props.backgroundColor
    }

    return(
        <div className={props.dead ? "avenger-tile avenger-tile-dead" : "avenger-tile"} style={styles}>
            {props.name}
        </div>
    )
}