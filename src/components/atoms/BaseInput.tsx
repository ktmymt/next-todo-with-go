import { FC, Fragment } from "react"
import { css } from "@emotion/react"
import { Colors } from "../../styles/colors"

interface Props {
  type: string
  value?: string
  placeholder?: string
  hasLabel?: boolean
  onChangeText?: (text: string) => void
  onPressEnter?: (key: string) => void
}

const inputStyle = css`
  background-color: ${Colors.darkBlueGray};
  width: 75%;
  padding: 20px;
  border: none;
  border-radius: 15px;
  outline: 0;
  color: ${Colors.white};

  &::placeholder {
    color: ${Colors.offWhite};
  }
`

const labelInputStyle = css`
  position: relative;
  width: 77%;
  margin: 20px 0;

  input {
    font: 15px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    padding: 0.3em;
    transition: 0.3s;
    letter-spacing: 1px;
    color: #aaaaaa;
    border: none;
    border-bottom: 2px solid ${Colors.veryLightGray};
    background: transparent;
  }
  input:focus {
    border-bottom: 2px solid ${Colors.purple};
    outline: none;
  }
`

const BaseInput: FC<Props> = (props) => {
  return (
    <Fragment>
      {props.hasLabel && (
        <div css={labelInputStyle}>
          <label>
            <input
              type="text"
              value={props.value}
              placeholder={props.placeholder}
              onChange={(e) => props.onChangeText && props.onChangeText(e.target.value)}
              onKeyPress={(e) => props.onPressEnter && props.onPressEnter(e.key)}
            />
          </label>
        </div>
      )}

      {!props.hasLabel && (
        <input
          type={props.type}
          css={inputStyle}
          value={props.value}
          placeholder={props.placeholder}
          onChange={(e) => props.onChangeText(e.target.value)}
        />
      )}
    </Fragment>
  )
}

export default BaseInput
