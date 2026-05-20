export default function BishopHeader({ chapters = [], labels = [], activeChapter = "", onSelect = () => {} }) {
  return (
    <nav className="bishop-nav">
      <span className="bishop-nav__symbol">♝ The Bishop</span>
      <ul className="bishop-nav__chapters">
        {(Array.isArray(chapters) ? chapters : []).map((id, index) => (
          <li
            key={id}
            className={`bishop-nav__chapter${activeChapter === id ? " active" : ""}`}
            onClick={() => onSelect(id)}
          >
            {labels[index]}
          </li>
        ))}
      </ul>
    </nav>
  );
}
