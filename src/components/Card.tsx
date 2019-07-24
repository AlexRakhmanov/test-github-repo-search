import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;
border: 1px solid black;
border-radius: 4px;
padding: 10px;
`;

interface Props {
  data: object 
}

class Card extends React.Component<Props, {}> {
  render() {
    const data: any = this.props.data;

    return (
    <Wrapper>
      <div className="container">
        <a href={data.html_url} className="repo" target="_black">{data.name}</a>
        <p className="stars">{data.stargazers_count} Stars</p>
        <p className="watchers">{data.watchers_count} Watchers</p>
      </div>
    </Wrapper>
    )
  }
} 

export default Card;