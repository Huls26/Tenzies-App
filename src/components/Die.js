export default function Die({id, value, selectDice, isHeld }) {
    let styles = {
        backgroundColor: isHeld ? "#59E391" : "transparent"
    }

    return (
        <div 
            style={ styles }
            className="die-container" 
            onClick={ selectDice }
        >
            <h1 className="die--value">{value}</h1>
        </div>
    )
}