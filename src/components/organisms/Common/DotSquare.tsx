import { FC } from "react"
import { Dot } from "../../atoms"

const DotSquare: FC = () => {
  const dotNum = 10

  return (
    <div>
      {[...Array(dotNum)].map((e, i) => {
        return <Dot key={i} />
      })}
    </div>
  )
}

export default DotSquare
