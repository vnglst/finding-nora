import * as React from 'react'
import Button from '../UI/Button'
import Overlay from '../UI/Overlay'
import './AboutPage.css'

export interface IAboutPageProps {
  onClosePage: () => void
}

const AboutPage = ({ onClosePage }: IAboutPageProps) => {
  return (
    <Overlay className="about-page">
      <p>
        Game created by{' '}
        <a target="_blank" href="https://koenvangilst.nl">
          Koen van Gilst
        </a>
      </p>
      <p>Extensive beta testing by my kids 🐵🐵</p>
      <p>
        Source code on{' '}
        <a target="_blank" href="https://github.com/vnglst/finding-nora">
          Github
        </a>
      </p>
      <Button onClick={onClosePage}>Back</Button>
    </Overlay>
  )
}

export default AboutPage
