package com.cyran.tp.server.products;

import java.util.List;
import java.util.Iterator;

/**
 * Utils for managing products instances
 *
 * @author Jakub Perdek
 */
public class ProductsUtils {

    /**
     * Creates UserDTO instances from Product instances
     *
     * @param products - array of products instances
     * @return array of ProductsDTO instances created from Product instances
     */
    public static ProductsDTO[] productsToDtoMapping(Products[] products) {
        ProductsDTO udto[] = new ProductsDTO[products.length];

        for (int i = 0; i < products.length; i++) {
            udto[i] = new ProductsDTO();
            if (products[i] != null) {
                udto[i].setId(products[i].getId());
                udto[i].setName(products[i].getName());
                udto[i].setDescription(products[i].getDescription());
				udto[i].setUrl("");
				udto[i].setPrice(products[i].getPrice());
            }
        }
        return udto;
    }

    /**
     * Creates ProductDTO instances from list of Product instances
     *
     * @param products - list of product instances
     * @return array of ProductsDTO instances created from Product instances
     */
    public static ProductsDTO[] productsToDtoMapping(List<Products> products) {
        ProductsDTO udto[] = new ProductsDTO[products.size()];
        Iterator<Products> iterator = products.iterator();
        Products product;
        int i = 0;

        while (iterator.hasNext()) {
            product = iterator.next();

            udto[i] = new ProductsDTO();
            if (product != null) {
                udto[i].setId(product.getId());
                udto[i].setName(product.getName());
                udto[i].setDescription(product.getDescription());
				udto[i].setUrl("");
				udto[i].setPrice(product.getPrice());
                i++;
            }
        }
        return udto;
    }

    /**
     * Creates UserDTO instance from Product instance
     *
     * @param product - product instance
     * @return roductsDTO instance created from product (Products class) instance
     */
    public static ProductsDTO productToDtoMapping(Products product) {
        ProductsDTO udto = new ProductsDTO();
        if (product != null) {
            udto.setId(product.getId());
            udto.setName(product.getName());
            udto.setDescription(product.getDescription());
            udto.setUrl(product.getUrl());
			udto.setPrice(product.getPrice());
        }
        return udto;
    }
}
