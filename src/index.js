module.exports = function check(str, bracketsConfig) {
  const openSet = new Set(bracketsConfig.map(([open]) => open));
  const pairs = new Map(bracketsConfig.map(([open, close]) => [close, open]));

  const result = str.split('').reduce((stack, char) => {
    if (openSet.has(char)) {
      const isSameType = pairs.get(char) === char;
      if (isSameType && stack.length > 0 && stack[stack.length - 1] === char) {
        return stack.slice(0, -1);
      }
      return [...stack, char];
    }

    if (pairs.has(char)) {
      const expectedOpen = pairs.get(char);
      if (stack.length === 0 || stack[stack.length - 1] !== expectedOpen) {
        return [null]; // Use a sentinel value to mark invalid (non-empty)
      }
      return stack.slice(0, -1);
    }

    return stack; // ignore other chars if any
  }, []);

  return result.length === 0 && result[0] !== null;
};
