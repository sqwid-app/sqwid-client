import DottedHeading from "@elements/Default/DottedHeading";
import React from "react";
import styled from "styled-components";
import { respondTo } from "@styles/styledMediaQuery";
import { CollectionDescription, CollectionImage, CollectionName } from "@pages/Search";
import ReefIcon from "@static/svg/ReefIcon";
import { numberSeparator } from "@utils/numberSeparator";
import Select from "react-select";
import { styles } from "@styles/reactSelectStyles";
import { useEffect } from "react";
import { fetchCollectionsByStats } from "@utils/marketplace";
import { getInfuraURL } from "@utils/getIPFSURL";
import LoadingIcon from "@static/svg/LoadingIcon";

const Wrapper = styled.div`
	padding: 0 6rem;
	min-height: 70vh;
	max-width: 90rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	${respondTo.md`
		padding: 0;
		h1{
			padding-left: 3rem;
		}
	`}
`;

const Container = styled.div`
	width: 100%;
`;

const CollectionsWrapper = styled.div`
	justify-content: center;
    display: grid;
	grid-template-columns: repeat(auto-fit, minmax(0, 35rem));
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 1rem;
    gap: 1rem;
`;

const CollectionListItem = styled.div`
    border-radius: 1rem;
    overflow: hidden;
    padding: 0;
    height: 8rem;
    position: relative;
    &:hover > img {
        transform: scale(1.05);
    }
	border: .15rem solid var(--app-container-bg-secondary);
`;

const CollectionInfo = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	// padding: 0 1rem;
	padding-right: 1rem;
	color: var(--app-text);
	> p {
		color: var(--app-container-text-primary-hover);
		font-size: .9rem;
	}
`;

const CollectionStats = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	color: var(--app-container-text-primary-hover);
	gap: .25rem;
	opacity: .8;
	transition: opacity 0.1s ease;
	div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
		width: 100%;
		svg {
			width: 1.5rem;
			height: 1.5rem;
		}
		div {
			color: var(--app-text);
			font-weight: 700;
			justify-content: flex-end;
			flex: 1;
		}
	}
`;

const CollectionTextWrapper = styled.div`
	position: absolute;
	top: 0px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	padding: 1rem;
	gap: 1rem;
	background: linear-gradient(
		0deg,
		rgba(0, 0, 0, .9) 0%,
		rgba(0, 0, 0, 0) 80%
	), 
	linear-gradient(
		270deg,
		rgba(0, 0, 0, .9) 0%,
		rgba(0, 0, 0, 0) 80%
	);
	transition: all 0.2s ease-in-out;
	&:hover {
		cursor: pointer;
		div {
			opacity: 1;
		}
	}
`;

const StyledSelect = styled(Select)`
	min-width: 8rem;
	z-index: 6;
	position: relative;
`;

const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1rem;
	${respondTo.md`
		flex-direction: column;
	`}
`;

const SortContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 1rem;
`;

const LoadingContainer = styled.div`
	width: 100%;
	display: grid;
	place-items: center;
`;

// const CollectionBadge = styled.div`
// 	position: absolute;
// 	height: 1.5rem;
// 	width: 2.5rem;
// 	top: 0;
// 	left: .5rem;
// 	border-bottom-right-radius: .35rem;
// 	border-bottom-left-radius: .35rem;
// 	background: black;
// 	color: var(--app-text);
// 	font-weight: 700;
// 	text-align: center;
// 	border: .15rem solid ${props => props.color};
// 	border-top: none;
// `;

// const CollectionBadgeText = styled.div`
// 	color: var(--app-text);
// 	font-size: .8rem;
// 	font-weight: 700;
// `;

const CollectionsPage = () => {
	const [collections, setCollections] = React.useState(undefined);
	const options = [
		{ value: "items", label: "Items" },
		{ value: "volume", label: "Volume" },
		{ value: "sales", label: "Sales" },
		{ value: "average", label: "Average sale" },
	]
	const [defaultValue, setDefaultValue] = React.useState(options[0]);
	const [finished, setFinished] = React.useState(true); // TODO: fix

	useEffect (() => {
		const fetchCollections = async () => {
			const res = await fetchCollectionsByStats (defaultValue.value);
			const data = res.collections?.map (item => {
				return {
					id: item.id,
					name: item.data.name,
					description: item.data.description.slice (0, 100) + (item.data.description.length >= 100 ? "..." : ''),
					thumbnail: getInfuraURL (item.data.thumbnail || item.data.image),
					stats: {
						items: item.data.stats.items,
						itemsSold: item.data.stats.itemsSold,
						volume: item.data.stats.volume,
						average: item.data.stats.average,
					}
				}
			});
			setCollections (data);
		}
		fetchCollections ();
	}, [defaultValue])

	// TODO: fix
	const loadMore = async () => {
		const res = await fetchCollectionsByStats (defaultValue.value, collections[collections.length - 1].stats[defaultValue.value]);

		if (!res.collections?.length) {
			setFinished (true);
			return;
		}
		const data = res.collections?.map (item => {
			return {
				id: item.id,
				name: item.data.name,
				description: item.data.description.slice (0, 100) + (item.data.description.length >= 100 ? "..." : ''),
				thumbnail: getInfuraURL (item.data.thumbnail || item.data.image),
				stats: {
					items: item.data.stats.items,
					itemsSold: item.data.stats.itemsSold,
					volume: item.data.stats.volume,
					average: item.data.stats.average,
				}
			}
		});
		setCollections (collections.concat (data));
	}

	return (
		<>
			<Wrapper>
				<Container>
					<HeaderContainer>
						<DottedHeading size="2.5rem">Explore top collections</DottedHeading>
						<SortContainer>
							<span>Sort by</span>
							<StyledSelect
								options={options}
								styles={styles}
								isSearchable={false}
								value={defaultValue}
								placeholder="Select Route"
								onChange={(item) => {
									setDefaultValue (item)
								}}
							/>
						</SortContainer>
					</HeaderContainer>
					<CollectionsWrapper>
						{collections?collections.map((collection, i) => (
							<CollectionListItem
							key = {collection.id}
							onClick = {() => window.location.href = `/collections/${collection.id}`}
							src = {collection.thumbnail}
							>
								{/* <CollectionBadge color = {i === 0 ? 'green' : 'red'}>
									<CollectionBadgeText>1</CollectionBadgeText>
								</CollectionBadge> */}
								<CollectionImage src = {collection.thumbnail} alt = {collection.name} />
								<CollectionTextWrapper>
									<CollectionInfo>
										<CollectionName>{collection.name}</CollectionName>
										<CollectionDescription>{collection.description}</CollectionDescription>
									</CollectionInfo>
									<CollectionStats>
										<div>
											<svg clip-rule="evenodd" fill-rule="evenodd" fill = "currentColor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3.514 6.61c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508m15.986 2.115v7.525l-6.75 3.722v-7.578zm-15 7.425v-7.458l6.75 3.75v7.511zm.736-8.769 6.764-3.813 6.801 3.834-6.801 3.716z" fill-rule="nonzero"/></svg>
											<span>Items</span>
											<div>{numberSeparator(Math.round (collection.stats?.items))}</div>
										</div>
										<div>
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19.523 5.175c-1.397 0-2.335-.494-3.888-1.311-.852-.446-1.536-.864-2.518-.864-1.275 0-1.747.658-2.552 1.564-2.052-1.593-3.513-.907-4.808-.293-.757.358-1.539.729-2.587.729h-3.17v7.91c1.073.102 2.001.169 3.287.464-.789 1.431.057 3.157 1.634 3.422.324.675.971 1.159 1.718 1.286.312.653.942 1.151 1.709 1.279.544 1.147 1.962 1.664 3.188 1.07.434.358.985.569 1.567.569.892 0 1.737-.483 2.145-1.337.748-.157 1.358-.648 1.664-1.296.708-.147 1.324-.604 1.648-1.286 1.386-.282 2.292-1.727 1.688-3.178 1.096-.54 2.221-.76 3.752-1.1v-7.866c-.961.059-3.507.218-4.477.238zm-14.719 9.985c-.377-.284-.424-.828-.103-1.21l.782-.959c.321-.384.887-.465 1.265-.179.38.285.424.826.104 1.211l-.782.956c-.321.385-.887.464-1.266.181zm1.714 1.282c-.378-.286-.433-.816-.111-1.2l.79-.969c.321-.383.887-.464 1.265-.181.378.285.425.828.103 1.21l-.79.969c-.321.385-.877.457-1.257.171zm1.714 1.284c-.378-.285-.426-.828-.103-1.213l.78-.956c.321-.384.887-.467 1.266-.182.377.286.424.827.103 1.211l-.781.958c-.321.385-.889.465-1.265.182zm3.76.14l-.783.963c-.323.386-.888.465-1.266.181-.378-.285-.424-.826-.104-1.21l.785-.964c.322-.382.888-.464 1.265-.178.38.282.426.825.103 1.208zm1.642 1.422c-.154.119-.341.177-.531.177-.137 0-.273-.035-.401-.095l.454-.559c.199-.235.347-.513.44-.81l.124.11c.32.367.279.891-.086 1.177zm4.968-3.87c-.368.284-.924.215-1.24-.146l-2.496-2.141c-.207-.177-.471.136-.266.31l2.433 2.089c.319.366.278.893-.088 1.175-.369.287-.926.219-1.242-.146l-1.915-1.678c-.204-.179-.474.13-.271.309l1.868 1.642c.319.365.272.88-.097 1.166-.364.282-.911.231-1.231-.137l-.365-.325c.133-1.26-.747-2.32-1.924-2.516-.326-.684-.975-1.157-1.712-1.28-.322-.678-.967-1.157-1.712-1.282-.647-1.359-2.428-1.748-3.648-.777-.801-.24-1.688-.437-2.696-.573v-4.108h1.17c1.498 0 2.577-.511 3.443-.922 1.087-.515 1.609-.754 2.581-.046-.64.636-1.294 1.196-1.967 1.589-.589.343-.852.998-.672 1.668.236.874 1.262 1.758 2.767 1.758 1.981 0 2.935-1.196 3.935-1.766 1.493 1.436 3.93 3.644 5.47 5.026.266.362.222.842-.125 1.111zm3.398-4.217c-.912.215-1.801.469-2.707.926-1.085-.979-3.529-3.193-4.399-4.063-.992-.991-1.994-1.086-3.093-.197-.79.636-2.018 1.447-2.971 1.099 1.365-.957 2.592-2.35 3.692-3.596.313-.354.527-.592 1.502-.09l.678.355c1.725.908 3.07 1.627 5.132 1.535.62-.025 1.487-.071 2.166-.11v4.141z"/></svg>
											<span>Sales</span>
											<div>{numberSeparator(Math.round (collection.stats?.itemsSold))}</div>
										</div>
										<div>
											<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"/></svg>
											<span>Volume</span>
											<div>{numberSeparator(Math.round (collection.stats?.volume))}</div>
										</div>
										<div>
											<ReefIcon centered/>
											<span>Average sale</span>
											<div>{numberSeparator(Math.round (collection.stats?.average))}</div>
										</div>
									</CollectionStats>
								</CollectionTextWrapper>
							</CollectionListItem>
						)):<>
						<LoadingContainer>
								<LoadingIcon size={64}/>
						</LoadingContainer>
						</>}
					</CollectionsWrapper>
					{!finished && <button onClick={loadMore}>load more</button>}
				</Container>
			</Wrapper>
		</>
	);
};

export default CollectionsPage;
