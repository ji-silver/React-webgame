import React, { useCallback } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TicTacToe';

const Td = ({ rowIndex, cellIndex, dispatch, cellData }) => {
    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸 클릭 후
        dispatch({ type: CHANGE_TURN }); // 턴 바꾸기
    }, []);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;