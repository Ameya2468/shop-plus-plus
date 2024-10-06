import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        price: Number,
    }],
});

const Wishlist = mongoose.model('wishlist',WishlistSchema);
export default Wishlist