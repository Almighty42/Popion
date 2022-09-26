import React, { useContext } from 'react'
import { AuthContext } from 'src/context'

const LikeFalse = (props) => {

  const { user } = useContext(AuthContext)

  return (
    <svg
    width={32}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ cursor:`${user && 'pointer'}` }}
  >
    <path
      d="M22.301 3.333c-2.437-.809-5.045-.104-6.798 1.67-1.754-1.775-4.363-2.479-6.8-1.67l-.002.001c-3.518 1.173-5.552 5.124-4.358 8.904l.002.004c.184.58.508 1.146.832 1.635.34.513.754 1.051 1.204 1.588.899 1.075 2.006 2.228 3.099 3.28a46.339 46.339 0 0 0 3.12 2.764c.454.362.887.683 1.262.922.185.12.388.238.591.333.146.069.516.236.962.236.443 0 .81-.165.956-.232a5.34 5.34 0 0 0 .593-.33c.378-.237.817-.556 1.28-.917a47.247 47.247 0 0 0 3.177-2.76c1.114-1.05 2.244-2.203 3.16-3.28.458-.537.88-1.076 1.226-1.59.33-.49.66-1.061.848-1.65v-.003c1.196-3.783-.835-7.737-4.354-8.905Z"
      stroke="#AB000D"
      strokeWidth={3}
    />
  </svg>
  )
}

export default LikeFalse