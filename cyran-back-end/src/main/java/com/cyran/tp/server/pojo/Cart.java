package com.cyran.tp.server.pojo;

import java.util.List;
/**
 * Class for creating Cart entity
 *
 * @author Viktor Matovic
 */
public class Cart {

    private List<Product> products;
    private Float finalPrice;

    /**
     * Sets list of products
     *
     * @param products - list of products
     */
    public void setProducts(List<Product> products) {
        this.products = products;
    }

    /**
     * Returns list of products
     *
     * @return products
     */
    public List<Product> getProducts() {
        return products;
    }
    
    /**
     * Sets final price of Cart
     *
     * @param finalPrice - new finalPrice of Cart
     */
    public void setFinalPrice(Float finalPrice) {
        this.finalPrice = finalPrice;
    }
    
    /**
     * Returns Cart final price
     *
     * @return finalPrice
     */
    public Float getFinalPrice() {
        return finalPrice;
    }
}
