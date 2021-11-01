const truncateAddress = (addr,size=4) => `${addr.slice(0, size)}...${addr.slice(-size)}`
const clamp = (text,length=128) => text.length>length?(text.slice(0, length) + "..."):text;

export { truncateAddress, clamp }
