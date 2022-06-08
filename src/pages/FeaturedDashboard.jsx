import Wrapper from "@components/Default/Wrapper";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	useSortable
} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';
import { fetchFeaturedItems } from "@utils/marketplace";
import { getInfuraURL } from "@utils/getIPFSURL";
import { Link } from "react-router-dom";
import { AddFeaturedModal } from "@elements/Collectible/Modals";
import axios from "axios";
import { getBackend } from "@utils/network";
import bread from "@utils/bread";

const Container = styled.div`
	width: 70vw;
	margin: 0 auto;
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
			color: var(--app-text);
		}
	}
`;
const ListItemWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	padding: 0.5rem;
	background-color: var(--app-theme-secondary);
`;
const ListItem = styled.li`
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-evenly;
	// background-color: var(--app-theme-primary-disabled);
	margin: 0.5rem 0;
	flex: 1;
`;

const ItemIcon = styled.div`
	width: 3rem;
	height: 3rem;
	background-color: var(--app-theme-primary);
	margin-right: 0.5rem;
	background: url(${props => props.url}) no-repeat center;
	background-size: cover;
`;

const ItemTitle = styled.div`
	font-weight: 800;
	width: 30rem;
`;

const DragHandle = styled.div`
	background-color: black;
	width: 2rem;
	height: 2rem;
	margin: 0.25rem;
`;

const ItemPositionId = styled.div`
	color: var(--app-text);
`;

const ItemType = styled.div`
	color: var(--app-text);
	font-weight: 800;
`;

const DeleteButton = styled.div`
	background-color: var(--app-theme-primary-disabled);
	width: 2rem;
	height: 2rem;
	margin: 0.25rem;
	cursor: pointer;
	&:hover {
		background-color: var(--app-theme-primary);
	}
	justify-content: center;
	align-items: center;
	display: flex;
`;

const TopWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem;
`;

const TopButtonsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	padding: 0.5rem;
	flex: 0;
`;

const Button = styled.div`
	background-color: var(--app-theme-primary-disabled);
	height: 2rem;
	margin: 0.25rem;
	cursor: pointer;
	padding: 0.25rem;
	&:hover {
		background-color: var(--app-theme-primary);
	}
	align-items: center;
	display: flex;
`;


export function SortableItem(props) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
	} = useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const getCorrectType = (type) => {
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
	}

	const removeItem = () => {
		props.removeItem(props.id);
	}

	return (
		<ListItemWrapper ref={setNodeRef} style={style} {...attributes} >
			<DragHandle {...listeners} />
			<ItemIcon url = {props.itemData ? getInfuraURL (props.itemData?.meta?.image) : ''}/>
			<ListItem>
				<ItemPositionId>{props.id}</ItemPositionId>
				<Link to={`/collectible/${props.itemData?.positionId}`}><ItemTitle>{props.itemData?.meta?.name}</ItemTitle></Link>
				<ItemType>{getCorrectType (props.itemData?.state)}</ItemType>
			</ListItem>
			<DeleteButton onClick={removeItem}>x</DeleteButton>
		</ListItemWrapper>
	);
}

const FeaturedDashboard = () => {
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
			setItems((items) => {
				const oldIndex = items.indexOf(active.id);
				const newIndex = items.indexOf(over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}

	function removeItem (id) {
		setItems((items) => {
			return items.filter(item => item !== id);
		});
	}

	function addItem (item) {
		if (items.indexOf (item.positionId) === -1) {
			setItemData ((itemData) => {
				return [...itemData, item];
			});
			setItems((items) => {
				return [...items, item.positionId];
			});
		}
	}

	async function SaveFeatured () {
		const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
		//eslint-disable-next-line
		let jwt = address
			? JSON.parse(localStorage.getItem("tokens")).find(
					token => token.address === address
			)
			: null;
		try {
			await axios.post (`${getBackend ()}/edit/featured`, {
				ids: items
			}, {
				headers: {
					'Authorization': `Bearer ${jwt.token}`,
					'Content-Type': 'application/json'
				}
			})
			bread ("Featured items saved");
		} catch (error) {
			bread (error.toString ());
		}
	}

	useEffect (() => {
		const fetchItems = async () => {
			const featuredItems = await fetchFeaturedItems ();
			setItems (featuredItems.map ((item) => item.positionId));
			setItemData (featuredItems);
		}
		fetchItems();
	}, []);

	return (
		<Wrapper>
			<Container>
				<TopWrapper>
					<h1>Featured Dashboard</h1>
					<TopButtonsWrapper>
						<Button onClick={() => {
							setShowModal (true);
						}} >Add</Button>
						<Button onClick = {SaveFeatured} >Save</Button>
					</TopButtonsWrapper>
				</TopWrapper>
				<DndContext 
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext 
						items={items}
						strategy={verticalListSortingStrategy}
					>
						{items.map(id => <SortableItem key={id} id = {id} removeItem = {removeItem} itemData = {itemData.find (item => item.positionId === id)}  />)}
					</SortableContext>
				</DndContext>
			</Container>
			<AddFeaturedModal
				isActive={showModal}
				setIsActive={setShowModal}
				addItemInfo={addItem}
			/>
		</Wrapper>
	);
};

export default FeaturedDashboard;
