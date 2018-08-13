import React, { Component } from 'react';
import Button from './button';
import './controls.css';

class Controls extends Component {
	constructor() {
		super();
		this.state = {

		};
	}

	addInstructionC = (e) => {
		const value = e.target.value;
		this.props.addInstruction(value);
	}

	render() {
		return (

                <div className={`control-panel`}>
                    <div className={'start-position'}>
                        <label
                            htmlFor='startPosition'
                        >
                            Start Position 
                        </label>
                        <input type='text'
                               id='startPosition'
                               maxLength={3}
                               required
                               pattern={'^[0-4][0-4][NEWS]$'}
                               defaultValue={'00N'}
                               onBlur={this.props.validateStartPosition}
                               ref={this.props.startInput}
                        />
                    </div>
                    <div className='commands'>
                    	<div className='dpad'>
                        	<Button className='up' value='F' onClick={e => this.addInstructionC(e)} label='F' />
                          <Button className='down' value='B' onClick={e => this.addInstructionC(e)} label='B' />
                        	<Button className='left' value='L' onClick={e => this.addInstructionC(e)} label='L' />
                        	<Button className='right' value='R' onClick={e => this.addInstructionC(e)} label='R' />
                        	
                        	</div>
                     </div>
                    <div className='execution'>
                        <Button onClick={this.props.clear} label='✖' />
                        <input type='text' readOnly value={this.props.instructions}/>
                        <Button className={'cta'} onClick={this.props.execute} label='Go' />
                    </div>
                </div>
			)
	}
}

export default Controls;