import { useState } from "react";
import { ModalPortal } from "./Modal";


interface Props {
    url: any
    title: any
    text: any
    children: any
}


export const WebShare = ({ url, title, text, children }: Props) => {
    const [isSupported, setIssupported] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const shareDetails = { url, title, text };



    const handleSharing = async () => {
        if (navigator.share) {
            setIssupported(true)
            try {
                await navigator
                    .share(shareDetails)
                    .then(() =>
                        console.log("Hooray! Your content was shared to tha world")
                    );
            } catch (error) {
                console.log(`Oops! I couldn't share to the world because: ${error}`);
            }
        } else {
            // fallback code
            setIssupported(false)
            setShowModal(true)
        }
    };
    return (
        <>
            <div onClick={handleSharing}>
                {children}
            </div>
            <div>
                {isSupported ? "" : <ModalPortal showModal={showModal} closeModal={() => setShowModal(false)} />}
            </div>
        </>
    )
}

