import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required field']
  },
  price: {
    type: String,
    required: [true, 'Price is required field']
  },
  in_stock: {
    type: Boolean,
    default: false
  },
  image_url: {
    type: String,
    required: [true, 'Image is required field']
  }
});

const Products = mongoose.model('Products', productsSchema);

export default Products;
