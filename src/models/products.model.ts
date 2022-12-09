import mongoose from 'mongoose';

interface IProducts {
  name: string;
  price: string;
  in_stock: boolean;
  images: string[];
}

const productsSchema = new mongoose.Schema<IProducts>(
  {
    name: {
      type: String,
      required: [true, 'Name is required field'],
      unique: true
    },
    price: {
      type: String,
      required: [true, 'Price is required field']
    },
    in_stock: {
      type: Boolean,
      default: false
    },
    images: {
      type: [String],
      required: [true, 'Image is required field']
    }
  },
  {
    versionKey: false
  }
);

const Products = mongoose.model<IProducts>('Products', productsSchema);

export default Products;
