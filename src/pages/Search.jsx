import Wrapper from "@components/Default/Wrapper";
import LoadingIcon from "@static/svg/LoadingIcon";
// import SearchIcon from "@static/svg/SearchIcon";
import { getAvatarFromId } from "@utils/getAvatarFromId";
import { getInfuraURL } from "@utils/getIPFSURL";
import { fetchCollectionsPaginated, fetchUsersPaginated } from "@utils/search";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	width: 70vw;
	margin: 0 auto;
	ul {
		list-style-position: inside;
	}
	// h1,
	// h2 {
	// 	margin: 0.75rem 0;
	// }
	// h1 {
	// 	font-size: 2rem;
	// 	font-weight: 800;
	// 	margin-bottom: 2rem;
	// }
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


const Underlined = styled.span`
    font-weight: 300;
    text-decoration: underline;
`;

const TitleText = styled.h1`
    font-size: 2rem;
    font-weight: 800;
`;

const UserListWrapper = styled.div`
    justify-content: center;
    display: grid;
	grid-template-columns: repeat(auto-fit, minmax(0, 28rem));
    width: 100%;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap: .5rem;
`;

const UserListItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 0 auto;
    padding: .25rem;
    padding-left: 1rem;
    border-radius: 0.5rem;
    background-color: var(--app-container-bg-primary);
    transition: background-color 0.1s ease;
    &:hover {
        background-color: var(--app-container-bg-secondary);
        cursor: pointer;
    }
    & > img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 100rem;
        margin-right: 1rem;
    }
    & > div {
        flex: 1;
        overflow: hidden;
        & > * {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
    & > div > h2 {
        font-size: 1.5rem;
        font-weight: 800;
    }
    & > div > p {
        font-size: 1rem;
        font-weight: 500;
    }
`;

// const bgSizeAnim = keyframes`
//     0% {
//         background-size: 100%;
//     }
//     50% {
//         background-size: 105%;
//     }
//     100% {
//         background-size: 100%;
//     }
// `;

// const CollectionListItem = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: left;
//     justify-content: flex-end;
//     width: 100%;
//     height: 10rem;
//     margin: 0 auto;
//     padding: .25rem;
//     padding-left: 1rem;
//     border-radius: 0.5rem;
//     background: linear-gradient(
//         0deg,
//         rgba(0, 0, 0, .8) 0%,
//         rgba(0, 0, 0, 0) 70%
//     ),
//     url(${props => props.background});
//     background-size: cover;
//     background-position: center;
//     background-repeat: no-repeat;
//     transition: all 0.2s ease-in-out;
//     &:hover {
//         cursor: pointer;
//         background: linear-gradient(
//             0deg,
//             rgba(0, 0, 0, .9) 0%,
//             rgba(0, 0, 0, 0) 90%
//         ),
//         url(${props => props.background});
//         background-size: cover;
//         background-position: bottom;
//     }
//     overflow: hidden;
//     & > * {
//         text-overflow: ellipsis;
//         overflow: hidden;
//         white-space: nowrap;
//     }
// `;

const CollectionListItem = styled.div`
    border-radius: 1rem;
    overflow: hidden;
    padding: 0;
    height: 10rem;
    position: relative;
    &:hover > img {
        transform: scale(1.05);
    }
`;
const CollectionTextWrapper = styled.div`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: left;
    padding: .25rem;
    padding-left: 1rem;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, .8) 0%,
        rgba(0, 0, 0, 0) 70%
    );
    transition: all 0.2s ease-in-out;
    & > * {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:hover {
        // background: linear-gradient(
        //     0deg,
        //     rgba(0, 0, 0, .9) 0%,
        //     rgba(0, 0, 0, 0) 90%
        // );
        cursor: pointer;
    }
`;

const CollectionImage = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
    transition: all 0.1s ease-in-out;
`;

const CollectionName = styled.h2`
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--app-text);
`;

const CollectionDescription = styled.p`
    font-size: 1rem;
    font-weight: 500;
    color: var(--app-text);
`;

const LoadMoreButton = styled.button`
    width: 100%;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: var(--app-theme-primary);
    color: var(--app-primary);
    font-size: 1.35rem;
    font-weight: 800;
    transition: background-color 0.1s ease;
    &:hover {
        background-color: var(--app-theme-primary-disabled);
        cursor: pointer;
    }
`;


const CollectionsSearch = () => {
    const { query } = useParams ();
    const [collections, setCollections] = useState ([]);
    const [isLoading, setIsLoading] = useState (true);
    const [isFinished, setIsFinished] = useState (false);
    const perPage = 6;
    const fetchMore = async () => {
        if (isFinished) return;
        setIsLoading (true);
        fetchCollectionsPaginated (query, Math.round (collections.length / perPage) + 1, perPage).then (res => {
            const newCollections = [...collections, ...res.collections];
            setCollections (newCollections);
            setIsLoading (false);
            if (res.total === newCollections.length) {
                setIsFinished (true);
            }
        });
    };
    const fetchNew = async () => {
        setIsLoading (true);
        fetchCollectionsPaginated (query, 1, perPage).then (res => {
            setCollections (res.collections);
            setIsLoading (false);
            if (res.total === res.collections.length) {
                setIsFinished (true);
            }
        });
    };
    useEffect (() => {
        setCollections ([]);
        setIsFinished (false);
        fetchNew ();
        // eslint-disable-next-line
    }, [query]);
    return (
        <Wrapper>
            <Container>
                <TitleText>Collection results for <Underlined>{query}</Underlined></TitleText>
                <UserListWrapper>
                    {collections.map (collection => (
                        <CollectionListItem
                        key = {collection.id}
                        // background = {getInfuraURL(collection.thumbnail || collection.image)}
                        onClick = {() => window.location.href = `/collections/${collection.id}`}
                        >
                            <CollectionImage src = {getInfuraURL(collection.thumbnail || collection.image)} />
                            <CollectionTextWrapper>
                                <CollectionName>{collection.name}</CollectionName>
                                <CollectionDescription>{collection.description}</CollectionDescription>
                            </CollectionTextWrapper>
                        </CollectionListItem>
                    ))}
                    {/* {collections.map (user => (
                        <UserListItem
                            key={user.evmAddress}
                            onClick={() => window.location.href = `/profile/${user.evmAddress}`}
                        >
                            <img src={getAvatarFromId (user.evmAddress)} alt="user" />
                            <div>
                                <h2>{user.displayName}</h2>
                                <p>{user.evmAddress}</p>
                            </div>
                        </UserListItem>
                    ))} */}
                </UserListWrapper>
                {!isFinished ? (
                !isLoading ? <LoadMoreButton onClick={fetchMore}>Load more</LoadMoreButton> : <LoadingIcon />
                ) : null}
            </Container>
        </Wrapper>
    );
};

const UsersSearch = () => {
    const { query } = useParams ();
    const [users, setUsers] = useState ([]);
    const [isLoading, setIsLoading] = useState (true);
    const [isFinished, setIsFinished] = useState (false);
    const usersPerPage = 10;
    const fetchMore = async () => {
        if (isFinished) return;
        setIsLoading (true);
        fetchUsersPaginated (query, Math.round (users.length / usersPerPage) + 1, usersPerPage).then (res => {
            const newUsers = [...users, ...res.users];
            setUsers (newUsers);
            setIsLoading (false);
            if (res.total === newUsers.length) {
                setIsFinished (true);
            }
        });
    };
    const fetchNew = async () => {
        setIsLoading (true);
        fetchUsersPaginated (query, 1, usersPerPage).then (res => {
            setUsers (res.users);
            setIsLoading (false);
            if (res.total === res.users.length) {
                setIsFinished (true);
            }
        });
    };
    useEffect (() => {
        setUsers ([]);
        setIsFinished (false);
        fetchNew ();
        // eslint-disable-next-line
    }, [query]);
    return (
        <Wrapper>
            <Container>
                <TitleText>User results for <Underlined>{query}</Underlined></TitleText>
                <UserListWrapper>
                    {users.map (user => (
                        <UserListItem
                            key={user.evmAddress}
                            onClick={() => window.location.href = `/profile/${user.evmAddress}`}
                        >
                            <img src={getAvatarFromId (user.evmAddress)} alt="user" />
                            <div>
                                <h2>{user.displayName}</h2>
                                <p>{user.evmAddress}</p>
                            </div>
                        </UserListItem>
                    ))}
                </UserListWrapper>
                {!isFinished ? (
                !isLoading ? <LoadMoreButton onClick={fetchMore}>Load more</LoadMoreButton> : <LoadingIcon />
                ) : null}
            </Container>
        </Wrapper>
    );
};

export {
    CollectionsSearch,
    UsersSearch
};
