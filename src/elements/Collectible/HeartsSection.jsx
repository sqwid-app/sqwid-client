import { Component } from "react";
import CollectibleContext from "@contexts/Collectible/CollectibleContext";
import { LazyMotion, domAnimation } from "framer-motion";
import React, { useContext } from "react";
import styled from "styled-components";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import Scrollbars from "react-custom-scrollbars";

const HeartContainer = styled.a`
    display: flex;
    align-items: center;
    justify-content: left;
    flex-direction: row;
    padding: 0.5rem;
    margin-top: .5rem;
    border: .15rem dashed var(--app-container-bg-primary);
    text-decoration: none;
    color: var(--app-container-text-primary);
    border-radius: 0.5rem;
    width: 100%;
    gap: 0.5rem;
    transition: all 0.1s ease-in-out;
    :hover {
        color: var(--app-container-text-primary-hover);
    };
`;

const AddressContainer = styled.div`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;
const Logo = styled.div`
	min-height: 2rem;
	min-width: 2rem;
	border-radius: 1000rem;
	background-image: url("${props => props.url && props.url}");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const Heart = ({ user }) => {
    return (
        <HeartContainer href = {`/profile/${user}`} target="_blank">
            <Logo url = {getAvatarFromId(user)}/>
            <AddressContainer>{user}</AddressContainer>
        </HeartContainer>
    );
}

class CustomScrollbar extends Component {
	constructor(props, ...rest) {
		super(props, ...rest);
		this.renderView = this.renderView.bind(this);
		this.renderThumb = this.renderThumb.bind(this);
		this.scrollbars = React.createRef();
	}

	componentDidUpdate(prevProps) {
		if (this.props.move !== prevProps.move) {
			let scrollbars = this.scrollbars;
			if (
				this.props.move > 0 &&
				this.props.move < scrollbars.getThumbHorizontalWidth()
			) {
				let left = this.props.move;
				scrollbars.scrollLeft(left);
			}
		}
	}

	renderView({ style, ...props }) {
		const viewStyle = {
			paddingRight: "1rem"
		};
		return <div style={{ ...style, ...viewStyle }} {...props} />;
	}

	renderThumb({ style, ...props }) {
		const thumbStyle = {
			backgroundColor: "rgb(255 255 255 / 25%)",
			borderRadius: "1000rem",
		};
		return <div style={{ ...style, ...thumbStyle }} {...props} />;
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

const HeartsSection = () => {
	const { collectibleInfo } = useContext(CollectibleContext);
	return (
		<LazyMotion features={domAnimation}>
                <CustomScrollbar style = {{ minHeight: "30vh" }}>
                        {collectibleInfo.hearts && collectibleInfo.hearts.map((heart, index) => (
                            <Heart key={index} user={heart}/>
                        ))}
                </CustomScrollbar>
		</LazyMotion>
	);
};

export default HeartsSection;
