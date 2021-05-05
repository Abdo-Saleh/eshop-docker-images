package com.cyran.tp.server.products;

import javax.persistence.Column;

/**
 * Class for Product representation
 *
 * @author Jakub Perdek
 */
public class ProductsDTO {

    private Integer id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "description", unique = false, nullable = false)
    private String description;

	@Column(name = "url", unique = false, nullable = true)
    private String url;
	
	@Column(name = "price", unique = false, nullable = false)
	private Double price;

    /**
     * Creates instance with name, description and price of product
     *
     * @param name - name from product instance
     * @param description - description from product instance
	 * @param price - price from product instance
     */
    public ProductsDTO(String name, String description, Double price) {
        this.name = name;
        this.description = description;
		this.price = price;
    }

	/**
     * Creates instance with name, description and price of product
     *
     * @param name - name from product instance
     * @param description - description from product instance
	 * @param url - url from product instance
	 * @param price - price from product instance
     */
    public ProductsDTO(String name, String description, String url, Double price) {
        this.name = name;
        this.description = description;
		this.url = url;
		this.price = price;
    }
	
    /**
     * Creates empty product instance
     */
    public ProductsDTO() {
    }

    /**
     * Sets id from product instance
     *
     * @param id - id from product
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * Gets id from product instance
     *
     * @return id from product instance
     */
    public Integer getId() {
        return this.id;
    }

    /**
     * Gets name from product instance
     *
     * @return name from product instance
     */
    public String getName() {
        return name;
    }

    /**
     * Sets name from product instance
     *
     * @param name from product instance
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets description from product instance
     *
     * @return description from product instance
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets description from product instance
     *
     * @param description from product instance
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets url from product instance
     *
     * @return url from product instance
     */
    public String getUrl() {
        return this.url;
    }

    /**
     * Sets url from product instance
     *
     * @param url - url from product instance
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * Gets price from product instance
     *
     * @return price - price from product instance
     */
	public Double getPrice(){
		return this.price;
	}

    /**
     * Sets price from product instance
     *
     * @param price - price from product instance
     */
	public void setPrice(Double price){
		this.price = price;
	}
}
