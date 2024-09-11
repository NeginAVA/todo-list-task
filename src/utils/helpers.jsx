
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export const highlightText = (text, search) => {
    if (!search.trim()) return text;

    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, index) =>
        regex.test(part) ? <span key={index} className="highlight">{part}</span> : part
    );
};