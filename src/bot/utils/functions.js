export const randInt = (min, max) => {
    try {
        return Math.floor(Math.random() * (max - min + 1) + min);
    } catch (error) {
        logger.error("randInt", error);
        return null;
    }
}