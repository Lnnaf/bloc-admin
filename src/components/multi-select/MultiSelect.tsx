import { FunctionComponent, useRef, useEffect } from "react";
import Form from 'react-bootstrap/Form';
interface MultiSelectProps {

}

const MultiSelect: FunctionComponent<MultiSelectProps> = () => {
    const selectRef = useRef(null as any);

    useEffect(() => {
        // selectRef.current.multiselect({
        //     nonSelectedText: 'Select Framework',
        //     enableFiltering: true,
        //     enableCaseInsensitiveFiltering: true,
        //     buttonWidth: '400px'
        // })
    }, [])

    return (
        <>
            <Form.Select aria-label="Floating label select example" ref={selectRef} >
                <option>
                   
                    Open this select menu

                </option>
                <option 
                value="1">
                     <input
                        type="checkbox"/>One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </>
    );
}

export default MultiSelect;