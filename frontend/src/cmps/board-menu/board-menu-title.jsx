import { BsChevronLeft } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";

export function MenuTitle({ title, setIsMenuHidden, setIsOn, goBackClass, setTitle }) {

    function onGoBack() {
        setIsOn(prevIsOn => !prevIsOn)
        setTitle('Menu')
    }

    function onCloseMenu() {
        console.log(goBackClass)
        setIsMenuHidden(prevIsMenuHidden => !prevIsMenuHidden)
        setTitle('Menu')
        setIsOn(true)
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