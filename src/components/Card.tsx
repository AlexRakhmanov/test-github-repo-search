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
  data: any 
}

class Card extends React.Component<Props, {}> {
  render() {
    return (
    <Wrapper>
      <div className="container">
        <a href={this.props.data.html_url} className="repo" target="_black">{this.props.data.name}</a>
        <p className="stars">{this.props.data.stargazers_count} Stars</p>
        <p className="watchers">{this.props.data.watchers_count} Watchers</p>
      </div>
    </Wrapper>
    )
  }
} 

export default Card;