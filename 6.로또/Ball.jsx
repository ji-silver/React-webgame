import React, { memo } from 'react'

const Ball = memo(({number}) =>  {
    let background;
    if(number <= 10) {
        background = '#ef5350';
    } else if (number <= 20) {
        background = '#ffb74d';
    } else if (number <= 30) {
        background = '#ffee58';
    } else if (number <= 40) {
        background = '#03a9f4';
    } else {
        background = '#4caf50';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    );
});

export default Ball;