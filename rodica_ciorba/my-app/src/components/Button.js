import styled from 'styled-components';
const Button = styled.button`
  border: .1rem solid grey;
  color: grey;
  cursor: pointer;
  font-size: 1.4rem;
  line-height: 1.2;
  padding: 1.6rem 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  text-align: center;
  outline: none;
  width: 50%;
  &:hover {
    background-color: ${props => props.bg};
    color: white;
  }
  `;

export default Button;
