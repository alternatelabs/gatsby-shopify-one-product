import React from "react"
import styled from "@emotion/styled"

const Button = styled.button`
  border: none;
  background-color: #121212;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont,
   "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
   "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 16px;
  cursor: pointer;
  outline: none;
  width: ${props => props.fullWidth ? "100%" : "auto"}
`

export default Button
