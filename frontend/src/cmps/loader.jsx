import LoaderIcon from '../assets/img/svg/loader.svg'
export function Loader() {
    return (
        <div className='loader'>
            <img src={LoaderIcon} alt="Loading..." />
        </div>
    )
}