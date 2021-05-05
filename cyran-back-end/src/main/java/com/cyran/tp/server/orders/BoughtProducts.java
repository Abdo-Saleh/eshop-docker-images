package com.cyran.tp.server.orders;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Columns;
import javax.persistence.CascadeType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import com.cyran.tp.server.users.Users;
import com.cyran.tp.server.products.Products;

/**
 * Class for bought products
 *
 * @author Jakub Perdek
 */
@Entity
@Table(name = "boughtproducts")
public class BoughtProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bproduct_id", unique = true, nullable = false)
    private Integer id;

	@Column(name = "price", nullable = false)
    private Double price;
	
    @Column(name = "quantity", nullable = false)
    private Long quantity;

	
	@ManyToOne(targetEntity = Orders.class)
	@JoinColumn(name="order_id")
    private Orders order;
	
    @ManyToOne(targetEntity = Products.class)
	@JoinColumn(name="product_id")
    private Products product;

    /**
     * Gets id of bought product
     *
     * @return id of bought product
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id of bought product
     *
     * @param id of bought product
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets price of bought product
     *
     * @return price of bought product
     */
    public Double getPrice() {
        return price;
    }

    /**
     * Sets price of bought product
     *
     * @param price of bought product
     */
    public void setPrice(Double price) {
        this.price = price;
    }

	/**
     * Gets quantity of bought product
     *
     * @return quantity of bought product
     */
    public Long getQuantity() {
        return quantity;
    }

    /**
     * Sets quantity of bought product
     *
     * @param quantity of bought product
     */
    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }
	
    /**
     * Gets order which contains this product
     *
     * @return order which contains this product
     */
    public Orders getOrder() {
        return order;
    }

    /**
     * Sets order which contains this product
     *
     * @param order which contains this product
     */
    public void setOrder(Orders order) {
        this.order = order;
    }

    /**
     * Gets original product
     *
     * @return original product with its actual price
     */
    public Products getProduct() {
        return product;
    }

    /**
     * Sets reference to original product
     *
     * @param original product with its actual price
     */
    public void setProduct(Products product) {
        this.product = product;
    }

}
