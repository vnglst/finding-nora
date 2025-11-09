import Button from "../components/Button";
import Overlay from "../components/Overlay";
import "./About.css";

interface Props {
  onClose: () => void;
}

export default function AboutPage({ onClose }: Props) {
  return (
    <Overlay className="about-page">
      <p>
        Game created by <a href="https://koenvangilst.nl">Koen van Gilst</a>
      </p>
      <p>
        Extensive beta testing by my kids{" "}
        <span role="img" aria-label="two emoji monkeys">
          🐵🐵
        </span>
      </p>
      <p>
        Source code on{" "}
        <a href="https://github.com/vnglst/finding-nora">Github</a>
      </p>
      <small>
        v{import.meta.env.VITE_VERSION} git: {import.meta.env.VITE_GIT_SHA}
      </small>
      <Button onClick={onClose}>Back</Button>
    </Overlay>
  );
}
