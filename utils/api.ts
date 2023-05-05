import axios from "axios";


const server = "http://192.168.43.170:5000";
// const server = "http://192.168.0.140:5000"; 

type ProductsAPIParams = Promise<any[] | null>;

export const getProducts = async (model: String): ProductsAPIParams => {
    try {
        const data = await axios.get(`${server}/get/${model}`);
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

type AllProductsAPIParams = Promise<{ Boissons: any[] | null, Burgers: any[] | null, Menus: any[] | null }>;

export const getAllProducts = async (): AllProductsAPIParams => {
    try {
        const data = await axios.get(server + '/get/products');
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

export const login = async (email: String, password: String) => {
    try {
        const data = await axios.get(server + '/login', {params: {email: email, password: password}});
        return data.data.token;
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (email: String, password: String, firstname: String, lastname: String) => {
    try {
        const data = await axios.post(server + '/register', null, {params: {email: email, password: password, firstname: firstname, lastname: lastname}});
        return data.data.token;
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (token: string) => {
    try {
        const data = await axios.get(server + '/get/user', {params: {token: token}});
        return data.data.user;
    } catch (error) {
        console.log(error);
    }
}

export const updateShoppingCart = async (token: string, productId: string, number: number) => {
    try {
        await axios.post(server + '/shopping/update', null, {params: {token: token, id_product: productId, number: number}});
    } catch (error) {
        console.log(error);
    }
}

export const getShoppingCartItems = async (token: string) => {
    try {
        const data = await axios.get(server + '/shoppings/get', {params: { token: token }});
        if (data.data.status == 200) return data.data.data
        else null
    } catch (error) {
        console.log(error);
    }
}


export { server, ProductsAPIParams, AllProductsAPIParams };
