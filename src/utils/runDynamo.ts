export function randomInt(min = 0, max = 9) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 Функция имитирует рандомайзер вращения барабана с постепенной остановкой
 - используй onRoll для анимации вращения (смена текущего значения на барабане)
 - и onStop для оповещения, когда барабан закончил крутиться
 */
export const runDynamo = (onRoll: Function, onStop: Function) => {
    const velocityConsumed = 200;
    const initialSpeed = 50;

    const initialV = randomInt(3000, 5000);
    let velocity = initialV;

    const round = () => {
        const speed = (initialV - velocity) / 10;
        velocity -= velocityConsumed;
        if (velocity < 0) {
            onStop();
            return;
        }
        onRoll();
        setTimeout(round, speed);
    };

    setTimeout(round, initialSpeed);
};