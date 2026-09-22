const styles = {
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
    menu: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: "25vh"
    },
    title: {
        textAlign: 'center',
        color: '#dfe533'
    },
    backButtonDisplay: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 0,
    },
    backButton: {
        color: 'white',
        backgroundColor: '#ff2e35',
        position: 'absolute',
        padding: '10px 20px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '0px 0px 5px 0px',
        fontWeight: 'bold'
    }
} as const

export default styles
