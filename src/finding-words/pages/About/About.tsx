import * as React from "react";
import Button from "shared/components/Button";
import Overlay from "shared/components/Overlay";
import "./About.css";

interface IAboutPageProps {
  onClose: () => void;
}

const AboutPage = ({ onClose }: IAboutPageProps) => {
  console.log(process.env);
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
      <small>v{process.env.REACT_APP_VERSION}</small>
      <Button onClick={onClose}>Back</Button>
    </Overlay>
  );
};

export default AboutPage;
