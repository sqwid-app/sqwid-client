import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { SpringSystem, MathUtil } from 'rebound';

class CustomScrollbar extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = { top: 0 };
        this.handleUpdate = this.handleUpdate.bind(this);
        this.renderView = this.renderView.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
		this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    }

	componentDidMount() {
        this.springSystem = new SpringSystem();
        this.spring = this.springSystem.createSpring();
        this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
    }

    componentWillUnmount() {
        this.springSystem.deregisterSpring(this.spring);
        this.springSystem.removeAllListeners();
        this.springSystem = undefined;
        this.spring.destroy();
        this.spring = undefined;
    }

	scrollToLeft() {
        return this.refs.scrollbars.scrollToLeft();
    }

    getScrollWidth() {
        return this.refs.scrollbars.getScrollWidth();
    }

    getHeight() {
        return this.refs.scrollbars.getHeight();
    }

    scrollLeft(left) {
        const { scrollbars } = this.refs;
        const scrollLeft = scrollbars.scrollToLeft();
        const scrollWidth = scrollbars.getScrollWidth();
        const val = MathUtil.mapValueInRange(left, 0, scrollWidth, scrollWidth * 0.2, scrollWidth * 0.8);
        this.spring.setCurrentValue(scrollLeft).setAtRest();
        this.spring.setEndValue(val);
    }

    handleSpringUpdate(spring) {
        const { scrollbars } = this.refs;
        const val = spring.getCurrentValue();
        scrollbars.scrollLeft(val);
    }

    handleUpdate(values) {
        const { top } = values;
        this.setState({ top });
    }

    renderView({ style, ...props }) {
		const viewStyle = {
            paddingLeft: "2rem",
        };
        return (
            <div
                className="box"
                style={{ ...style, ...viewStyle }}
                {...props}/>
        );
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: "rgb(255 255 255 / 25%)",
			borderRadius: "1000rem",
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                renderView={this.renderView}
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                onUpdate={this.handleUpdate}
				ref="scrollbars"
                {...this.props}/>
        );
    }
}

export default CustomScrollbar