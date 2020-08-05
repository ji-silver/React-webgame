import React, { Component } from 'react'
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1); // 45개의 숫자를 candidate 배열에 넣기
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]); //배열에서 랜덤으로 숫자를 뽑아 셔플배열에 넣기
    }
    const bonusNumber = shuffle[shuffle.length - 1]; // 섞여진 숫자중에 마지막 숫자를 보너스로 뽑기
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c); // 셔플 정렬
    return [...winNumbers, bonusNumber];
};

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들
        winBalls: [],
        bonus: null, // 보너스 공
        redo: false, // 재실행
    };

    timeouts = [];

    componentDidMount() {
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) { // 보너스 공 때문에 1 빼줌, let 사용 시 클로저문제x
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000); // 순서대로 1초, 2초, 3초 ...
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6], // 마지막공이 보너스 공
                redo: true,
            });
        }, 7000);
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
            </>
        )
    }
}

export default Lotto;