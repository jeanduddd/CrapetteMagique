const styles = {
    hand1: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: window.innerWidth/7
    },
    hand2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: window.innerWidth/5
    }
} as const

export default styles

