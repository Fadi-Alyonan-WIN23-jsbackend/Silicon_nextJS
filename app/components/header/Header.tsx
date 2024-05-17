import Style from './Header.module.css'

export default function Header() {
    return (
        <header className={Style.header} >
            <div className={`container ${Style.container}`}>
                <a href="/">
                    <img id={Style.logo} src="/images/silicon-logo-litght_theme.svg" alt="logotype for Silicon" />
                </a>

                <div id={Style.menu}>
                    <nav>
                        <a href="/#overview" className={`menuLink ${Style.menuLink}`}>Overview</a>
                        <a href="/#features" className={`menuLink ${Style.menuLink}`}>Features</a>
                        <a href="/courses" className={`menuLink ${Style.menuLink}`}>Courses</a>
                        <a href="/contact" className={`menuLink ${Style.menuLink}`}>Contact</a>
                    </nav>
                </div>

                <div className={`btn-switch ${Style.btnswitch}`}>
                    <label>Light</label>
                    <label className="switch" htmlFor="switch-mode">
                        <input id="switch-mode" type="checkbox"  />
                        <span className="slider round"></span>
                    </label>
                    <label>Dark</label>
                </div>

                <div id={Style.accountButtons}>
                    <div className={Style.div}>
                        <a href="/accountDetails" className="btn-theme"><i className="btn-icon fa-regular fa-user"></i><span>My account</span></a>
                    </div>
                </div>
                <button  id="mobilemenu" className={`btn-mobilemenu ${Style.btnmobilemenu}`}>
                    <i className="fa-regular fa-bars"></i>
                </button>
               
            </div>
        </header>
    );
}

