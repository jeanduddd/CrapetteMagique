import type { NameFieldProps } from "../properties/nameFieldProps";
import { useWindowSize } from "../../../screenSize";

const NameField = ({ name, handleNameChange }: NameFieldProps) => {

    const [width, height] = useWindowSize();

    const TextFontSize = Math.min(Math.min(height, width) * 0.04, 13)

    return (
        <input
            style={{fontSize: TextFontSize}}
            type="text" 
            placeholder="Enter your name..." 
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
        />
    );
};

export default NameField