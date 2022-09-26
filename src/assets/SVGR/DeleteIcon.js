import * as React from "react"

const DeleteIcon = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ cursor:'pointer', marginLeft:'10px' }}
    onClick={ () => { props.deletePost() } }
  >
    <path
      d="M6.81 8.38v8.906H8.38V8.38H6.81Zm3.143 0v8.906h1.571V8.38H9.953Zm3.143 0v8.906h1.57V8.38h-1.57Zm1.57-6.285c0-1.31-.318-1.571-1.57-1.571H7.856c-1.32 0-1.56.288-1.56 1.576l-.011 1.567h-4.19c-.776 0-1.048.256-1.048 1.047v.524c0 .812.272 1.048 1.047 1.048h.524v13.619c0 1.304.288 1.571 1.572 1.571h12.571c1.31 0 2.095-.246 2.095-1.571V6.285h.524c.791 0 1.048-.25 1.048-1.047v-.524c0-.775-.225-1.047-1.048-1.047h-4.714V2.095Zm-1.57 0v1.572H7.856V2.095h5.238Zm-7.858 4.19h11v12.572h-11V6.286Z"
      fill="#F21616"
    />
  </svg>
)

export default DeleteIcon
