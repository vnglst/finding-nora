import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from '../src/components/Button'

storiesOf('MyButton', module)
  .add('with text', () => (
    <MyButton onClick={action('clicked')}>Hello Button</MyButton>
  ))
  .add('with some emoji', () => (
    <MyButton onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </MyButton>
  ))
