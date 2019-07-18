import React from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function maxmin(pos, min, max) {
    if (pos < min) { return min; }
    if (pos > max) { return max; }
    return pos;
}

function handleNoop(e) {
    if (!e.type.includes('touch')) {
        e.stopPropagation();
        e.preventDefault();
    }
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
        },
    },
};

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.fill_anchor_range = 20;

        this.state = {
            limit: 0,
            grab: 0,
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
        if (!this.slider) {
            return
        }

        const { orientation } = this.props;
        const dimension = capitalize(constants.orientation[orientation].dimension);
        const sliderPos = findDOMNode(this.slider)['offset' + dimension];
        const handlePos = findDOMNode(this.handle)['offset' + dimension];
        this.setState({
            limit: sliderPos - handlePos,
            grab: handlePos / 2,
        });
    }

    handleStart() {
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('touchmove', this.handleDrag);
        document.addEventListener('mouseup', this.handleEnd);
        document.addEventListener('touchend', this.handleEnd);
    }

    handleDrag(e) {
        handleNoop(e);
        const { onChange, fill } = this.props;
        let value;

        if (!onChange) {
            console.warn('No onChange was specified for selected slider.');
        }

        value = this.position(e);

        if (fill) {
            if (value < fill + this.fill_anchor_range && value > fill - this.fill_anchor_range) {
                value = fill;
            }
        }

        onChange && onChange(value);
    }

    handleEnd(e) {
        handleNoop(e);
        if (this.props.onHandleRelease) {
            this.props.onHandleRelease();
        }

        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('touchmove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleEnd);
        document.removeEventListener('touchend', this.handleEnd);
    }

    getPositionFromValue(value) {
        const { limit } = this.state;
        const { min, max } = this.props;
        const percentage = (value - min) / (max - min);

        return Math.round(percentage * limit);
    }

    getValueFromPosition(pos) {
        const { limit } = this.state;
        const {
            orientation, min, max, step,
        } = this.props;
        const percentage = (maxmin(pos, 0, limit) / (limit || 1));
        let value;

        if (orientation === 'horizontal') {
            value = step * Math.round(percentage * (max - min) / step) + min;
        } else {
            value = max - (step * Math.round(percentage * (max - min) / step) + min);
        }

        return value;
    }

    position(e) {
        const { grab } = this.state;
        const { orientation } = this.props;
        const node = findDOMNode(this.slider);
        const coordinateStyle = constants.orientation[orientation].coordinate;
        const directionStyle = constants.orientation[orientation].direction;
        const coordinate = !e.touches
        ? e['client' + capitalize(coordinateStyle)]
        : e.touches[0]['client' + capitalize(coordinateStyle)];
        const direction = node.getBoundingClientRect()[directionStyle];

        const pos = coordinate - direction - grab;
        const value = this.getValueFromPosition(pos);

        return value;
    }

    coordinates(pos) {
        const { limit, grab } = this.state;
        const { orientation, fill, max } = this.props;
        const value = this.getValueFromPosition(pos);
        const handlePos = this.getPositionFromValue(value);
        let fillPos;

        if (orientation === 'horizontal') {
            fillPos = handlePos + grab;
        } else {
            fillPos = limit - handlePos + grab;
        }

        let fillReturn = 0;
        if (fill > 0 && fill < max) {
            fillReturn = this.getPositionFromValue(fill) + grab;
        } else if (fill >= max) {
            fillReturn = this.getPositionFromValue(max) + ( 2 * grab);
        }

        return {
            fill: (fill >= 0) ? (fillReturn) : fillPos,
            handle: handlePos,
        };
    }

    render() {
        const { value, orientation, className } = this.props;
        const { dimension } = constants.orientation[orientation];
        const { direction } = constants.orientation[orientation];
        const position = this.getPositionFromValue(value);
        const coords = this.coordinates(position);
        const fillStyle = { [dimension]: `${coords.fill}px` };
        const handleStyle = { [direction]: `${coords.handle}px` };

        return (
            <div
                ref={slider => (this.slider = slider)}
                className={cx('rangeslider ', 'rangeslider-' + orientation, className)}
                onMouseDown={this.props.disabled ? () => {} : e => this.handleDrag(e)}
                onTouchStart={this.props.disabled ? () => {} : e => this.handleStart(e)}
                onClick={this.props.disabled ? () => {} : e => this.props.onClick(e)}
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
                    onTouchStart={this.props.disabled ? () => {} : e => this.handleStart(e)}
                    onTouchMove={this.props.disabled ? () => {} : e => this.handleDrag(e)}
                    onClick={this.props.disabled ? () => {} : e => handleNoop(e)}
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
    onClick: () => null,
};

export default Slider;
