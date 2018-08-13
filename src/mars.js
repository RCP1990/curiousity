import React from 'react';
import Curiousity from './curiousity';
import './mars.css'

const FORWARD = {
    S: [0, -1],
    W: [-1, 0],
    N: [0, 1],
    E: [1, 0]
};

const BACKWARD = {
    S: [0, 1],
    W: [1, 0],
    N: [0, -1],
    E: [-1, 0]
};

const LEFT_TURNS_MAP = {
    N: 'W',
    W: 'S',
    S: 'E',
    E: 'N'
};

const RIGHT_TURNS_MAP = {
    N: 'E',
    E: 'S',
    S: 'W',
    W: 'N'
};

class Mars extends React.Component {

    initialState = {
        start: null,
        end: null,
        ops: [],
        position: '0-0',
        facing: 'N',
        path: null,
        error: null,
    };

    state = Object.assign({}, this.initialState);

    componentDidMount() {
        this.reset(() => {
            this.process(this.props);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.reset(() => {
            this.process(nextProps);
        });
    }

    reset = (cb) => {
        this.setState(this.initialState, cb);
    };

    process = (props) => {
        const {instructions, position} = props;
        if (instructions === '') {
            this.setState(this.initialState);
        } else {
            const parts = position.split(' ');
            this.setState(
                {
                    start: parts[0] + '-' + parts[1],
                    position: parts[0] + '-' + parts[1],
                    facing: parts[2]
                },
                () => {
                    if (props.execute) {
                        this.execute(instructions);
                    }
                }
            );
        }
    };

    updatePosC = (data) => {
        this.props.updatePos(data)
    };

    execute = (instructions) => {
        let ops = (instructions || '').split('');
        this.setState({ops}, () => {
            setTimeout(this.run.bind(this), 500);
        });
    };

    run = () => {
        let ops = this.state.ops.slice();
        let {position, path, facing} = this.state;
        path = path || {};
        path[position] = facing;
        let op = ops.shift();
        let newPosition = {};
        if (op === 'L') {
            newPosition = this.turnLeft();
        } else if (op === 'R') {
            newPosition = this.turnRight();
        } else if (op === 'F') {
            newPosition = this.moveForward();
        } else if (op === 'B') {
            newPosition = this.moveBackward();
        }else {
            console.log('Invalid instruction');
        }
        if (newPosition.error) {
            alert('Can not move beyond the boundaries of Mars');
        }
        this.setState(Object.assign(this.state, {
            ops,
            path,
            ...newPosition
        }), () => {
            if (this.state.ops.length > 0 && !this.state.error) {
                setTimeout(this.run.bind(this), 300);
            } else {
                this.setState({
                    end: this.state.position
                })
            }
        })

    };

    moveForward = () => {
        const {size} = this.props;
        const {position, facing} = this.state;
        const moveVector = FORWARD[facing];
        const pos = position.split('-').map(Number);
        const x = pos[0] + moveVector[0];
        const y = pos[1] + moveVector[1];
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return {error: true};
        }
        return {
            position: x + '-' + y
        };
    };

        moveBackward = () => {
        const {size} = this.props;
        const {position, facing} = this.state;
        const moveVector = BACKWARD[facing];
        const pos = position.split('-').map(Number);
        const x = pos[0] + moveVector[0];
        const y = pos[1] + moveVector[1];
        if (x < 0 || x >= size || y < 0 || y >= size) {
            return {error: true};
        }
        return {
            position: x + '-' + y
        };
    };

    turnLeft = () => {
        const {facing} = this.state;
        return ({
            facing: LEFT_TURNS_MAP[facing]
        });
    };

    turnRight = () => {
        const {facing} = this.state;
        return ({
            facing: RIGHT_TURNS_MAP[facing]
        });
    };

    render() {

        const {size} = this.props;
        let {position, facing, path} = this.state;
        path = path || {};
        let cells = [];
        for (let i = size - 1; i >= 0; i--) {
            for (let j = 0; j < size; j++) {
                cells.push(j + '-' + i);
            }
        }
        return (
                <ul className='mars'>
                    {cells.map(cell => {

                        let curiousityElm = null;
                        let curiousityPath = null;
                        let cellStatus = '';

                        if (this.state.error && this.state.end === cell) {
                            cellStatus = 'error';
                        }
                        if (this.state.start === cell) {
                            cellStatus += ' start';
                        }
                        if (this.state.end === cell) {
                            cellStatus += ' end';
                        }

                        if (position === cell) {
                            curiousityElm = <Curiousity facing={facing}/>;
                        } else {
                            curiousityPath = (path[cell] ? <Curiousity facing={path[cell]} ghost={true}/> : null);
                        }

                        return (
                            <li className={`cell ${!!path[cell] ? 'path' : ''} ${cellStatus}`} key={cell}>
                                <label>{cell}</label>
                                {curiousityElm || curiousityPath}
                            </li>
                        );
                    })}
                </ul>
        );
    }
}

export default Mars;