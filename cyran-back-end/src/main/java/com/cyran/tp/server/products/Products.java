package com.cyran.tp.server.products;

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


/**
 * Class for mapping products to DB table using Hibernate
 *
 * @author Jakub Perdek
 */
@Entity
@Table(name = "products")
public class Products {
	
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "url", nullable = true)
    private String url;
	
	@Column(name = "price", nullable = false)
    private Double price;


    /**
     * Gets id of product
     *
     * @return id of product
     */
    public Integer getId() {
        return id;
    }

    /**
     * Sets id of product
     *
     * @param id of product
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets name of product
     *
     * @return name of product
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name of product
     *
     * @param name of product
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets description of product
     *
     * @return description of product
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets description of product
     *
     * @param description of product
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets url of product
     *
     * @return url of product
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets url of product
     *
     * @param url of product
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Gets price of product
     *
     * @return price of product
     */
	public Double getPrice() {
        return this.price;
    }

    /**
     * Sets price of product
     *
     * @param price of product
     */
    public void setPrice(Double price) {
        this.price = price;
    }
}
