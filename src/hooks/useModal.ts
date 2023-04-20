import { useState } from 'react';

const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
    const [header, setHeader] = useState("");

    function toggle() {
        setIsShowing(!isShowing);
    }

    function assignHeader(header: string) {
        setHeader(header);
    }

    return {
        show: isShowing,
        setShow: toggle,
        header,
        setHeader: assignHeader
    }
}

export default useModal;