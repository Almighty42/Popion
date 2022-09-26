import * as React from "react"

const CommentIcon2 = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ cursor:'pointer' }}
  >
    <path
      d="M4.474 4.569h15.052v1.784H4.474V4.57ZM4.474 8.137H12v1.785H4.474V8.137ZM4.474 11.706h12.158v1.785H4.474v-1.785Z"
      stroke="#046"
    />
    <path
      clipRule="evenodd"
      d="M17.21 17.06h4.053c1.464 0 1.737-.315 1.737-1.785V2.785C23 1.35 22.658 1 21.263 1H2.737C1.307 1 1 1.315 1 2.784v12.474c0 1.468.237 1.801 1.737 1.801h7.526s5.536 5.208 6.224 5.836c.244.223.742.103.724-.483V17.06Zm-.578-5.354H4.474v1.785h12.158v-1.785ZM12 8.137H4.474v1.785H12V8.137Zm7.526-3.568H4.474v1.784h15.052V4.57Z"
      stroke="#046"
    />
  </svg>
)

export default CommentIcon2
