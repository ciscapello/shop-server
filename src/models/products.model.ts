import mongoose, { Model } from 'mongoose';
import Joi, { ValidationResult } from 'joi';

export interface IProducts {
  name: string;
  description?: string;
  price: string;
  in_stock: boolean;
  images?: string[];
}

interface ProductsMethods {
  joiValidate: (obj: IProducts) => ValidationResult<any>;
}

type ProductsModel = Model<IProducts, {}, ProductsMethods>;

const productsSchema = new mongoose.Schema<IProducts, ProductsModel, ProductsMethods>(
  {
    name: {
      type: String,
      required: [true, 'Name is required field'],
      unique: true
    },
    description: String,
    price: {
      type: String,
      required: [true, 'Price is required field']
    },
    in_stock: {
      type: Boolean,
      default: false
    },
    images: [String]
  },
  {
    versionKey: false
  }
);

productsSchema.methods.joiValidate = function (obj: IProducts) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.string(),
    in_stock: Joi.boolean(),
    images: Joi.array().items(Joi.string())
  });
  return schema.validate(obj);
};

const Products = mongoose.model<IProducts, ProductsModel>('Products', productsSchema);

export default Products;
