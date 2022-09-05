import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { fetchFeaturedItems } from "@utils/marketplace";
import { getInfuraURL } from "@utils/getIPFSURL";
import { Link } from "react-router-dom";
import { AddFeaturedModal } from "@elements/Collectible/Modals";
import axios from "axios";
import { getBackend } from "@utils/network";
import bread from "@utils/bread";
import { respondTo } from "@styles/styledMediaQuery";

const Container = styled.div`
	width: 70%;
	margin: 0 auto;
	${respondTo.md`
		width: 100%;
	`}
	ul {
		list-style-position: inside;
	}
	h1,
	h2 {
		margin: 0.75rem 0;
	}
	h1 {
		font-size: 2rem;
		font-weight: 800;
		margin-bottom: 2rem;
	}
	p,
	ul {
		color: var(--app-container-text-primary-hover);
	}
	a {
		text-decoration: none;
		transition: color 0.1s ease;
		&:link {
			color: var(--app-theme-primary);
		}
		&:hover {
			color: var(--app-theme-primary-disabled);
		}
		&:visited {
			color: var(--app-theme-primary);
		}
	}
`;
const ListItemWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	padding: 0.675rem;
	background-color: var(--app-container-bg-primary);
	border-radius: 0.25rem;
	&:not(last-child) {
		margin-bottom: 0.5rem;
	}
`;
const HeadingItemWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	padding: 0.675rem;
	border: solid 0.2rem var(--app-container-bg-primary);
	border-radius: 0.5rem 0.5rem 0 0;
	font-weight: 700 !important;
	&:not(last-child) {
		margin-bottom: 0.5rem;
	}
`;
const ListItem = styled.li`
	/* display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly; */
	// background-color: var(--app-theme-primary-disabled);
	margin: 0.5rem 0;
	flex: 1;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;

const ItemIcon = styled.div`
	width: 3rem;
	height: 3rem;
	background-color: var(--app-theme-primary);
	margin-right: 0.5rem;
	background: url(${props => props.url}) no-repeat center;
	background-size: cover;
	border-radius: 0.25rem;
`;

const ItemTitle = styled.div`
	font-weight: 800;
	width: 30rem;
	${respondTo.md`
		width: 100%;
	`}
`;

const ItemPositionId = styled.div`
	color: var(--app-text);
	text-align: center;
`;

const ItemType = styled.div`
	color: var(--app-text);
	font-weight: 800;
`;

const DeleteButton = styled.div`
	background-color: var(--app-container-bg-secondary);
	width: 2rem;
	height: 2rem;
	margin: 0.25rem;
	cursor: pointer;
	&:hover {
		background-color: hsl(236, 10%, 20%);
	}
	justify-content: center;
	align-items: center;
	display: flex;
	border-radius: 0.25rem;
`;

const TopWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0;
`;

const TopButtonsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	padding: 0.5rem 0;
	flex: 0;
`;

const Button = styled.div`
	background-color: var(--app-theme-primary-disabled);
	/* height: 2.5rem; */
	/* width: 2.5rem; */
	margin: 0.25rem;
	&:last-child {
		margin-right: 0;
	}
	cursor: pointer;
	padding: 0.5rem 0.75rem;
	&:hover {
		background-color: var(--app-theme-primary);
	}
	border-radius: 0.25rem;
	svg {
		height: 1rem;
		width: 1rem;
	}
	align-items: center;
	display: flex;
	justify-content: center;
	gap: 0.25rem;
	font-weight: 700;
`;

const DragHolder = styled.div`
	svg {
		height: 1.5rem;
		width: 1.5rem;
		fill: currentColor;
		color: var(--app-container-text-primary-hover);
	}
	margin: 0.25rem;
	margin-right: 1rem;
	cursor: move;
	cursor: grab;
	display: grid;
	place-items: center;
	&:active {
		cursor: grabbing;
		svg {
			color: white;
		}
	}
`;

const DragHandle = props => {
	return (
		<DragHolder {...props}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</DragHolder>
	);
};

export function SortableItem(props) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const getCorrectType = type => {
		switch (type) {
			case 1:
				return "Sale";
			case 2:
				return "Auction";
			case 3:
				return "Raffle";
			case 4:
				return "Loan";
			default:
				return "Unknown";
		}
	};

	const removeItem = () => {
		props.removeItem(props.id);
	};

	return (
		<ListItemWrapper ref={setNodeRef} style={style} {...attributes}>
			<DragHandle {...listeners} />
			<ItemIcon
				title="Preview"
				url={
					props.itemData?.meta
						? getInfuraURL(props.itemData?.meta?.image)
						: ""
				}
			/>
			<ListItem>
				<ItemPositionId>{props.id}</ItemPositionId>
				<Link to={`/collectible/${props.itemData?.positionId}`}>
					<ItemTitle>{props.itemData?.meta?.name || "Missing Item"}</ItemTitle>
				</Link>
				<ItemType>{getCorrectType(props.itemData?.state)}</ItemType>
			</ListItem>
			<DeleteButton onClick={removeItem}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					height="24"
					width="24"
				>
					<path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
				</svg>
			</DeleteButton>
		</ListItemWrapper>
	);
}

const FeaturedComponent = () => {
	const [items, setItems] = useState([]);
	const [itemData, setItemData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItems(items => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	function removeItem(id) {
		setItems(items => {
			return items.filter(item => item !== id);
		});
	}

	function addItem(item) {
		if (items.indexOf(item.positionId) === -1) {
			setItemData(itemData => {
				return [...itemData, item];
			});
			setItems(items => {
				return [...items, item.positionId];
			});
		}
	}

	async function SaveFeatured() {
		const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
		//eslint-disable-next-line
		let jwt = address
			? JSON.parse(localStorage.getItem("tokens")).find(
					token => token.address === address
			  )
			: null;
		try {
			await axios.post(
				`${getBackend()}/edit/featured`,
				{
					ids: items,
				},
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
						"Content-Type": "application/json",
					},
				}
			);
			bread("Featured items saved");
		} catch (error) {
			bread(error.toString());
		}
	}

	useEffect(() => {
		const fetchItems = async () => {
			const featuredItems = await fetchFeaturedItems();
			setItems(featuredItems.map(item => item.positionId));
			setItemData(featuredItems);
		};
		fetchItems();
	}, []);
	return (
		<>
			<Container>
				<TopWrapper>
					<h1>Featured Dashboard</h1>
					<TopButtonsWrapper>
						<Button
							onClick={() => {
								setShowModal(true);
							}}
						>
							Add{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
								/>
							</svg>
						</Button>
						<Button onClick={SaveFeatured}>
							Save{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
								/>
							</svg>
						</Button>
					</TopButtonsWrapper>
				</TopWrapper>
				<HeadingItemWrapper>
					<div
						style={{
							width: "6rem",
							paddingLeft: "2.75rem",
						}}
					>
						Image
					</div>
					<ListItem>
						<ItemPositionId>Position ID</ItemPositionId>
						<ItemTitle>Title</ItemTitle>
						<ItemType>Type</ItemType>
					</ListItem>
					<div
						style={{
							width: "2rem",
							height: "2rem",
							margin: "0.25rem",
						}}
					></div>
				</HeadingItemWrapper>
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={items}
						strategy={verticalListSortingStrategy}
					>
						{items.map(id => (
							<SortableItem
								key={id}
								id={id}
								removeItem={removeItem}
								itemData={itemData.find(
									item => item.positionId === id
								)}
							/>
						))}
					</SortableContext>
				</DndContext>
			</Container>
			<AddFeaturedModal
				isActive={showModal}
				setIsActive={setShowModal}
				addItemInfo={addItem}
			/>
		</>
	);
};

export default FeaturedComponent;
