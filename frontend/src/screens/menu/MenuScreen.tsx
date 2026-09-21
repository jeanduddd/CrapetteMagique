import JoinGameButton from "./components/JoinGameButton"
import NameField from "./components/NameField"
import type { MenuProps } from "./properties/menuProps"

const MenuScreen = ({name, handleNameChange, handleClick}: MenuProps ) => {
    return (
        <>
            <h1>Crapette Magique</h1>
            <NameField name={name} handleNameChange={handleNameChange}></NameField>
            <JoinGameButton handleClick={handleClick}></JoinGameButton>
        </>
    )//join game button
}

export default MenuScreen