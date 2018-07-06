import cx from 'classnames'
import * as React from 'react'
import './BackgroundImage.css'

interface IBackgroundImage {
  className?: string
  imageSrc: any
  children: React.ReactNode
}

const BackgroundImage = ({
  className,
  imageSrc,
  children,
  ...other
}: IBackgroundImage) => (
  <div>
    <div
      className={cx('background-image', className)}
      style={{ backgroundImage: `url('${imageSrc}')` }}
      {...other}
    />
    <div className="background-image-children">{children}</div>
  </div>
)

export default BackgroundImage
