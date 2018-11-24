import React from 'react'
import styled from 'styled-components'

const Centered = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    .cube {
      margin: 100px auto;
      width: 40px;
      height: 40px;
      position: relative;
    }

    .cube1 {
        background-color: #333;
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
        animation: sk-cubemove 1.8s infinite ease-in-out;
      }
      
      .cube2 {
        background-color: #333;
        width: 15px;
        height: 15px;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
        animation: sk-cubemove 1.8s infinite ease-in-out;
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
      }
      
      @-webkit-keyframes sk-cubemove {
        25% {
          -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
        }
      
        50% {
          -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        }
      
        75% {
          -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        }
      
        100% {
          -webkit-transform: rotate(-360deg);
        }
      }
      
      
      @keyframes sk-cubemove {
        25% {
          transform: translateX(42px) rotate(-90deg) scale(0.5);
          -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
        }
      
        50% {
          transform: translateX(42px) translateY(42px) rotate(-179deg);
          -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
        }
      
        50.1% {
          transform: translateX(42px) translateY(42px) rotate(-180deg);
          -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        }
      
        75% {
          transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
          -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        }
      
        100% {
          transform: rotate(-360deg);
          -webkit-transform: rotate(-360deg);
        }
`;

const Loader = () => (
  <Centered>
    <div className="cube">
      <div className='cube1' />
      <div className='cube2' />
    </div>
  </Centered>
)

export default Loader