export default function AvengerTile(props) {

    const styles = {
        color: props.color,
        backgroundColor: props.backgroundColor
    }

    return(
        <div className="avenger-tile" style={styles}>
            {props.name}
        </div>
    )
}