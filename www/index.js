import ReactDOM from 'react-dom';
import Slider from '../src/slider';
import React from 'react';
import clone from 'clone';

import { PageHeader as Header, Panel, Label, Form, FormControl, ControlLabel } from 'react-bootstrap';

// Bootstrap reference: https://react-bootstrap.github.io/components.html

class KitchenSink extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selected_slider: 'large_slider_with_sticky_fill',
			large_slider_with_fill: {
				value: 465,
				max: 1000,
				min:0,
				onChange: this.onChange.bind(this, "large_slider_with_fill"),
			},
			large_slider_with_sticky_fill: {
				value: 355,
				fill: 200,
				max: 1000,
				min: 0,
				onChange: this.onChange.bind(this, "large_slider_with_sticky_fill"),
				onHandleRelease: function(){},
			},
			small_slider_with_fill: {
				value: 355,
				max: 1000,
				min: 0,
				onChange: this.onChange.bind(this, "small_slider_with_fill"),
			},
			small_slider_with_sticky_fill: {
				value: 355,
				max: 1000,
				fill: 200,
				min: 0,
				onChange: this.onChange.bind(this, "small_slider_with_sticky_fill"),
			}
		};
	}

	getSlidersNames() {
		return [
			'large_slider_with_fill',
			'large_slider_with_sticky_fill',
			'small_slider_with_fill',
			'small_slider_with_sticky_fill'
		];
	}

	onChange(slider_name, e) {
		let value = e;
		let new_state = clone(this.state);
		new_state[slider_name].value = e;
		this.setState(new_state);
	}

	selectSlider(event) {
		this.setState({ selected_slider: event.target.value });
	}

	editFill(event) {
		const obj = clone(this.state);
		obj[this.state.selected_slider].fill = event.target.value;
		this.setState(obj)
	}

	render() {
		return (
			<div>
				<Header>
					Kronos technologies' implementation of React-RangeSlider
				</Header>
				original work: <a href="https://github.com/whoisandie/react-rangeslider">https://github.com/whoisandie/react-rangeslider</a>
				<div style={{width: "900px", marginLeft: "300px", marginTop: "45px"}} >
					<For each="slider" of={this.getSlidersNames()} index="i" >
						<Panel header={slider} key={i}>
							<div>
								<Slider {...this.state[slider]}/>
								<h3>Value: <Label bsStyle="success">{this.state[slider].value}</Label></h3>
								<If condition={this.state[slider].fill}>
									<h3>Fill: <Label bsStyle="success">{this.state[slider].fill}</Label></h3>
								</If>
							</div>
						</Panel>
					</For>
				</div>
				<Panel header="Edition" bsStyle="primary">
						<ControlLabel>Fill edition</ControlLabel>
						<FormControl componentClass="select" style={{ width: '400px' }} onChange={this.selectSlider} value={this.state.selected_slider}>
							<For each="option" of={this.getSlidersNames()} index="i">
								<If condition={this.state[option].fill}>
									<option key={i} value={option}>{option}</option>
								</If>
							</For>
						</FormControl>
						<FormControl
							style={{ width: '100px' }}
							type="text"
							onChange={this.editFill}
							value={this.state[this.state.selected_slider].fill}
						/>
				</Panel>
			</div>
		);
	}
}

(function(){
	ReactDOM.render(
		<KitchenSink />,
		document.getElementById('mount')
	);
})();
