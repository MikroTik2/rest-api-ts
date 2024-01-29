import mongoose, { Document } from "mongoose";

export type ProductDocument = Document & {
     name: string;
     description: string;
     price: number;
     images: string[];
     colors: string[];
     sizes: string[];
};

const productSchema = new mongoose.Schema<ProductDocument>({
     name: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     price: {
          type: Number,
          required: true,
     },

     images: [String],
     colors: [String],
     sizes: [String],

}, { timestamps: true });

export const Product = mongoose.model<ProductDocument>("Product", productSchema);