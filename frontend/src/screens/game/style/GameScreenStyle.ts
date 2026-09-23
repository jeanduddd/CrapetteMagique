const GameStyles = {
    screen: {
        backgroundColor: 'darkgreen',
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    border: {
        border: 1,
        borderColor: "black",
        borderStyle:"dashed",
    }
} as const

export default GameStyles
