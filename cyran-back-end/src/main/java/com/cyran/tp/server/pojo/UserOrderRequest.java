package com.cyran.tp.server.pojo;


/**
 * Class representing user request order
 *
 * @author Viktor Matovic
 */
public class UserOrderRequest {

    private String forUser;
    private String order;
    private String description;
    private Float price;
    private Integer quantity;
    private String URL;

    
    /**
     * Sets name of current user executing order
     *
     * @param forUser - new username
     */
    public void setForUser(String forUser) {
        this.forUser = forUser;
    }

    /**
     * Returns name of current user executing order
     *
     * @return forUser
     */
    public String getForUser() {
        return forUser;
    }

    /**
     * Sets new order id
     *
     * @param order - new order id
     */
    public void setOrder(String order) {
        this.order = order;
    }

    /**
     * Returns new order id
     *
     * @return order
     */
    public String getOrder() {
        return order;
    }

    /**
     * Sets description of order
     *
     * @param description - new order description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Returns description of order
     *
     * @return description
     */
    public String getDescription() {
        return description;
    }

    
    /**
     * Sets price of order
     *
     * @param price - new order price
     */
    public void setPrice(Float price) {
        this.price = price;
    }

    /**
     * Returns order price
     *
     * @return price
     */
    public Float getPrice() {
        return price;
    }

    /**
     * Sets  order quantity
     *
     * @param quantity - new order quantity
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * Returns order quantity
     *
     * @return quantity
     */
    public Integer getQuantity() {
        return quantity;
    }

    
    /**
     * Sets url to image of product
     *
     * @param url - new product image url
     */
    public void setURL(String URL) {
        this.URL = URL;
    }

    /**
     * Returns url to image of product
     *
     * @return url
     */
    public String getURL() {
        return URL;
    }
}
