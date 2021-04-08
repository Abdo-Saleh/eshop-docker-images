package com.cyran.tp.server.pojo;


/**
 * Class for creating Product entity
 *
 * @author Petes Susta
 */
public class Product {

    private String name;
    private String description;
    private String url;
    private Integer quantity;
    private Float price;

    /**
     * Sets price of product
     *
     * @param price - new product price
     */
    public void setPrice(Float price) {
        this.price = price;
    }

    /**
     * Returns product price
     *
     * @return price
     */
    public Float getPrice() {
        return price;
    }

    /**
     * Sets  product quantity
     *
     * @param quantity - new product quantity
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    /**
     * Returns product quantity
     *
     * @return quantity
     */
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * Sets name of product
     *
     * @param Name - new product name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Returns name of product
     *
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets description of product
     *
     * @param description - new product description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Returns description of product
     *
     * @return description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets url to image of product
     *
     * @param url - new product image url
     */
    public void setURL(String url) {
        this.url = url;
    }
    
    /**
     * Returns url to image of product
     *
     * @return url
     */
    public String getURL() {
        return url;
    }
}
