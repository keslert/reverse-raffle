import styled from 'styled-components';
import tinycolor from 'tinycolor2';

export default styled.div.attrs({
  className: 'dib ph3 pv3 bg-white br2 tc pointer w-100'
})`
  transition: background .15s ease-in;
  ${props => `
    background: ${props.theme.primary};
    color: ${props.theme.text};
    &:hover {
      background: ${tinycolor(props.theme.primary).darken(5).toString()};
    }
  `}
`