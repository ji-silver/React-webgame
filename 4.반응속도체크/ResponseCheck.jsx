import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    onClickScreen = () => {

    };

    renderAverage = () => {
        const { result } = this.state;
        return result.length === 0
            ? null // jsx에서 false, undefined, null은 태그 없음을 의미. 처음엔 null, result에 값이 있으면 랜더링
            : <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
    }

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheck;