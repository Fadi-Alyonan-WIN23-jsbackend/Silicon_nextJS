import { BasicInfo } from "@/app/interfaces/accountTyps";
import { Props } from "@/app/interfaces/accountTyps";


export default function AccountAside({ basic, address, errorMessage }: Props) {
    return (
        <aside className="aside">
            <div className="profileinfo">
                <img src="/images/profile_image.svg" alt="Profile" />
                <h5 className="profileinfo-h5">{basic.FirstName} {basic.LastName}</h5>
                <p className="profileinfo-p">{basic.Email}</p>
                <p className="profileinfo-p">{basic.PhoneNumber}</p>
            </div>
            <nav className="asideNav">
                <a className="btn-theme-s" href="/accountDetails"><i className="fa-regular fa-right-from-bracket"></i>Account Details</a>
                <a className="btn-transparent" href="/Auth/SignOut"><i className="fa-regular fa-right-to-bracket"></i>Sign Out</a>
            </nav>
        </aside>
    );
}
  