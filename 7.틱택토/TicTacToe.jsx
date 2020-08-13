import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1], // 없는 칸 임의로 설정
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell], // 최근 클릭한 칸 기억해두기
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };
        }
        case RESET_GAME: {
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback(
        () => {
            dispatch({ type: SET_WINNER, winner: 'O' });
        }, []);

    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) { // useEffect는 첫 랜더링때도 실행되기 때문에 걸러주기
            return;
        }
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로 검사
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로 검사
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 왼쪽 대각선 검사
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 오른쪽 대각선
            win = true;
        }
        console.log(win, row, cell, tableData, turn);
        if (win) { // 승리시
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_GAME });
        } else {
            let all = true; // 무승부
            tableData.forEach((row) => { //반복문 돌면서 검사
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: RESET_GAME });
            } else {
                dispatch({ type: CHANGE_TURN });
            }
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    )
};

export default TicTacToe;