import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class CustomScrollbar extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.renderView = this.renderView.bind(this);
        this.renderThumb = this.renderThumb.bind(this);
		this.scrollbars = React.createRef();
    }

	componentDidUpdate(prevProps) {
		if (this.props.move !== prevProps.move) {
			let scrollbars = this.scrollbars
			if(this.props.move > 0 && this.props.move < scrollbars.getThumbHorizontalWidth()){
				let left = this.props.move
				console.log(prevProps.move,this.props.move)
				scrollbars.scrollLeft(left)
			}
		}
	}

    renderView({ style, ...props }) {
		const viewStyle = {
            paddingLeft: "2rem",
        };
        return (
            <div
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
				ref={this.scrollbars}
				className="custom-scrollbars"
                {...this.props}
			/>
        );
    }
}

export default CustomScrollbar