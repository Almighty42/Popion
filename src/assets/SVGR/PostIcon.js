import * as React from "react"

const PostIcon = (props) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M22.303 12.277 4.428 3.339a.813.813 0 0 0-.877.098.813.813 0 0 0-.268.812L5.688 13 3.25 21.726a.812.812 0 0 0 .813 1.024.813.813 0 0 0 .365-.09l17.875-8.937a.813.813 0 0 0 0-1.446ZM5.322 20.402l1.795-6.59h7.508v-1.624H7.117l-1.795-6.59L20.117 13 5.322 20.402Z"
        fill="#F0F2F5"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h26v26H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default PostIcon
