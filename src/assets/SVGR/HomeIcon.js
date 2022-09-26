import * as React from "react"

const HomeIcon = (props) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ cursor:'pointer', marginRight:'25px' }}
  >
    <path
      d="M1.66 9.735c-.063.024-.1.056-.112.092l.111-.092Zm-.112.092v12.769c0 1.554.303 1.856 1.857 1.856h4.333c1.554 0 1.857-.285 1.857-1.857v-4.952h5.572v4.971c0 1.554.316 1.845 1.857 1.838.025.02 4.333 0 4.333 0 1.566 0 1.858-.325 1.858-1.855V10.211c0-.05-.056-.093-.168-.142L12.381.929 1.66 9.735l-.111.092Z"
      fill="#000"
    />
  </svg>
)

export default HomeIcon
