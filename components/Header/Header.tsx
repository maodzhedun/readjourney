// components/Header/Header.tsx

import Link from 'next/link';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        Ready Journey
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/library">Library</Link>
          </li>
          <li>
            <Link href="/reading">Reading</Link>
          </li>
          <li>
            <Link href="/recommended">Recommended</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
