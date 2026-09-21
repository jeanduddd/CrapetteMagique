import type { NameFieldProps } from "../properties/nameFieldProps";

const NameField = ({ name, handleNameChange }: NameFieldProps) => {
    return (
        <input
            type="text" 
            placeholder="Enter your name..." 
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
        />
    );
};

export default NameField