import JoinGameButton from "./components/JoinGameButton"
import NameField from "./components/NameField"
import type { MenuProps } from "./properties/menuProps"
import styles from "./style/menuScreenStyle"
import '../../index.css'

const MenuScreen = ({name, handleNameChange, handleClick}: MenuProps ) => {

    const fallingCards = [
    { id: 1, left: '5%', delay: '0s', duration: '5s', width: '100px', src: '/heart_1.png' },
    { id: 2, left: '25%', delay: '2s', duration: '7s', width: '80px', src: '/spade_13.png' },
    { id: 3, left: '50%', delay: '4s', duration: '6s', width: '110px', src: '/diamond_10.png' },
    { id: 4, left: '75%', delay: '1s', duration: '8s', width: '90px', src: '/club_12.png' },
    { id: 5, left: '95%', delay: '3s', duration: '5.5s', width: '120px', src: '/heart_7.png' },
    
    { id: 6, left: '15%', delay: '1.5s', duration: '4.5s', width: '95px', src: '/club_2.png' },
    { id: 7, left: '35%', delay: '5s', duration: '9s', width: '70px', src: '/diamond_1.png' },
    { id: 8, left: '45%', delay: '0.5s', duration: '5.2s', width: '105px', src: '/spade_7.png' },
    { id: 9, left: '60%', delay: '3.5s', duration: '6.8s', width: '85px', src: '/heart_12.png' },
    { id: 10, left: '85%', delay: '6s', duration: '7.5s', width: '115px', src: '/club_10.png' },
    
    { id: 11, left: '10%', delay: '7s', duration: '6s', width: '90px', src: '/spade_3.png' },
    { id: 12, left: '30%', delay: '0.8s', duration: '4s', width: '130px', src: '/diamond_11.png' },
    { id: 13, left: '55%', delay: '2.5s', duration: '8.5s', width: '75px', src: '/heart_4.png' },
    { id: 14, left: '70%', delay: '5.5s', duration: '5s', width: '110px', src: '/club_1.png' },
    { id: 15, left: '90%', delay: '1.2s', duration: '9.5s', width: '80px', src: '/spade_9.png' },
];

    return (
        <div style={{...styles.screen, position: "relative"}}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                {fallingCards.map((item) => (
                    <img 
                        key={item.id}
                        src={item.src}
                        className="fallingCard"
                        style={{ 
                            left: item.left, 
                            animationDelay: item.delay, 
                            animationDuration: item.duration,
                            width: '100px'
                        }} 
                    />
                ))}
            </div>
            <div style={{...styles.menu, zIndex: 0, position: "absolute" }}>
                <h1 style={styles.title}>Crapette Magique</h1>
                <div style={styles.form}>
                    <NameField name={name} handleNameChange={handleNameChange}></NameField>
                    <JoinGameButton handleClick={handleClick}></JoinGameButton>
                </div>
            </div>
        </div>
    )
}

export default MenuScreen