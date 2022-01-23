const axios = require('axios').default;
const instance = axios.create({
    baseURL: 'https://modelsis.herokuapp.com/',
    timeout: 1000,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
    }
});

export const getAllProduct = async () => {
    return await instance.get('/products')
        .then((response) => response.data)
        .catch((error) => console.error(error))
};

export const getProductById = async (id) => {
    if (id != undefined) {
        const url = 'https://modelsis.herokuapp.com/products/' + id;
        return await instance.get(url)
            .then((response) => response.data)
            .catch((error) => console.error(error))
    }
};

export const getAllType = async () => {
    const url = 'https://modelsis.herokuapp.com/productsType'
    return await instance.get(url)
        .then((response) => response.data)
        .catch((error) => console.error(error))
};

export const putUpdate = async (id, name, type) => {
    if (id != undefined, name !== "", type !== "") {
        instance.put('/products',
            JSON.stringify({
                id: id,
                name: name,
                type: type
            })).then((response) => console.log(response))
            .catch((error) => console.error(error));
    }

};

export const postType = async (name) => {
    console.log("post");
    if (name !== "") instance.post('/productsType',
        JSON.stringify({
            type: name
        }))
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
};

export const postProduct = async (productName, typeName) => {

    if (productName !== "" && typeName !== "") {
        console.log("post");
        instance.post('/products',
            JSON.stringify({
                name: productName,
                type: typeName
            }))
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    }
};