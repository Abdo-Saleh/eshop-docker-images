package com.cyran.tp.server.products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

/**
 * Product repository for making query to Product table
 *
 * @author Jakub Perdek
 */
public interface ProductsRepository extends JpaRepository<Products, Integer>, JpaSpecificationExecutor<Products> {

    /**
     *  Selects first n products
     *
     * @param count - number n which limits number of obtained products
     * @return array of products obtained according name - max count products
     */
    @Query(value = ("SELECT * FROM products LIMIT ?1"), nativeQuery = true)
    Products[] getFirstProducts(Integer count);


	/**
     *  Get product according  name
     *
     * @param name - name which identifies product
     * @return array of products obtained according name
     */
    @Query(value = ("SELECT * FROM products WHERE name = ?1 LIMIT 1"), nativeQuery = true)
    Products getProductAccordingName(String name);
	
    /**
     * Inserts new product to databse
     *
     * @param name - name of product
     * @param description - description of product
     * @param url - url of product
	 * @param price - price of product
     */
    @Query(value = ("INSERT INTO products(name, description, url, price) VALUES (password = ?1, description = ?2, url = ?3, price = ?4)"), nativeQuery = true)
    @Modifying
    @Transactional
    void insertProduct(String name, String description, String url, Double price);

	/**
     * Updates new product to databse
     *
     * @param name - name of product
     * @param description - description of product
     * @param url - url of product
	 * @param price - price of product
     */
    @Query(value = ("UPDATE products SET description = ?2, url = ?3, price = ?4 WHERE name = ?1"), nativeQuery = true)
    @Modifying
    @Transactional
    void updateProduct(String name, String description, String url, Double price);

    /**
     * Gets all products
     * @return all products from database
     */
    List<Products> findAll();
}
