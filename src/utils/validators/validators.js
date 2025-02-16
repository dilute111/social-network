const validatePostText  = (minLength, maxLength) => (value) => {
    if (!value) return "This field is required";
    if (value.length < minLength) return `Min length is ${minLength} characters`;
    if (value.length > maxLength) return `Max length is ${maxLength} characters`;
    return true;
}

export default validatePostText