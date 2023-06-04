import Ofir from '../../assets/img/members/ofir-pic.jpg'
import Etai from '../../assets/img/members/etai-pic.jpg'
import Tamar from '../../assets/img/members/tamar-pic.jpg'
import { BsPlusLg } from 'react-icons/bs'

export function ShowMembersLabels() {

    return (
        <section className="members-labels">
            <div className="members-wrapper">
                <h5>Members</h5>
                <div className="members">
                    <img src={Ofir} className="member-img" alt="" />
                    <img src={Etai} className="member-img" alt="" />
                    <img src={Tamar} className="member-img" alt="" />
                    <button className="add-member">
                        <BsPlusLg />
                    </button>
                </div>
            </div>
            <div className="labels-wrapper">
                <h5>Labels</h5>
                <div className="labels">
                    <button className="label-btn">Logic</button>
                    <button className="add-label">
                        <BsPlusLg />
                    </button>
                </div>
            </div>
        </section>
    )
}