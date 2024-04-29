import ProfilePicture from "@components/Profile/ProfilePicture";
import AuthContext from "@contexts/Auth/AuthContext";
//eslint-disable-next-line
import CopyIcon from "@static/svg/CopyIcon";
import EditIcon from "@static/svg/EditIcon";
import { clamp, truncateAddress } from "@utils/textUtils";
import axios from "axios";
import React, {
	useState,
	useRef,
	useEffect,
	useContext,
	Suspense,
} from "react";
import { useParams } from "react-router";
import styled, { css, keyframes } from "styled-components";
// import Loading from "@elements/Default/Loading";
import Changes from "@elements/ProfileRedesign/Changes";
import EditDetailsContext from "@contexts/EditDetails/EditDetailsContext";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { respondTo } from "@styles/styledMediaQuery";
import bread from "@utils/bread";
// import { BtnBaseAnimated } from "@elements/Default/BtnBase";
// import { domAnimation, LazyMotion } from "framer-motion";
// import MetadataContainer from "./MetadataContainer";
import { getBackend } from "@utils/network";
import constants from "@utils/constants";
import FadeLoaderIcon from "@static/svg/FadeLoader";
import shortenIfAddress from "@utils/shortenIfAddress";

// import { numberSeparator } from "@utils/numberSeparator";
// import { BtnBaseAnimated } from "@elements/Default/BtnBase";
// import { LazyMotion, domAnimation, m } from "framer-motion";
// import ReefIcon from "@static/svg/ReefIcon";
// import { getWithdrawableBalance, withdrawBalance } from "@utils/marketplace";
// import { convertREEFtoUSD } from "@utils/convertREEFtoUSD";

// import SocialsContainer from "./SocialsContainer";
// import AvailableSection from "./Sections/AvailableSection";
// import DottedHeading from "@elements/Default/DottedHeading";
// import OnSaleSection from "@elements/Explore/Sections/OnSaleSection";
import ChevronRight from "@static/svg/ChevronRight";
import { NavLink } from "react-router-dom";
import Background from "./Background";
import { useErrorModalHelper } from "@elements/Default/ErrorModal";
import LoadingIcon from "@static/svg/LoadingIcon";
import { REEF_ADDRESS_SPECIFIC_STRING } from "@elements/Collectible/Modals";
// import CardSectionContainer from "@elements/Default/CardSectionContainer";
// import { fetchUserItems } from "@utils/marketplace";
// import OnSaleSection from "./Sections/OnSaleSection";

const Card = styled.div`
	display: flex;
	padding-top: 2rem;
	border-radius: 1.5rem;
	margin: 0 3rem;
	z-index: 10;
	${respondTo.md`
		margin: 0;
		height: 100%;
		padding-bottom: 2rem;
		z-index:5;
	`}
`;

const Address = styled.h1`
	display: block;
	font-size: 1.25rem;
	font-family: var(--font-family-mono);
	font-weight: 400;
	color: var(--app-container-text-primary-hover);
`;

const Name = styled.h1`
	display: block;
	font-size: 1.75rem;
	max-width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	${respondTo.md`
		max-width: 20rem;
		margin: 0 auto;
		margin-top: 1.5rem;
	`}
`;

const AddressContainer = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	${respondTo.md`
		justify-content: center;
	`}
`;

const Tooltip = styled.div`
	position: absolute;
	transform: translateX(50%);
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	background: var(--app-container-bg-primary);
	user-select: none;
	z-index: 15;
	${props => (!props.remove ? entryAnim : exitAnim)};
`;

const Description = styled.p`
	margin: 0;
	margin-top: 1rem;
	margin-bottom: 1rem;
	font-weight: 200;
	width: 75%;
	color: var(--app-container-text-primary-hover);
	max-height: 16rem;
	${respondTo.md`
		width: 100%;
		text-align:center;
	`}
`;

const swipeDownwards = keyframes`
	0% {
		opacity:0;
		transform: translateX(calc(75% + 2rem));
	}
	100% {
		opacity:1;
		transform: translateX(calc(100% + 3.25rem));
	}
`;

const swipeUpwards = keyframes`
	0% {
		opacity: 1;
		transform: translateX(calc(100% + 3.25rem));
	}
	100% {
		opacity:0;
		transform: translateX(calc(75% + 2rem));
	}
`;

const entryAnim = css`
	animation: ${swipeDownwards} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const exitAnim = css`
	animation: ${swipeUpwards} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)
		forwards;
`;

const swipeRight = keyframes`
	0% {
		opacity: 0;
		transform: translateX(-25px);
	}
	100% {
		opacity:1;
		transform: translateX(0);
	}
`;

const containerEntryAnim = css`
	animation: ${swipeRight} 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 3rem;
	padding-top: 1.5rem;
	${containerEntryAnim}
	${respondTo.md`
		flex-direction: column;
		position: relative;
		top: -6rem;
	`}
`;

const EditContainer = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	height: 100%;
	width: 100%;
	padding-bottom: 4rem;
	padding: 0 2.5rem;
	gap: 2rem;
	${containerEntryAnim}
	${respondTo.md`
		margin: 1rem 0;
		h1{
			text-align:left;
		}
	`}
`;

const Title = styled.h1`
	font-size: 1rem;
`;

const Header = styled.h1`
	font-size: 1.5rem;
	font-weight: 900;
	align-self: flex-start;
	white-space: nowrap;
	padding: 0 1.25rem;
	margin-bottom: 1rem;
`;

const InputContainer = styled.input`
	font-family: var(--font-family);
	font-weight: 600;
	font-size: 1rem;
	background: transparent;
	outline: none;
	border: none;
	color: var(--app-text);
	padding: 0.5rem 0;
	border-bottom: 0.125rem solid var(--app-container-text-primary);
	width: 100%;
	padding-right: 2rem;
	transition: border-bottom 0.2s ease;
	&:focus {
		border-bottom: 0.125rem solid var(--app-container-text-primary-hover);
	}
`;

const LoadingContainer = styled.div`
width: 100%;
height: 10%;
display: grid;
place-items: center;
`;
const ClearContainer = styled.div`
	position: absolute;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	:hover {
		cursor: pointer;
	}
`;

const InputWrapper = styled.div`
	position: relative;
`;

const ContentContainer = styled.div`
	padding: 0 5rem;
	flex: 1;
	display: grid;
	${respondTo.md`
		padding: 0;
	`}
`;

const AdditionalDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	align-self: flex-start;
	gap: 1rem;
`;

const HeaderSection = styled.div`
	display: flex;
	flex-direction: column;
	${containerEntryAnim}
`;

const EditDetailsContainer = styled.label`
	color: var(--app-container-text-primary);
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	cursor: pointer;
	transition: color 0.15s ease;
	&:hover {
		color: var(--app-container-text-primary-hover);
	}
`;

const HeaderContainer = styled.div`
	display: flex;
	padding-top: 2rem;
	border-radius: 1.5rem;
	margin: 0 3rem;
	width: 100%;
	z-index: 10;
	${respondTo.md`
		flex-direction: column;
		margin: 0;
		height: 100%;
		padding-bottom: 2rem;
		z-index:5;
	`}
`;

const SVG = styled.svg`
	fill: var(--app-container-text-primary);
	height: 1.5rem;
	width: 1.5rem;
	transition: all 0.1s ease-in-out;
	:hover {
		transform: scale(1.1);
		fill: var(--app-container-text-primary-hover);
	}
`;

const FieldEditSection = ({
	fieldValue,
	fieldTitle,
	fieldPlaceholder,
	defaultFieldPlaceholder,
	endpoint,
	hasClearButton,
	setSync,
}) => {
	const { info, setInfo } = useContext(EditDetailsContext);
	const [placeholder, setPlaceholder] = useState(
		fieldPlaceholder || defaultFieldPlaceholder
	);
	const [isLoading, setIsLoading] = useState(false);
	const address = JSON.parse(localStorage.getItem("auth"))?.auth.address;
	let jwt = address
		? JSON.parse(localStorage.getItem("tokens")).find(
				token => token.address === address
		  )
		: null;

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (info[fieldValue]?.length) {
				axios
					.post(
						`${getBackend()}/edit/user${
							endpoint || "/"
						}${fieldValue}`,
						{
							[fieldValue]: info[fieldValue],
						},
						{
							headers: {
								Authorization: `Bearer ${jwt.token}`,
							},
						}
					)
					.then(() => {
						setSync(false);
					})
					.finally(() => {
						setIsLoading(false);
					});
			} else {
				setSync(false);
				setIsLoading(false);
			}
		}, 2000);

		return () => clearTimeout(delayDebounceFn);
		//eslint-disable-next-line
	}, [info[fieldValue]]);

	const handleInput = event => {
		setIsLoading(true);
		setSync(true);
		setInfo({
			...info,
			[fieldValue]: event.target.value,
		});
	};

	const handleClear = () => {
		setIsLoading(true);
		setSync(true);
		setInfo({
			...info,
			[fieldValue]: "",
		});
		setPlaceholder(defaultFieldPlaceholder);
		axios
			.post(
				`${getBackend()}/edit/user${endpoint || "/"}${fieldValue}`,
				{
					[fieldValue]: "",
				},
				{
					headers: {
						Authorization: `Bearer ${jwt.token}`,
					},
				}
			)
			.then(() => {
				setSync(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div>
			<Title>{fieldTitle}</Title>
			<InputWrapper>
				<InputContainer
					value={info[fieldValue]?.length ? info[fieldValue] : ""}
					onChange={handleInput}
					placeholder={
						placeholder?.length
							? clamp(placeholder, 50)
							: defaultFieldPlaceholder
					}
				/>
				{isLoading && (
					<LoadingContainer>
						<FadeLoaderIcon />
					</LoadingContainer>
				)}
				{hasClearButton === true &&
					!isLoading &&
					(info[fieldValue]?.length > 0 ||
						placeholder !== defaultFieldPlaceholder) && (
						<ClearContainer onClick={handleClear}>
							<SVG
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="m22 6.002c0-.552-.448-1-1-1h-12.628c-.437 0-.853.191-1.138.523-1.078 1.256-3.811 4.439-4.993 5.816-.16.187-.241.418-.241.65s.08.464.24.651c1.181 1.38 3.915 4.575 4.994 5.836.285.333.701.524 1.14.524h12.626c.552 0 1-.447 1-1 0-2.577 0-9.423 0-12zm-7.991 4.928 1.71-1.711c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .194-.073.385-.219.532l-1.711 1.71 1.728 1.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.531-.219l-1.728-1.728-1.728 1.728c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l1.728-1.728-1.788-1.787c-.146-.147-.219-.338-.219-.531 0-.426.346-.75.751-.75.192 0 .384.073.53.219z" />
							</SVG>
						</ClearContainer>
					)}
			</InputWrapper>
		</div>
	);
};

const EditSection = ({ userData }) => {
	const [sync, setSync] = useState(true);
	return (
		<>
			<FieldEditSection
				fieldValue="displayName"
				fieldTitle="Display Name"
				endpoint="/"
				fieldPlaceholder={userData.name}
				setSync={setSync}
			/>
			<FieldEditSection
				fieldValue="bio"
				fieldTitle="Description"
				endpoint="/"
				hasClearButton
				fieldPlaceholder={userData.description}
				defaultFieldPlaceholder="Enter your bio here"
				setSync={setSync}
			/>
			<FieldEditSection
				fieldValue="instagram"
				fieldTitle="Instagram"
				endpoint="/socials/"
				hasClearButton
				fieldPlaceholder={userData.socials?.instagram}
				defaultFieldPlaceholder="username"
				setSync={setSync}
			/>
			<FieldEditSection
				fieldValue="twitter"
				fieldTitle="Twitter"
				endpoint="/socials/"
				hasClearButton
				fieldPlaceholder={userData.socials?.twitter}
				defaultFieldPlaceholder="username"
				setSync={setSync}
			/>
			<FieldEditSection
				fieldValue="tiktok"
				fieldTitle="TikTok"
				endpoint="/socials/"
				hasClearButton
				fieldPlaceholder={userData.socials?.tiktok}
				defaultFieldPlaceholder="@username"
				setSync={setSync}
			/>
			<FieldEditSection
				fieldValue="website"
				fieldTitle="Website"
				endpoint="/socials/"
				hasClearButton
				fieldPlaceholder={userData.socials?.website}
				defaultFieldPlaceholder="https://www.example.com"
				setSync={setSync}
			/>
			<FieldEditSection
				fieldValue="github"
				fieldTitle="Github"
				endpoint="/socials/"
				hasClearButton
				fieldPlaceholder={userData.socials?.github}
				defaultFieldPlaceholder="username"
				setSync={setSync}
			/>
			<Changes sync={sync} />
		</>
	);
};

const ProfileWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	.heading {
		margin: 1rem;
	}
`;

// const QuickSectionHeading = styled(DottedHeading)`
// 	font-size: 1.5rem;
// 	margin-bottom: 1rem;
// 	margin-top: 1rem;
// `;

const SalesCard = React.lazy(() =>
	import("@elements/Explore/Cards/Sales/SalesCard")
);

const QuickContainer = styled.div`
	width: 100%;
	margin-top: 2rem;
`;

const QuickHeader = styled.h1`
	font-weight: 900;
	// padding-left: 20rem;
	// padding-right: 20rem;
`;

const QuickHeaderSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
`;

const StyledNavLink = styled(NavLink)`
	display: flex;
	align-items: center;
	text-decoration: none;
	color: var(--app-container-text-primary-hover);
	font-size: 1rem;
	font-weight: 800;
	transition: color 0.2s ease;
	&:hover {
		color: var(--app-text);
	}
`;

const QuickCardSectionContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(0, 16rem));
	width: 100%;
	justify-content: center;
	padding: 1.5rem 1.25rem;
	grid-gap: 2rem 1rem;
	overflow-x: hidden;
`;

const QuickSection = ({ items, title, link }) => {
	return (
		<>
			{items?.length ? (
				<QuickContainer>
					<QuickHeaderSection>
						<QuickHeader>{title}</QuickHeader>
						<StyledNavLink to={link}>
							View All <ChevronRight />
						</StyledNavLink>
					</QuickHeaderSection>
					<QuickCardSectionContainer>
						<Suspense>
							{items.map((item, index) => (
								<SalesCard key={index} data={item} />
							))}
						</Suspense>
					</QuickCardSectionContainer>
				</QuickContainer>
			) : null}
		</>
	);
};

const ProfileCard = () => {
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const [isOwnAccount, setIsOwnAccount] = useState(false);
	const [editIsActive, setEditIsActive] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [quickItems, setQuickItems] = useState(undefined);
	const { info } = useContext(EditDetailsContext);
	const { id } = useParams();
	const { auth } = useContext(AuthContext);
	let initialState = {
		avatar: "",
		address: "",
		description: "",
		name: "",
		socials: {},
	};
	const [userData, setUserData] = useState(initialState);
	const { showErrorModal } = useErrorModalHelper();

	// fetch quick items
	useEffect(() => {
		const fetchQuickItems = async () => {
			const address = id || auth?.evmAddress;
			const state = !id || auth?.evmAddress === id ? 0 : 1; // available for auth, sales for non-auth
			try {
				const response = await axios(
					`${getBackend()}/get/marketplace/by-owner/${address}/${state}?limit=4&startFrom=0`
				);
				setQuickItems(response.data?.items);
			} catch (error) {
				bread("Failed to load quick items");
			}
		};
		fetchQuickItems();
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		if (!editIsActive) {
			let address = id ? id : auth.address;
			axios
				.get(`${getBackend()}/get/user/${address}`)
				.then(({ data }) => {
					if (id) {
						setUserData({
							...userData,
							name: data.displayName,
							description: data.bio,
							address: id,
							socials: data.socials || {},
							avatar: getAvatarFromId(id),
						});
					} else if (auth) {
						setUserData({
							...userData,
							address: auth.evmAddress,
							name: data.displayName,
							avatar: getAvatarFromId(auth.address),
							description: data.bio,
							socials: data.socials || {},
						});
					}
				})
				.catch(err => {
					showErrorModal(err.toString ());
				})
				.finally(() => {
					setIsLoading(false);
				});
			id
				? (id === auth?.address || id === auth?.evmAddress) &&
				  setIsOwnAccount(true)
				: setIsOwnAccount(true);
		}
		//eslint-disable-next-line
	}, [info, editIsActive]);

	//eslint-disable-next-line
	const copyAddress = () => {
		navigator.clipboard.writeText(userData.address+REEF_ADDRESS_SPECIFIC_STRING).then(() => {
			setTooltipVisible(true);
			setTimeout(() => {
				setTooltipVisible(false);
			}, 1000);
		});
		bread(constants.COPY_WARNING);
	};
	useEffect(() => {
		if (tooltipVisible) tooltipRef.current.style.display = "block";
		else {
			setTimeout(() => {
				if (tooltipRef.current)
					tooltipRef.current.style.display = "none";
			}, 400);
		}
	}, [tooltipVisible]);
	const tooltipRef = useRef();
	return (
		userData.address!=="" && !isLoading?
		<>
			<Background socials={userData.socials} />
			<Card>
				{!editIsActive ? (
						<ProfileWrapper>
							<Container>
								<ProfilePicture
									src={
										userData.avatar ? userData.avatar : null
									}
								/>
								<ContentContainer>
									<Name>
										{info.name.length
											? shortenIfAddress(info.name)
											: shortenIfAddress(userData.name)}
									</Name>
									<AddressContainer>
										<label title={userData.address}>
											<Address>
												{truncateAddress(
													userData.address,
													6
												)}
											</Address>
										</label>
										<CopyIcon onClick={()=>copyAddress()}/>
										{/* {window.isSecureContext && (
											<CopyIcon
												onClick={copyAddress}
											/>
										)} */}
										<Tooltip
											style={{ display: "none" }}
											ref={tooltipRef}
											remove={!tooltipVisible}
										>
											Copied to clipboard!
										</Tooltip>
									</AddressContainer>
									<Description>
										{clamp(
											info.description.length
												? info.description
												: userData.description
										)}
									</Description>
								</ContentContainer>
								<AdditionalDetailsContainer>
									{/* <SocialsContainer
										{...userData.socials}
									/> */}
									{isOwnAccount && (
										<>
											<EditDetailsContainer
												onClick={() =>
													setEditIsActive(true)
												}
												title={`${
													!editIsActive
														? `Enter`
														: `Exit`
												} Edit Mode`}
											>
												<span>
													Edit Profile Details
												</span>
												<EditIcon />
											</EditDetailsContainer>
											{/* <Withdraw /> */}
										</>
									)}
								</AdditionalDetailsContainer>
							</Container>
							{/* <QuickSectionHeading>{isOwnAccount ? 'Available items' : 'Items on sale'}</QuickSectionHeading> */}
							{/* {isOwnAccount ? (
								<AvailableSection/>

							) : (
								<OnSaleSection/>
							)} */}
							{quickItems?
							
							<QuickSection
								items={quickItems}
								title={
									isOwnAccount
										? `Available items`
										: `Items on sale`
								}
								link={
									isOwnAccount
										? `?tab=Available`
										: `?tab=On%20Sale`
								}
							/>:
							<div style={{position:"absolute",marginTop:"500px",marginLeft:"200px"}}>
						<LoadingContainer>
							<LoadingIcon size={64} />
						</LoadingContainer>
							</div>
							
						}
						</ProfileWrapper>
					) : (
					<HeaderContainer>
						<HeaderSection>
							<Header>Edit Details</Header>
							{isOwnAccount && (
								<EditDetailsContainer
									onClick={() => setEditIsActive(false)}
									title={`${
										!editIsActive ? `Enter` : `Exit`
									} Edit Mode`}
								>
									<span>Exit Edit Mode</span>
									<EditIcon />
								</EditDetailsContainer>
							)}
						</HeaderSection>
						<EditContainer>
							<EditSection
								userData={userData}
								setUserData={setUserData}
							/>
						</EditContainer>
					</HeaderContainer>
				)}
			</Card>
		</>:<LoadingContainer>
			<LoadingIcon size={64}/>
		</LoadingContainer>
	);
};

export default ProfileCard;
