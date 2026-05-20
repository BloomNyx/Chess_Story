export default function KnightHeader({ chapters = [], labels = [], activeChapter = "", onSelect = () => {} }) {
  return (
    <nav className="knight-nav">
      <span className="knight-nav__symbol">♞ Knight</span>
      <ul className="knight-nav__chapters">
        {(Array.isArray(chapters) ? chapters : []).map((id, index) => (
          <li
            key={id}
            className={`knight-nav__chapter${activeChapter === id ? " active" : ""}`}
            onClick={() => onSelect(id)}
          >
            {labels[index]}
          </li>
        ))}
      </ul>
    </nav>
  );
}
