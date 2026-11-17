export default function AvengerTile(props) {

    const styles = {
        color: props.color,
        backgroundColor: props.backgroundColor
    }

    return(
        <div className="avenger-tile avenger-tile-dead" style={styles}>
            {props.name}
        </div>
    )
}