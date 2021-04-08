package com.cyran.tp.server.pojo;

import java.util.ArrayList;
import java.util.List;

/**
 * Class representing User entity
 *
 * @author Peter Spusta
 */
public class User {

    private String userName;
    private String password;
    private String email;
    private List<Product> products = new ArrayList<>();

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
     * Sets user name of User
     *
     * @param userName - new user name
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * Sets password for user account
     *
     * @param userName - new user name
     */
    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Returns username of User
     *
     * @return userName
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Returns password of user account
     *
     * @return password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Returns email of user account
     *
     * @return email
     */
    public String getEmail() {
        return email;
    }
}
