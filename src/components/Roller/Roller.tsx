import React, {FC, useEffect, useState} from 'react';

import {runDynamo} from "../../utils/runDynamo";
import styles from './Roller.module.css'

interface IProps {
    isStarted: boolean,
    isFinished: boolean,
    onStop: () => void,
    onSetResult: (value: number) => void,
    defaultValue?: number,
}

const Roller: FC<IProps> = (props) => {
    const {isStarted, isFinished, defaultValue = 0, onStop, onSetResult} = props;
    const [number, setNumber] = useState(defaultValue);

    const rollHandler = () => {
        setNumber(prevNum => {
            if (prevNum >= 9) {
                return 0
            }
            return prevNum + 1
        });
    }

    const rollStopHandler = () => {
        onStop()
    }

    useEffect(() => {
        if (isStarted) {
            runDynamo(rollHandler, rollStopHandler)
        }

        if (isFinished) {
            onSetResult(number);
        }
    }, [isStarted, isFinished])

    return (
        <span className={styles.roller}>{number}</span>
    );
}

export default Roller;
