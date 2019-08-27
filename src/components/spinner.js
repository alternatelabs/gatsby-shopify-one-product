import styled from "@emotion/styled"

const Spinner = styled.div`
display: inline-block;
width: 64px;
height: 64px;

&:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #9b9b9b;
  border-color: #9b9b9b transparent #9b9b9b transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`

export default Spinner
