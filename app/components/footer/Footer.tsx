import styles from './Footer.module.css'

export default function Footer() {
    return (
      <footer >
        <div className="container">
            <div className={styles.socialmedia}>
                <a className="btn-social" href="#"><i className="fa-brands fa-facebook"></i></a>
                <a className="btn-social" href="#"><i className="fa-brands fa-square-x-twitter"></i></a>
                <a className="btn-social" href="#"><i className="fa-brands fa-instagram"></i></a>
                <a className="btn-social" href="#"><i className="fa-brands fa-youtube"></i></a>
            </div>
            <p className={styles.p}>&copy; 2024 Silicon. All rights reserved. Pulvinar urna condimentum amet tempor, ornare integer. Lorem odio justo malesuada suspendisse viverra aliquet quisque turpis non. Feugiat in odio non nunc ornare consectetur.</p>
        </div>
      </footer>
    );
  }
  