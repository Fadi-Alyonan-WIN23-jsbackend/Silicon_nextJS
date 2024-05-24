import { cookies } from 'next/headers';
import Style from './Header.module.css'

export default function Header() {
    const isSignedIn = cookies().get('Authorization')
    
    return (
        <header className={Style.header} >
            <div className={`container ${Style.container}`}>
                <a href="/">
                    <img id={Style.logo} src="/images/silicon-logo-litght_theme.svg" alt="logotype for Silicon" />
                </a>
                <div id={Style.menu}>
                    {isSignedIn ? 
                    (
                    <nav>
                        <a href="/courses" className={`menuLink ${Style.menuLink}`}>Courses</a>
                    </nav>

                    ) : (
                        <nav>
                        </nav>
                    )}
                    
                </div>

                <div className={`btn-switch ${Style.btnswitch}`}>
                    <label>Light</label>
                    <label className="switch" htmlFor="switch-mode">
                        <input id="switch-mode" type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                    <label>Dark</label>
                </div>

                <div id={Style.accountButtons}>
                {isSignedIn ? (
                    <div className={Style.div}>
                        <a href="/accountDetails" className="btn-theme"><i className="btn-icon fa-regular fa-user"></i><span>My account</span></a>
                    </div>

                ) : (
                    <div className={Style.div}>
                        <a className="btn-gray" href="/auth/signIn"><i className="fa-regular fa-right-to-bracket"></i><span>Sign In</span></a>
                        <a className="btn-theme"href="/auth/signUp"><i className="fa-regular fa-user"></i><span>Sign Up</span></a>
                    </div>

                )}
                </div>
            </div>
        </header>
    );
}

