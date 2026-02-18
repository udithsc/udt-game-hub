interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  if (!score) return null;

  let bg = '';
  let color = '';
  let glow = '';

  if (score > 75) {
    bg = 'rgba(72, 199, 142, 0.18)';
    color = '#48c78e';
    glow = '0 0 8px rgba(72, 199, 142, 0.4)';
  } else if (score > 60) {
    bg = 'rgba(255, 199, 0, 0.18)';
    color = '#ffc700';
    glow = '0 0 8px rgba(255, 199, 0, 0.4)';
  } else {
    bg = 'rgba(255, 94, 94, 0.18)';
    color = '#ff5e5e';
    glow = '0 0 8px rgba(255, 94, 94, 0.4)';
  }

  return (
    <span
      style={{
        background: bg,
        color: color,
        fontSize: '11px',
        fontWeight: 800,
        padding: '3px 8px',
        borderRadius: '8px',
        letterSpacing: '0.04em',
        border: `1px solid ${color}40`,
        boxShadow: glow,
        backdropFilter: 'blur(8px)',
        display: 'inline-block',
        lineHeight: 1.5,
      }}
    >
      {score}
    </span>
  );
};

export default CriticScore;
