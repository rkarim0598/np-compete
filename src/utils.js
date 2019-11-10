export const makeTweetUrl = (nonprofit) => {
    const text = encodeURIComponent(`I'm voting for ${nonprofit.name} in the #NPCompete challenge! To vote yourself, tweet #${nonprofit.hashtag} or donate online`)
    return `https://twitter.com/intent/tweet?text=${text}`
};
