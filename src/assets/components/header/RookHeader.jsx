export default function RookHeader({ chapters = [], labels = [], activeChapter = "", onSelect = () => {} }) {
  return (
    <nav className="rook-nav">
      <span className="rook-nav__symbol">♜ ROOK</span>
      <ul className="rook-nav__chapters">
        {(Array.isArray(chapters) ? chapters : []).map((id, index) => (
          <li
            key={id}
            className={`rook-nav__chapter${activeChapter === id ? " active" : ""}`}
            onClick={() => onSelect(id)}
          >
            {labels[index]}
          </li>
        ))}
      </ul>
    </nav>
  );
}
