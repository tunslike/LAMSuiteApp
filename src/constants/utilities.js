//function to split using space
const cleanCustomerFullname = (customer_name) => {
    const names = customer_name.split(" ");
    return names[0];
}

//export all functions
export default {
    cleanCustomerFullname,
}