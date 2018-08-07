import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.substr(1);
}

function maxmin(pos, min, max) {
	if (pos < min) { return min; }
	if (pos > max) { return max; }
	return pos;
}

const constants = {
	orientation: {
		horizontal: {
			dimension: 'width',
			direction: 'left',
			coordinate: 'x',
		},
		vertical: {
			dimension: 'height',
			direction: 'top',
			coordinate: 'y',
		}
	}
};

class Slider extends React.Component {
	constructor(props) {
		super(props);

		this.fill_anchor_range = 20;

		this.state = {
			limit: 0,
			grab: 0
		};

		this.handleDrag = this.handleDrag.bind(this);
		this.handleEnd = this.handleEnd.bind(this);
	}

	// Add window resize event listener here
	componentDidMount() {
		window.addEventListener('resize', e => this.handleUpdate(e));
		this.handleUpdate();

		this.fill_anchor_range = this.props.max * 0.017;
	}

	// remove window resize event listener here
	componentWillUnmount() {
		window.removeEventListener('resize', e => this.handleUpdate(e));
	}

	showTooltip() {
		// insert tooltip here
	}

	handleUpdate() {
		let { orientation } = this.props;
		let dimension = capitalize(constants.orientation[orientation].dimension);
		const sliderPos = findDOMNode(this.slider)['offset' + dimension];
		const handlePos = findDOMNode(this.handle)['offset' + dimension];
		this.setState({
			limit: sliderPos - handlePos,
			grab: handlePos / 2,
		});
	}

	handleStart() {
		document.addEventListener('mousemove', this.handleDrag);
		document.addEventListener('mouseup', this.handleEnd);
	}

	handleDrag(e) {
		this.handleNoop(e);
		let value, {onChange} = this.props;
		if (!onChange) {
			console.warn('No onChange was specified for selected slider.')
		}
		value = this.position(e);
		if(this.props.fill) {
			if(value < this.props.fill + this.fill_anchor_range && value > this.props.fill - this.fill_anchor_range) {
				value = this.props.fill;
			}
		}

		onChange && onChange(value);
	}

	handleEnd(e) {
		if (this.props.onHandleRelease) {
			this.props.onHandleRelease();
		}

		document.removeEventListener('mousemove', this.handleDrag);
		document.removeEventListener('mouseup', this.handleEnd);
	}

	handleNoop(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	getPositionFromValue(value) {
		let percentage, pos;
		let { limit } = this.state;
		let { min, max } = this.props;
		percentage = (value - min) / (max - min);
		pos = Math.round(percentage * limit);

		return pos;
	}

	getValueFromPosition(pos) {
		let percentage, value;
		let { limit } = this.state;
		let { orientation, min, max, step } = this.props;
		percentage = (maxmin(pos, 0, limit) / (limit || 1));

		if (orientation === 'horizontal') {
			value = step * Math.round(percentage * (max - min) / step) + min;
		} else {
			value = max - (step * Math.round(percentage * (max - min) / step) + min);
		}

		return value;
	}

	position(e) {
		let pos, value, { grab } = this.state;
		let { orientation } = this.props;
		const node = findDOMNode(this.slider);
		const coordinateStyle = constants.orientation[orientation].coordinate;
		const directionStyle = constants.orientation[orientation].direction;
		const coordinate = !e.touches
			? e['client' + capitalize(coordinateStyle)]
			: e.touches[0]['client' + capitalize(coordinateStyle)];
		const direction = node.getBoundingClientRect()[directionStyle];

		pos = coordinate - direction - grab;
		value = this.getValueFromPosition(pos);

		return value;
	}

	coordinates(pos) {
		let value, fillPos, handlePos;
		let { limit, grab } = this.state;
		let { orientation } = this.props;

		value = this.getValueFromPosition(pos);
		handlePos = this.getPositionFromValue(value);

		if (orientation === 'horizontal') {
			fillPos = handlePos + grab;
		} else {
			fillPos = limit - handlePos + grab;
		}

		let fillReturn = 0;
		if (this.props.fill > 0 && this.props.fill < this.props.max) {
			fillReturn = this.getPositionFromValue(this.props.fill) + grab;
		}
		else if (this.props.fill >= this.props.max) {
			fillReturn = this.getPositionFromValue(this.props.max) + ( 2 * grab);
		}

		return {
			fill: (this.props.fill >= 0) ? (fillReturn) : fillPos,
			handle: handlePos,
		};
	}

	render() {
		let dimension, direction, position, coords, fillStyle, handleStyle;
		let {value, orientation, className} = this.props;

		dimension = constants.orientation[orientation].dimension;
		direction = constants.orientation[orientation].direction;

		position = this.getPositionFromValue(value);
		coords = this.coordinates(position);

		fillStyle = {[dimension]: `${coords.fill}px`};
		handleStyle = {[direction]: `${coords.handle}px`};

		return (
			<div
				ref={slider => (this.slider = slider)}
				className={cx('rangeslider ', 'rangeslider-' + orientation, className)}
				onMouseDown={this.props.disabled ? function(){} : e => this.handleDrag(e)}
				onClick={this.props.disabled ? function(){} : e => this.props.onClick(e)}
				disabled={this.props.disabled}
			>
				<div
					ref={fill => (this.fill = fill)}
					className="rangeslider__fill"
					style={fillStyle}
					onMouseOver={e => this.showTooltip(e)}
				/>
				<div
					ref={handle => (this.handle = handle)}
					className="rangeslider__handle"
					onMouseDown={this.props.disabled ? () => {} : e => this.handleStart(e)}
					onTouchMove={this.props.disabled ? () => {} : e => this.handleDrag(e)}
					onClick={this.props.disabled ? () => {} : e => this.handleNoop(e)}
					style={handleStyle}
				/>
			</div>
		);
	}
}

Slider.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	value: PropTypes.number,
	orientation: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onHandleRelease: PropTypes.func,
	onChange: PropTypes.func,
	onClick: PropTypes.func,
};

Slider.defaultProps = {
	min: 0,
	max: 100,
	step: 1,
	value: 0,
	orientation: 'horizontal',
	disabled: false,
	onClick: () => null
};

export default Slider;
