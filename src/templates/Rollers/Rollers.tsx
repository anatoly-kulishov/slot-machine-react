import React, {FC, useEffect, useState} from 'react';

import Roller from "../../components/Roller/Roller";
import {IRoll} from "../../types";
import styles from './Rollers.module.css'
import {ROLLERS} from "../../constants";

interface IProps {
    data: IRoll[]
}

const Rollers: FC<IProps> = ({data}) => {
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [finishedRollers, setFinishedRollers] = useState(0);
    const [message, setMessage] = useState('Нажми на кнопку');
    const [result, setResult] =useState('');

    const handleStartRoll = () => {
        setIsStarted(true)
        setIsFinished(false);
        setResult('')
        setMessage('Игра началась...')
    }

    const handleStopRoll = () => {
        setFinishedRollers(prev => prev + 1);
    }

    const handleSetResult = (value: number) => {
        setResult((prev: string) => prev + value);
    };

    useEffect(() => {
        if (finishedRollers === ROLLERS.length) {
            setIsStarted(false);
            setIsFinished(true)
            setFinishedRollers(0);
        }
    }, [finishedRollers]);


    useEffect(() => {
        if (result.length === ROLLERS.length) {
            const isWinConditional =  result.split('').every(el => el === result[0])

            if(isWinConditional) {
                setMessage('Ты победил')
            } else {
                setMessage('Попробуй ещё раз')
            }
        }
    }, [result]);

    return (
        <>
            <h2>{message}</h2>
            <div className={styles.rollersBox}>
                {data.map(roll => (
                    <Roller
                        key={roll.id}
                        defaultValue={roll.value}
                        isStarted={isStarted}
                        isFinished={isFinished}
                        onStop={handleStopRoll}
                        onSetResult={handleSetResult}
                    />
                ))}
            </div>
            <div>
                <button className={styles.rollersBtn} disabled={isStarted && !isFinished} onClick={handleStartRoll}>
                    Roll
                </button>
            </div>
        </>
    );
}

export default Rollers;
