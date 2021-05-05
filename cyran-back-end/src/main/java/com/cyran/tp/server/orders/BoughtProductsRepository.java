package com.cyran.tp.server.orders;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

/**
 * Bought products repository for making query to boughtproducts table
 *
 * @author Jakub Perdek
 */
public interface BoughtProductsRepository extends JpaRepository<BoughtProducts, Integer>, JpaSpecificationExecutor<BoughtProducts> {

   
    /**
     * Gets all bought products
	 *
     * @return all bought products from database
     */
    List<BoughtProducts> findAll();

}
