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
        color: '#dfe533',
        //WebkitTextStroke: '.5px black'
    },
    form: {
        display: 'flex',
        gap: 10,
    }
} as const

export default styles
