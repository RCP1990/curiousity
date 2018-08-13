import React, { Component } from 'react';
import Mars from './mars';
import Controls from './controls'

class App extends React.Component {
    constructor() {
    super();
        this.state = {
            instructions: '',
            instructionsToExecute: '',
            execute: false,
            startPosition: '00N',
            position:''
        };
    
    }

    addInstruction = (data) => {
        this.setState({
            instructions: this.state.instructions + data
        })
    };

    execute = () => {
        console.log(this.state.instructions);
        let startPosition = this.startInput.value;
        if (/^[0-4][0-4][NEWS]$/.test(startPosition)) {
            this.setState({
                execute: true,
                instructionsToExecute: this.state.instructions,
                startPosition
            });

        } else {
            alert('Invalid start position.');
        }

    };

    clear = () => {
        this.setState({
            instructions: '',
            execute: false,
            instructionsToExecute: ''
        });
    };

    validateStartPosition = (e) => {
        e.target.checkValidity();
    };

    stopExecute = () => {
        this.setState({
            execute: false
        });
    };

    updatePos = (data) => {
        this.setState({
            position:data
        })
        console.log('position updated')
    };

    render() {
        let position = this.state.startPosition || '00N';
        position = position.split('').join(' ');
        return (
            <div className={'app'}>

                <Mars
                    size={5}
                    position={position}
                    instructions={this.state.instructionsToExecute}
                    execute={this.state.execute}
                    onDone={this.stopExecute}
                    updatePos={this.updatePos}
                    id={'one'}
                />
                <Controls 
                    addInstruction={this.addInstruction}
                    clear={this.clear}
                    execute={this.execute}
                    instructions={this.state.instructions}
                    startPosition={this.startPosition}
                    validateStartPosition={this.validateStartPosition}
                    startInput={input => this.startInput = input}
                    id={'two'}
                />
            </div>
        )
    }
}

export default App;
