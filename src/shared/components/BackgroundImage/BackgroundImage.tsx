import cx from 'classnames'
import * as React from 'react'
import './BackgroundImage.css'

interface Props {
  className?: string
  imageSrc: string
  children: React.ReactNode
}

const BackgroundImage = ({ className, imageSrc, children }: Props) => (
  <div
    className={cx('background', className)}
    style={{
      backgroundImage: `url('${imageSrc}')`
    }}
  >
    {children}
  </div>
)

export default BackgroundImage
