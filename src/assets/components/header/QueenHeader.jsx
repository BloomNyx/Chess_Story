export default function QueenHeader({ chapters = [], activeSection = "", hoverProps = {} }) {
  return (
    <nav className="nav" role="navigation">
      <a className="nav__logo" href="#prologue" {...hoverProps}>
        THE KING'S GAME
      </a>
      <ul className="nav__chapters">
        {(Array.isArray(chapters) ? chapters : []).map((ch) => (
          <li key={ch.id}>
            <a
              href={`#${ch.id}`}
              className={`nav__link${activeSection === ch.id ? " nav__link--active" : ""}`}
              {...hoverProps}
            >
              {ch.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
