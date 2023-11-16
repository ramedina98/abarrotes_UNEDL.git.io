import { where } from "sequelize";
import {
    productsModel, 
    details, 
    productAttributes, 
    ExtraImgs, 
    registepurchaseModel, 
    buyerModel, 
    addressModel
} from "../models/models.js";

//get...
export const getProducts = async (req, res) => {
    try {
        const products = await productsModel.findAll();
        res.json(products);
    } catch (error) {
        res.json({message: error.message});
    }
}

productsModel.belongsTo(details, {foreignKey: 'details_product', as: 'detailsOfProduct'}); 
details.belongsTo(ExtraImgs, {foreignKey: 'extra_img', as: 'img'});
productAttributes.belongsTo(productsModel, { foreignKey: 'product_id' });
productsModel.hasMany(productAttributes, { foreignKey: 'product_id', as: 'productAttributes' });
export const getProductInfo = async (req, res) => {
    try{
        const product = await productsModel.findAll({
            where:{id_p:req.params.id}, 
            include:[
                {
                    model:details, 
                    as: 'detailsOfProduct', 
                    attributes: ['category', 'long_description','promo'], 
                    include: [
                        {
                            model: ExtraImgs,
                            as: 'img', 
                            attributes: ['img1', 'img2', 'img3'],
                        }
                    ]
                },
                {
                    model: productAttributes,
                    as: 'productAttributes',
                    attributes: ['att_name', 'att_value'],
                },
            ]
        })
        res.json(product);
    } catch(error){
        res.json({message: error.message});
    }
};

//create
export const createRegister = async (req, res) => {
    try {
        await registepurchaseModel.create();
        await buyerModel.create();
        await addressModel.create();
    } catch (error) {
        
    }
}