import { BasicInfo } from "@/app/interfaces/accountTyps";
import styles from './AccountAside.module.css';

export default function AccountAside(basic:BasicInfo) {
    
    return (
        <aside className={styles.aside}>
        <div className={`${styles.profileInfo} profileInfo`}>
          <img src="/images/profile_image.svg" alt="Profile" />
          <h5>{basic.FirstName} {basic.LastName}</h5>
          <p>{basic.Email}</p>
        </div>
        <nav className={styles.asideNav}>
            <a className="btn-theme-s" href="/Account/Details"><i className="fa-regular fa-right-from-bracket"></i>Account Details</a>
            <a className="btn-transparent" href="/Auth/SignOut"><i className="fa-regular fa-right-to-bracket"></i>Sign Out</a>
        </nav>
        </aside>
    );
  }
  