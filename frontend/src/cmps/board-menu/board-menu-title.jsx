import { BsChevronLeft } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

export function MenuTitle({ title, setIsMenuHidden, setIsOn, goBackClass, setTitle, setSetting }) {

    function onGoBack() {
        setIsOn(prevIsOn => !prevIsOn)
        setTitle('Menu')
        setSetting('')
    }

    function onCloseMenu() {
        console.log(goBackClass)
        setIsMenuHidden(prevIsMenuHidden => !prevIsMenuHidden)
        setTitle('Menu')
        setIsOn(true)
        setSetting('')
    }

    return (
        <section className="menu-header flex center">
            <button className={`arrow-left ${goBackClass}`} onClick={onGoBack}><BsChevronLeft /></button>
            <h3>{title}</h3>
            <button
                className='x-icon' title="Close the board menu" onClick={onCloseMenu}>
                <HiXMark />
            </button>
        </section>
    )
}