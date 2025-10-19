'use client';

import { useEffect, useState } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: '#agent-profile', text: 'PROFILE', key: '1' },
    { href: '#case-files', text: 'CASES', key: '2' },
    { href: '#intelligence', text: 'INTEL', key: '3' },
    { href: '#comms', text: 'COMMS', key: '4' },
    { href: '#status', text: 'STATUS', key: '5' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      if (key >= '1' && key <= '5') {
        const index = parseInt(key) - 1;
        const navItem = navItems[index];
        if (navItem) {
          const element = document.querySelector(navItem.href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="logo-text">
          DETECTIVE_v2.0
        </div>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, item.href)}
                title={`Press ${item.key} to navigate`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;