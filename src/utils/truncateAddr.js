const truncateAddress = (addr,size=4) => `${addr.slice(0, size)}...${addr.slice(-size)}`

export { truncateAddress }