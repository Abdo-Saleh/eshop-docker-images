package com.cyran.tp.server.orders;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/**
 * Order repository for making query to orders table
 *
 * @author Jakub Perdek
 */
public interface OrdersRepository extends JpaRepository<Orders, Integer>, JpaSpecificationExecutor<Orders> {

    
    /**
     * Gets all orders
     * @return all orders from database
     */
    List<Orders> findAll();
}
