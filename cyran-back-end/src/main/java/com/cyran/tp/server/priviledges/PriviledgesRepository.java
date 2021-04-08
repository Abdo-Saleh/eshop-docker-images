package com.cyran.tp.server.priviledges;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

/**
 * Priviledge repository for making query to DB with Priviledges
 *
 * @author Jakub Perdek
 */
public interface PriviledgesRepository
        extends JpaRepository<Priviledges, Integer>, JpaSpecificationExecutor<Priviledges> {

    /**
     * Gets priviledge according id
     *
     * @param id - id of priviledge
     * @return instance of searched priviledge if found otherwise null
     */
	@Query(value = ("SELECT * FROM priviledges WHERE id = (?1)"), nativeQuery = true)
    Priviledges findPriviledgeById(Integer id);

    /**
     * Gets priviledges according priviledge string - role in eshop
     *
     * @param name - priviledge string - role in eshop
     * @return instance of priviledge if found otherwise null
     */
	@Query(value = ("SELECT * FROM priviledges WHERE priviledge = (?1)"), nativeQuery = true)
    Priviledges findPriviledgeByName(String name);

    /**
     * Gest all priviledges
     *
     * @return list of priviledges
     */
    List<Priviledges> findAll();
}
