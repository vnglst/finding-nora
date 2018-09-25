import { faCog, faInfoCircle, faRedo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import 'index.css'
import React from 'react'
import BackgroundImage from 'shared/components/BackgroundImage'
import BottomBar from 'shared/components/BottomBar'
import Button from 'shared/components/Button'
import Grid from 'shared/components/Grid'
import Input from 'shared/components/Input'
import Overlay from 'shared/components/Overlay'
import festen from 'https://res.cloudinary.com/vnglst/image/upload/v1537882150/festen.jpg'

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))

storiesOf('BottomBar', module).add('with Home, Refresh and Settings', () => (
  <BottomBar value="home" onChange={action('menu item changed')}>
    <BottomBar.Item
      aria-label="New game"
      value="new-game"
      icon={<FontAwesomeIcon icon={faRedo} />}
    />
    <BottomBar.Item
      aria-label="Settings"
      value="settings"
      icon={<FontAwesomeIcon icon={faCog} />}
    />
    <BottomBar.Item
      aria-label="About this app"
      value="about"
      icon={<FontAwesomeIcon icon={faInfoCircle} />}
    />
  </BottomBar>
))

storiesOf('Grid', module).add('with 3 items ', () => (
  <Grid>
    <Grid.Item
      key="some-key"
      onMouseDown={action('pressed')}
      onTouchStart={action('touched')}
      wrong={false}
      correct={true}
      almostCorrect={false}
    >
      1
    </Grid.Item>
    <Grid.Item
      key="some-key-2"
      onMouseDown={action('pressed')}
      onTouchStart={action('touched')}
      wrong={true}
      correct={false}
      almostCorrect={false}
    >
      2
    </Grid.Item>
    <Grid.Item
      key="some-key-3"
      onMouseDown={action('pressed')}
      onTouchStart={action('touched')}
      wrong={false}
      correct={false}
      almostCorrect={true}
    >
      3
    </Grid.Item>
  </Grid>
))

storiesOf('Overlay', module).add('with button', () => (
  <Overlay>
    <p>YOU LOST</p>
    <Button onMouseDown={action('restart')}>Play again?</Button>
  </Overlay>
))

storiesOf('BackgroundImage', module).add(
  'with image and example button',
  () => (
    <BackgroundImage imageSrc={festen}>
      <Button onMouseDown={action('restart')}>Press me</Button>
    </BackgroundImage>
  )
)

storiesOf('Input', module)
  .add('with invalid input', () => (
    <Input
      valid={false}
      type="text"
      name="solution"
      maxLength={9}
      placeholder="NORA"
      onChange={action('typing')}
      onBlur={action('leaving input')}
      required
    />
  ))
  .add('with valid input', () => (
    <Input
      valid={true}
      type="text"
      name="solution"
      maxLength={9}
      placeholder="NORA"
      onChange={action('typing')}
      onBlur={action('leaving input')}
    />
  ))
