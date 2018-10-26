import React from 'react';
import ReactDOM from 'react-dom';
import {
    Segment, Header, Container, Input, Divider, Label
} from 'semantic-ui-react';

import Slider from '../src/slider';

const SLIDER_NAMES = [
    'large_slider_with_fill',
    'large_slider_with_sticky_fill',
    'small_slider_with_fill',
    'small_slider_with_sticky_fill',
];

class KitchenSink extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            large_slider_with_fill: {
                value: 465,
                max: 1000,
                min: 0,
                onChange: this.onChange.bind(this, 'large_slider_with_fill'),
                onHandleRelease: () => {
                    console.log('onHandleRelease called.');
                },
            },
            large_slider_with_sticky_fill: {
                value: 355,
                fill: 200,
                max: 1000,
                min: 0,
                onChange: this.onChange.bind(this, 'large_slider_with_sticky_fill'),
                onHandleRelease: () => {
                    console.log('onHandleRelease called.');
                },
            },
            small_slider_with_fill: {
                value: 355,
                max: 1000,
                min: 0,
                onChange: this.onChange.bind(this, 'small_slider_with_fill'),
                onHandleRelease: () => {
                    console.log('onHandleRelease called.');
                },
            },
            small_slider_with_sticky_fill: {
                value: 355,
                max: 1000,
                fill: 200,
                min: 0,
                onChange: this.onChange.bind(this, 'small_slider_with_sticky_fill'),
                onHandleRelease: () => {
                    console.log('onHandleRelease called.');
                },
            },
        };
    }

    onChange(slider_name, e) {
        console.log('onChange called.');
        const new_state = Object.assign(this.state, {});
        new_state[slider_name].value = e;
        this.setState(new_state);
    }

    editFill(event, slider) {
        const obj = Object.assign(this.state, {});
        obj[slider].fill = Number.parseInt(event.target.value, 10) || 0;
        this.setState(obj);
    }

    render() {
        return (
            <Segment basic>
                <Header as="h1">
                    Kronos Technologies' implementation of React-RangeSlider
                </Header>
                original work: <a href="https://github.com/whoisandie/react-rangeslider">https://github.com/whoisandie/react-rangeslider</a>
                <Divider hidden />
                <Container>
                    {SLIDER_NAMES.map(slider => (
                        <Segment raised key={slider}>
                            <Header as="h3">{slider.replace(/_/g, ' ')}</Header>
                            <div>
                                <Slider {...this.state[slider]} />
                                <Label>Value:  {this.state[slider].value}</Label>
                                <br />
                                {this.state[slider].fill !== undefined && (
                                    <React.Fragment>
                                        <Label>
                                            Fill:
                                        </Label>
                                        <Input
                                            onChange={e => this.editFill(e, slider)}
                                            value={this.state[slider].fill}
                                        />
                                    </React.Fragment>
                                )}
                            </div>
                        </Segment>
                    ))}
                </Container>
            </Segment>
        );
    }
}

(function(){
    ReactDOM.render(
        <KitchenSink />,
        document.getElementById('mount')
    );
})();
