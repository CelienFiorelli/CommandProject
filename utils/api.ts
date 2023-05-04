import axios from "axios";


const server = "http://192.168.43.170:5000";
// const server = "http://192.168.0.140:5000"; 

type ProductsAPIParams = Promise<any[] | null>;

const getProducts = async (model: String): ProductsAPIParams => {
    try {
        const data = await axios.get(server + '/get/' + (model == "*" ? "products" : model));
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

type AllProductsAPIParams = Promise<{ Boissons: any[] | null, Burgers: any[] | null, Menus: any[] | null }>;

const getAllProducts = async (): AllProductsAPIParams => {
    try {
        const data = await axios.get(server + '/get/products');
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

const login = async (email: String, password: String) => {
    try {
        const data = await axios.get(server + '/login', {params: {email: email, password: password}});
        return data.data.token;
    } catch (error) {
        console.log(error);
    }
}

const registerUser = async (email: String, password: String, firstname: String, lastname: String) => {
    try {
        const data = await axios.post(server + '/register', null, {params: {email: email, password: password, firstname: firstname, lastname: lastname}});
        return data.data.token;
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (token: string) => {
    try {
        const data = await axios.get(server + '/get/user', {params: {token: token}});
        return data.data.user;
    } catch (error) {
        console.log(error);
    }
}


export { server, getProducts, ProductsAPIParams, getAllProducts, AllProductsAPIParams, login, registerUser, getUser };
