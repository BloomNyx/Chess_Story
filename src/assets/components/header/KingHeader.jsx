export default function KingHeader({ chapters = [], labels = [], activeChapter = "", onSelect = () => {} }) {
  return (
    <nav className="king-nav">
      <span className="king-nav__symbol">♔ The King</span>
      <ul className="king-nav__chapters">
        {(Array.isArray(chapters) ? chapters : []).map((id, index) => (
          <li
            key={id}
            className={`king-nav__chapter${activeChapter === id ? " active" : ""}`}
            onClick={() => onSelect(id)}
          >
            {labels[index]}
          </li>
        ))}
      </ul>
    </nav>
  );
}
