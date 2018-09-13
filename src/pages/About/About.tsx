import Button from 'components/UI/Button'
import Overlay from 'components/UI/Overlay'
import * as React from 'react'
import './About.css'

interface IAboutPageProps {
  onClose: () => void
}

const AboutPage = ({ onClose }: IAboutPageProps) => {
  return (
    <Overlay className="about-page">
      <p>
        Game created by <a href="https://koenvangilst.nl">Koen van Gilst</a>
      </p>
      <p>Extensive beta testing by my kids 🐵🐵</p>
      <p>
        Source code on{' '}
        <a href="https://github.com/vnglst/finding-nora">Github</a>
      </p>
      <Button onClick={onClose}>Back</Button>
    </Overlay>
  )
}

export default AboutPage
