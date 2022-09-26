import * as React from "react"

const ProfileIcon = (props) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ cursor:'pointer' }}
  >
    <path
      d="M12.675 25.378c.214 0 .436.007.65 0 4.193-.061 8.185-.532 8.908-1.22.167-1.526.37-2.264-6.392-5.462-.962-.54-.453-2.629-.453-2.629 2.036-1.536 3.434-5.095 3.434-7.947 0-4.928-2.222-7.259-5.495-7.501h-.651c-3.268.242-5.49 2.573-5.49 7.501 0 2.852 1.392 6.41 3.43 7.947 0 0 .507 2.09-.45 2.629-6.768 3.198-6.565 3.937-6.397 5.461.722.688 4.713 1.16 8.905 1.221Z"
      fill="#000"
    />
  </svg>
)

export default ProfileIcon