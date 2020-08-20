import React, { useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7, // 지뢰
    NORMAL: -1, // 일반 칸
    QUESTION: -2, // 물음표
    FLAG :-3, // 깃발
    QUESTION_MINE: -4, // 물음표 칸이 지뢰인 경우
    FLAG_MINE: -5, // 깃발 칸이 지뢰인 경우
    CLICKED_MINE: -6, // 지뢰 클릭
    OPENED: 0, // 칸 열었을 때 (0이상이면 다 opened)
};

export const TableContext = createContext({ // 초깃값 설정
    tableData: [],
    dispatch: () => { },
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => { //0 ~ 99까지
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen); // 랜덤으로 뽑은 20개 숫자들을 shuffle 배열에 넣기
    }
    //2차원 배열 만들기
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL); // 일반칸을 기본으로 설정
        }
    }
    //2차원 배열에 지뢰 심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;
};

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: 
        return {
            ...state,
            tableData: plantMine(action.row, action.cell, action.mine)
        };
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]); // tableData값이 바뀔 때 갱신

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;