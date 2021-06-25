import { FC } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../../styles/colors"

const dotStyle = css`
  color: ${Colors.lightGray};
  list-style: none;
  margin-top: 15px;
  border-radius: 10px;
`

const test = css`
  width: 100px;
  height: 100px;
  text-align: center;
  display: flex;
`

const DotSquare: FC = () => {
  const dotNum = 10

  return (
    <ul css={test}>
      {[...Array(dotNum)].map((e, i) => {
        return (
          <li key={i} css={dotStyle}>
            ・
          </li>
        )
      })}
    </ul>
  )
}

export default DotSquare
