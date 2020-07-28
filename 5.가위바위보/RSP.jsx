import React, { Component } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-260px',
    보: '-538px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    };

    interval;

    componentDidMount() {
        this.interval = setInterval(this.changeHand, 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }
    
    // 버튼 클릭 시 인터벌 잠시 멈추고 점수 계산 후 다시 실행
    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore; // 내 스코어와 컴퓨터 스코어 빼기
        if (diff === 0) { // 차이가 없으면
            this.setState({
                result: '비겼습니다!',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                };
            });
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000); // 결과 나온 후 2초 기다렸다가 다시 돌리기
    };

    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_t.jpeg) ${imgCoord} 0` }}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;