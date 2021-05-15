import { FC } from "react"
import { css } from "@emotion/react"

const dotStyle = css`
  padding-top: 0.4em;
  background-position: top left -2px;
  background-repeat: repeat-x;
  background-size: 1.3em 0.3em;
  background-image: radial-gradient(
    0.15em 0.15em at center center,
    orange,
    orange 100%,
    transparent
  );
`

const Dot: FC = () => {
  return <span css={dotStyle}></span>
}

export default Dot
