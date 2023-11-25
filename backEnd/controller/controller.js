import { where } from "sequelize";
import {
    productsModel, 
    details, 
    productAttributes, 
    ExtraImgs, 
    registepurchaseModel, 
    buyerModel, 
    addressModel, 
    opinionsModels
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
opinionsModels.belongsTo(productsModel, { foreignKey: 'id_product' });
productsModel.hasMany(opinionsModels, {foreignKey: 'id_product', as: 'opinions'});
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
                {
                    model:opinionsModels, 
                    as: 'opinions', 
                    attributes: {
                        exclude: ['id_product']
                    }
                }
            ]
        })
        res.json(product);
    } catch(error){
        res.json({message: error.message});
    }
};

//create
export const postOpinion = async (req, res) => {
    try {
        await opinionsModels.create(req.body);
        res.json({
            "message":"¡New registration successfully created!"
        })
    } catch (error) {
        res.json({message: error.message});
    }
};